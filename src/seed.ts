import * as process from 'node:process';
import * as bcrypt from 'bcrypt';
import {
  DataSource,
  type DeepPartial,
  type EntityManager,
  type FindOptionsWhere,
  type ObjectLiteral,
  type Repository,
} from 'typeorm';
import { User } from './users/entities/user.entity.js';
import { Vendor } from './vendors/entities/vendor.entity.js';
import { Project } from './projects/entities/project.entity.js';
import { ProjectProgress } from './projects/entities/project-progress.entity.js';
import { ProjectMilestone } from './projects/entities/project-milestone.entity.js';
import { ChangeOrder } from './projects/entities/change-order.entity.js';
import { AttendanceLog } from './projects/entities/attendance-log.entity.js';
import { MachineryLog } from './projects/entities/machinery-log.entity.js';
import { SnagItem } from './projects/entities/snag-item.entity.js';
import { SafetyIncident } from './projects/entities/safety-incident.entity.js';
import { Rfi } from './projects/entities/rfi.entity.js';
import { SitePhoto } from './projects/entities/site-photo.entity.js';
import { WorkOrder } from './work-orders/entities/work-order.entity.js';
import { WorkOrderItem } from './work-orders/entities/work-order-item.entity.js';
import { DprReport } from './dpr/entities/dpr-report.entity.js';
import { Drawing } from './drawings/entities/drawing.entity.js';
import { PurchaseOrder } from './purchase-orders/entities/purchase-order.entity.js';
import { PoItem } from './purchase-orders/entities/po-item.entity.js';
import { SalesInvoice } from './accounts/entities/sales-invoice.entity.js';
import { InvoiceItem } from './accounts/entities/invoice-item.entity.js';
import { PurchaseBill } from './accounts/entities/purchase-bill.entity.js';
import { BoqItem } from './accounts/entities/boq-item.entity.js';
import { Advance } from './accounts/entities/advance.entity.js';
import { Expense } from './expenses/entities/expense.entity.js';
import { ExpenseType } from './expense-types/entities/expense-type.entity.js';
import { Payment } from './payments/entities/payment.entity.js';
import { WorkCategory } from './work-categories/entities/work-category.entity.js';
import { Trade } from './trades/entities/trade.entity.js';
import { Salary } from './salaries/entities/salary.entity.js';
import {
  ExpenseCategory,
  InvoiceStatus,
  MilestoneStatus,
  PaymentType,
  ProjectStatus,
  Role,
  WorkOrderStatus,
} from './common/enums.js';

const entities = [
  User,
  Vendor,
  Project,
  ProjectProgress,
  ProjectMilestone,
  ChangeOrder,
  AttendanceLog,
  MachineryLog,
  SnagItem,
  SafetyIncident,
  Rfi,
  SitePhoto,
  WorkOrder,
  WorkOrderItem,
  DprReport,
  Drawing,
  PurchaseOrder,
  PoItem,
  SalesInvoice,
  InvoiceItem,
  PurchaseBill,
  BoqItem,
  Advance,
  Expense,
  Payment,
  WorkCategory,
  Trade,
  Salary,
];

function loadEnvironment() {
  const loadEnv = (process as { loadEnvFile?: () => void }).loadEnvFile;
  if (!loadEnv) return;

  try {
    loadEnv();
  } catch (error) {
    const nodeError = error as NodeJS.ErrnoException;
    if (nodeError.code !== 'ENOENT') {
      throw error;
    }
  }
}

function env(name: string, fallback?: string) {
  const value = process.env[name];
  if (value !== undefined && value !== '') return value;
  if (fallback !== undefined) return fallback;
  throw new Error(`Missing required environment variable: ${name}`);
}

function boolEnv(name: string, fallback: boolean) {
  const value = process.env[name];
  if (value === undefined || value === '') return fallback;
  return ['1', 'true', 'yes', 'on'].includes(value.toLowerCase());
}

function getAdminPassword(isProduction: boolean) {
  const password =
    process.env.SEED_ADMIN_PASSWORD || process.env.ADMIN_PASSWORD;

  if (!password && isProduction) {
    throw new Error('SEED_ADMIN_PASSWORD is required when NODE_ENV=production');
  }

  if (password && isProduction && password.length < 12) {
    throw new Error(
      'SEED_ADMIN_PASSWORD must be at least 12 characters in production',
    );
  }

  if (!password) {
    console.warn('⚠️  Using development admin password: admin123');
    return 'admin123';
  }

  return password;
}

function createDataSource() {
  const isProduction = process.env.NODE_ENV === 'production';
  const synchronize = boolEnv('SEED_SYNCHRONIZE', false);
  const ssl = boolEnv('DATABASE_SSL', false);

  if (isProduction && synchronize) {
    throw new Error('Refusing to run with SEED_SYNCHRONIZE=true in production');
  }

  return new DataSource({
    type: 'postgres',
    host: env('DATABASE_HOST', 'localhost'),
    port: Number(env('DATABASE_PORT', '5432')),
    username: env('DATABASE_USERNAME', 'postgres'),
    password: env('DATABASE_PASSWORD', isProduction ? undefined : 'postgres'),
    database: env('DATABASE_NAME', 'edwin_erp'),
    entities,
    synchronize,
    logging: boolEnv('SEED_LOG_SQL', false),
    ssl: ssl
      ? {
          rejectUnauthorized: boolEnv('DATABASE_SSL_REJECT_UNAUTHORIZED', true),
        }
      : false,
  });
}

async function upsertBy<T extends ObjectLiteral>(
  repo: Repository<T>,
  where: FindOptionsWhere<T>,
  values: DeepPartial<T>,
) {
  const existing = await repo.findOne({ where });
  const entity = existing ? repo.merge(existing, values) : repo.create(values);
  return repo.save(entity);
}

async function seedAdmin(userRepo: Repository<User>) {
  const isProduction = process.env.NODE_ENV === 'production';
  const email = env(
    'SEED_ADMIN_EMAIL',
    'admin@edwinconstructions.com',
  ).toLowerCase();
  const password = getAdminPassword(isProduction);
  const resetPassword = boolEnv('SEED_RESET_ADMIN_PASSWORD', false);
  let admin = await userRepo.findOne({ where: { email } });

  if (admin) {
    admin.name = env('SEED_ADMIN_NAME', admin.name || 'Edwin Admin');
    admin.role = Role.ADMIN;
    admin.isActive = true;

    if (resetPassword) {
      admin.passwordHash = await bcrypt.hash(password, 12);
      console.log(`🔐 Admin password reset for ${email}`);
    }

    await userRepo.save(admin);
    console.log(`✅ Admin user verified: ${email}`);
  } else {
    admin = userRepo.create({
      name: env('SEED_ADMIN_NAME', 'Edwin Admin'),
      email,
      passwordHash: await bcrypt.hash(password, 12),
      role: Role.ADMIN,
      isActive: true,
    });
    await userRepo.save(admin);
    console.log(`✅ Admin user created: ${email}`);
  }

  // Seed sample accounts manager
  const accEmail = 'accounts@edwinconstructions.com';
  const accExisting = await userRepo.findOne({ where: { email: accEmail } });
  if (!accExisting) {
    const manager = userRepo.create({
      name: 'Sample Accounts Manager',
      email: accEmail,
      username: 'accounts_mgr',
      passwordHash: await bcrypt.hash('8220', 12),
      role: Role.ACCOUNTS_MANAGER,
      isActive: true,
      employeeId: 'ACC-001',
    });
    await userRepo.save(manager);
    console.log(`✅ Accounts Manager user created: ${accEmail}`);
  }

  return admin;
}

async function seedReferenceData(manager: EntityManager, admin: User) {
  const vendorRepo = manager.getRepository(Vendor);
  const projectRepo = manager.getRepository(Project);

  const vendors: Vendor[] = [];
  vendors.push(
    await upsertBy(
      vendorRepo,
      { name: 'Tata Steel Limited' },
      {
        name: 'Tata Steel Limited',
        address: 'Jamshedpur, Jharkhand',
        gstNumber: '20AABCT1332Q1Z5',
        state: 'Jharkhand',
        contactEmail: 'supply@tatasteel.com',
        contactPhone: '+91-9876543210',
        isDeleted: false,
      },
    ),
  );
  vendors.push(
    await upsertBy(
      vendorRepo,
      { name: 'Ambuja Cements Ltd' },
      {
        name: 'Ambuja Cements Ltd',
        address: 'Mumbai, Maharashtra',
        gstNumber: '27AADCA0170J1Z8',
        state: 'Maharashtra',
        contactEmail: 'orders@ambujacement.com',
        contactPhone: '+91-9876543211',
        isDeleted: false,
      },
    ),
  );

  const projects: Project[] = [];
  projects.push(
    await upsertBy(
      projectRepo,
      { name: 'NH-48 Highway Extension - Phase 2' },
      {
        name: 'NH-48 Highway Extension - Phase 2',
        description:
          'Extension of NH-48 highway by 12km with a four-lane bypass road',
        location: 'Krishnagiri, Tamil Nadu',
        clientName: 'NHAI',
        status: ProjectStatus.IN_PROGRESS,
        completionPct: 35,
        estimatedBudget: 45_000_000,
        startDate: new Date('2025-06-01'),
        endDate: new Date('2027-03-31'),
        isDeleted: false,
        createdBy: admin.id,
        updatedBy: admin.id,
      },
    ),
  );
  projects.push(
    await upsertBy(
      projectRepo,
      { name: 'Chennai Metro Phase 2 - Station Block C' },
      {
        name: 'Chennai Metro Phase 2 - Station Block C',
        description:
          'Construction of underground metro station block with ventilation system',
        location: 'T. Nagar, Chennai',
        clientName: 'Chennai Metro Rail',
        status: ProjectStatus.PLANNING,
        completionPct: 5,
        estimatedBudget: 120_000_000,
        startDate: new Date('2026-01-15'),
        endDate: new Date('2028-12-31'),
        isDeleted: false,
        createdBy: admin.id,
        updatedBy: admin.id,
      },
    ),
  );

  console.log(
    `✅ Reference data verified: ${vendors.length} vendors, ${projects.length} projects`,
  );
  return { vendors, projects };
}

async function seedOperationalSampleData(
  manager: EntityManager,
  admin: User,
  seedData: Awaited<ReturnType<typeof seedReferenceData>>,
) {
  const [steelVendor] = seedData.vendors;
  const [highwayProject] = seedData.projects;
  const invoiceRepo = manager.getRepository(SalesInvoice);
  const billRepo = manager.getRepository(PurchaseBill);
  const workOrderRepo = manager.getRepository(WorkOrder);
  const expenseRepo = manager.getRepository(Expense);
  const paymentRepo = manager.getRepository(Payment);
  const attendanceRepo = manager.getRepository(AttendanceLog);
  const milestoneRepo = manager.getRepository(ProjectMilestone);

  const workOrder = await upsertBy(
    workOrderRepo,
    { woNumber: 'WO-2026-0001' },
    {
      woNumber: 'WO-2026-0001',
      vendorId: steelVendor.id,
      projectId: highwayProject.id,
      status: WorkOrderStatus.APPROVED,
      terms: 'Payment within 30 days after material delivery and QC approval.',
      totalAmount: 1_850_000,
      cgstAmount: 166_500,
      sgstAmount: 166_500,
      igstAmount: 0,
      gstAmount: 333_000,
      isDeleted: false,
      createdBy: admin.id,
      updatedBy: admin.id,
    },
  );

  await upsertBy(
    invoiceRepo,
    { invoiceNumber: 'INV-2026-0001' },
    {
      invoiceNumber: 'INV-2026-0001',
      projectId: highwayProject.id,
      status: InvoiceStatus.PAID,
      totalAmount: 5_200_000,
      cgstAmount: 468_000,
      sgstAmount: 468_000,
      igstAmount: 0,
      gstAmount: 936_000,
      dueDate: new Date('2026-04-30'),
      paidAt: new Date('2026-04-25T10:30:00.000Z'),
      isDeleted: false,
      createdBy: admin.id,
      updatedBy: admin.id,
    },
  );

  await upsertBy(
    billRepo,
    { billNumber: 'BILL-2026-0001' },
    {
      billNumber: 'BILL-2026-0001',
      vendorId: steelVendor.id,
      projectId: highwayProject.id,
      amount: 1_325_000,
      billDate: new Date('2026-05-10'),
      dueDate: new Date('2026-05-15'),
      isDeleted: false,
      createdBy: admin.id,
    },
  );

  await upsertBy(
    expenseRepo,
    {
      description: 'Site office setup and utilities',
      projectId: highwayProject.id,
      expenseDate: new Date('2026-04-18'),
    },
    {
      category: ExpenseCategory.OFFICE,
      description: 'Site office setup and utilities',
      amount: 82_500,
      expenseDate: new Date('2026-04-18'),
      paidBy: 'Corporate Card',
      projectId: highwayProject.id,
      isDeleted: false,
      createdBy: admin.id,
    },
  );

  await upsertBy(
    paymentRepo,
    {
      payeeName: 'Labour Contractor - Krishnagiri',
      projectId: highwayProject.id,
      paymentDate: new Date('2026-04-26'),
    },
    {
      paymentType: PaymentType.LABOUR,
      payeeName: 'Labour Contractor - Krishnagiri',
      amount: 460_000,
      paymentDate: new Date('2026-04-26'),
      projectId: highwayProject.id,
      notes: 'Weekly labour payout for NH-48 site.',
      isDeleted: false,
      createdBy: admin.id,
    },
  );

  await upsertBy(
    attendanceRepo,
    {
      projectId: highwayProject.id,
      logDate: new Date('2026-04-27'),
    },
    {
      projectId: highwayProject.id,
      logDate: new Date('2026-04-27'),
      headcount: 132,
      notes: 'Civil, survey, safety, and equipment teams on site.',
    },
  );

  await upsertBy(
    milestoneRepo,
    {
      projectId: highwayProject.id,
      title: 'Complete service road embankment',
    },
    {
      projectId: highwayProject.id,
      title: 'Complete service road embankment',
      plannedDate: new Date('2026-06-15'),
      status: MilestoneStatus.IN_PROGRESS,
    },
  );

  console.log(`✅ Operational sample data verified: ${workOrder.woNumber}`);
}

async function seedWorkCategories(manager: EntityManager) {
  const repo = manager.getRepository(WorkCategory);
  const categories = [
    'Civil',
    'Electrical',
    'Plumbing',
    'Painting',
    'HVAC',
    'Fire Fighting',
    'Interior',
    'Landscaping',
    'Other',
  ];

  for (const name of categories) {
    await upsertBy(repo, { name }, { name, isDeleted: false });
  }
  console.log(`✅ Work categories verified: ${categories.length}`);
}

async function seedTrades(manager: EntityManager) {
  const repo = manager.getRepository(Trade);
  const trades = [
    'Mason',
    'Carpenter',
    'Electrician',
    'Plumber',
    'Painter',
    'Helper',
    'Supervisor',
    'Other',
  ];

  for (const name of trades) {
    await upsertBy(repo, { name }, { name, isDeleted: false });
  }
  console.log(`✅ Trades verified: ${trades.length}`);
}

async function seedExpenseTypes(manager: EntityManager) {
  const repo = manager.getRepository(ExpenseType);
  const types = [
    'Staff Salary',
    'Office Rent',
    'Transport Fuel',
    'Travel Allowance',
    'Site Equipment',
    'Material Purchase',
    'Other',
  ];

  for (const name of types) {
    await upsertBy(repo, { name }, { name, isDeleted: false });
  }
  console.log(`✅ Expense Types verified: ${types.length}`);
}

async function seedSalaries(manager: EntityManager) {
  const repo = manager.getRepository(Salary);
  const salaries = [
    {
      grades: 'Grade A',
      expInYears: '0-1',
      monthlySalary: 15000,
      avgCostPerHr: 93.75,
      bookingCost: 7500,
    },
    {
      grades: 'Grade B',
      expInYears: '2-4',
      monthlySalary: 25000,
      avgCostPerHr: 156.25,
      bookingCost: 12500,
    },
    {
      grades: 'Grade C',
      expInYears: '5-7',
      monthlySalary: 40000,
      avgCostPerHr: 250,
      bookingCost: 20000,
    },
    {
      grades: 'Grade D',
      expInYears: '8-10',
      monthlySalary: 55000,
      avgCostPerHr: 343.75,
      bookingCost: 27500,
    },
    {
      grades: 'Grade E',
      expInYears: '11-15',
      monthlySalary: 75000,
      avgCostPerHr: 468.75,
      bookingCost: 37500,
    },
    {
      grades: 'Grade F',
      expInYears: '15+',
      monthlySalary: 100000,
      avgCostPerHr: 625,
      bookingCost: 50000,
    },
  ];

  for (const s of salaries) {
    await upsertBy(repo, { grades: s.grades }, { ...s, isDeleted: false });
  }
  console.log(`✅ Salary grades seeded: ${salaries.length}`);
}

async function seed() {
  loadEnvironment();

  const isProduction = process.env.NODE_ENV === 'production';
  const includeSampleData = boolEnv('SEED_SAMPLE_DATA', !isProduction);
  const dataSource = createDataSource();

  await dataSource.initialize();
  console.log(
    `🔌 Connected to ${env('DATABASE_NAME', 'edwin_erp')} on ${env('DATABASE_HOST', 'localhost')}:${env('DATABASE_PORT', '5432')}`,
  );

  try {
    await dataSource.transaction(async (manager) => {
      const admin = await seedAdmin(manager.getRepository(User));
      await seedWorkCategories(manager);
      await seedTrades(manager);
      await seedExpenseTypes(manager);
      await seedSalaries(manager);
      const referenceData = await seedReferenceData(manager, admin);

      if (includeSampleData) {
        await seedOperationalSampleData(manager, admin, referenceData);
      } else {
        console.log(
          '⏭️  Sample operational data disabled. Set SEED_SAMPLE_DATA=true to enable it.',
        );
      }
    });

    console.log('🎉 Seed completed successfully');
  } finally {
    await dataSource.destroy();
  }
}

seed().catch((error) => {
  console.error('❌ Seed failed');
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
