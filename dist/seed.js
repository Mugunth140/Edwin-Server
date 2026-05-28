"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const process = __importStar(require("node:process"));
const bcrypt = __importStar(require("bcrypt"));
const typeorm_1 = require("typeorm");
const user_entity_js_1 = require("./users/entities/user.entity.js");
const vendor_entity_js_1 = require("./vendors/entities/vendor.entity.js");
const customer_entity_js_1 = require("./customers/entities/customer.entity.js");
const project_entity_js_1 = require("./projects/entities/project.entity.js");
const project_progress_entity_js_1 = require("./projects/entities/project-progress.entity.js");
const project_milestone_entity_js_1 = require("./projects/entities/project-milestone.entity.js");
const change_order_entity_js_1 = require("./projects/entities/change-order.entity.js");
const attendance_log_entity_js_1 = require("./projects/entities/attendance-log.entity.js");
const machinery_log_entity_js_1 = require("./projects/entities/machinery-log.entity.js");
const snag_item_entity_js_1 = require("./projects/entities/snag-item.entity.js");
const safety_incident_entity_js_1 = require("./projects/entities/safety-incident.entity.js");
const rfi_entity_js_1 = require("./projects/entities/rfi.entity.js");
const site_photo_entity_js_1 = require("./projects/entities/site-photo.entity.js");
const work_order_entity_js_1 = require("./work-orders/entities/work-order.entity.js");
const work_order_item_entity_js_1 = require("./work-orders/entities/work-order-item.entity.js");
const dpr_report_entity_js_1 = require("./dpr/entities/dpr-report.entity.js");
const drawing_entity_js_1 = require("./drawings/entities/drawing.entity.js");
const purchase_order_entity_js_1 = require("./purchase-orders/entities/purchase-order.entity.js");
const po_item_entity_js_1 = require("./purchase-orders/entities/po-item.entity.js");
const sales_invoice_entity_js_1 = require("./accounts/entities/sales-invoice.entity.js");
const invoice_item_entity_js_1 = require("./accounts/entities/invoice-item.entity.js");
const purchase_bill_entity_js_1 = require("./accounts/entities/purchase-bill.entity.js");
const boq_item_entity_js_1 = require("./accounts/entities/boq-item.entity.js");
const advance_entity_js_1 = require("./accounts/entities/advance.entity.js");
const expense_entity_js_1 = require("./expenses/entities/expense.entity.js");
const payment_entity_js_1 = require("./payments/entities/payment.entity.js");
const enums_js_1 = require("./common/enums.js");
const entities = [
    user_entity_js_1.User,
    vendor_entity_js_1.Vendor,
    customer_entity_js_1.Customer,
    project_entity_js_1.Project,
    project_progress_entity_js_1.ProjectProgress,
    project_milestone_entity_js_1.ProjectMilestone,
    change_order_entity_js_1.ChangeOrder,
    attendance_log_entity_js_1.AttendanceLog,
    machinery_log_entity_js_1.MachineryLog,
    snag_item_entity_js_1.SnagItem,
    safety_incident_entity_js_1.SafetyIncident,
    rfi_entity_js_1.Rfi,
    site_photo_entity_js_1.SitePhoto,
    work_order_entity_js_1.WorkOrder,
    work_order_item_entity_js_1.WorkOrderItem,
    dpr_report_entity_js_1.DprReport,
    drawing_entity_js_1.Drawing,
    purchase_order_entity_js_1.PurchaseOrder,
    po_item_entity_js_1.PoItem,
    sales_invoice_entity_js_1.SalesInvoice,
    invoice_item_entity_js_1.InvoiceItem,
    purchase_bill_entity_js_1.PurchaseBill,
    boq_item_entity_js_1.BoqItem,
    advance_entity_js_1.Advance,
    expense_entity_js_1.Expense,
    payment_entity_js_1.Payment,
];
function loadEnvironment() {
    const loadEnv = process.loadEnvFile;
    if (!loadEnv)
        return;
    try {
        loadEnv();
    }
    catch (error) {
        const nodeError = error;
        if (nodeError.code !== 'ENOENT') {
            throw error;
        }
    }
}
function env(name, fallback) {
    const value = process.env[name];
    if (value !== undefined && value !== '')
        return value;
    if (fallback !== undefined)
        return fallback;
    throw new Error(`Missing required environment variable: ${name}`);
}
function boolEnv(name, fallback) {
    const value = process.env[name];
    if (value === undefined || value === '')
        return fallback;
    return ['1', 'true', 'yes', 'on'].includes(value.toLowerCase());
}
function getAdminPassword(isProduction) {
    const password = process.env.SEED_ADMIN_PASSWORD || process.env.ADMIN_PASSWORD;
    if (!password && isProduction) {
        throw new Error('SEED_ADMIN_PASSWORD is required when NODE_ENV=production');
    }
    if (password && isProduction && password.length < 12) {
        throw new Error('SEED_ADMIN_PASSWORD must be at least 12 characters in production');
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
    return new typeorm_1.DataSource({
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
            ? { rejectUnauthorized: boolEnv('DATABASE_SSL_REJECT_UNAUTHORIZED', true) }
            : false,
    });
}
async function upsertBy(repo, where, values) {
    const existing = await repo.findOne({ where });
    const entity = existing ? repo.merge(existing, values) : repo.create(values);
    return repo.save(entity);
}
async function seedAdmin(userRepo) {
    const isProduction = process.env.NODE_ENV === 'production';
    const email = env('SEED_ADMIN_EMAIL', 'admin@edwinconstructions.com').toLowerCase();
    const password = getAdminPassword(isProduction);
    const resetPassword = boolEnv('SEED_RESET_ADMIN_PASSWORD', false);
    const existing = await userRepo.findOne({ where: { email } });
    if (existing) {
        existing.name = env('SEED_ADMIN_NAME', existing.name || 'Edwin Admin');
        existing.role = enums_js_1.Role.ADMIN;
        existing.isActive = true;
        if (resetPassword) {
            existing.passwordHash = await bcrypt.hash(password, 12);
            console.log(`🔐 Admin password reset for ${email}`);
        }
        await userRepo.save(existing);
        console.log(`✅ Admin user verified: ${email}`);
        return existing;
    }
    const admin = userRepo.create({
        name: env('SEED_ADMIN_NAME', 'Edwin Admin'),
        email,
        passwordHash: await bcrypt.hash(password, 12),
        role: enums_js_1.Role.ADMIN,
        isActive: true,
    });
    await userRepo.save(admin);
    console.log(`✅ Admin user created: ${email}`);
    return admin;
}
async function seedReferenceData(manager, admin) {
    const vendorRepo = manager.getRepository(vendor_entity_js_1.Vendor);
    const customerRepo = manager.getRepository(customer_entity_js_1.Customer);
    const projectRepo = manager.getRepository(project_entity_js_1.Project);
    const vendors = [];
    vendors.push(await upsertBy(vendorRepo, { name: 'Tata Steel Limited' }, {
        name: 'Tata Steel Limited',
        address: 'Jamshedpur, Jharkhand',
        gstNumber: '20AABCT1332Q1Z5',
        state: 'Jharkhand',
        contactEmail: 'supply@tatasteel.com',
        contactPhone: '+91-9876543210',
        isDeleted: false,
    }));
    vendors.push(await upsertBy(vendorRepo, { name: 'Ambuja Cements Ltd' }, {
        name: 'Ambuja Cements Ltd',
        address: 'Mumbai, Maharashtra',
        gstNumber: '27AADCA0170J1Z8',
        state: 'Maharashtra',
        contactEmail: 'orders@ambujacement.com',
        contactPhone: '+91-9876543211',
        isDeleted: false,
    }));
    vendors.push(await upsertBy(vendorRepo, { name: 'KR Electricals' }, {
        name: 'KR Electricals',
        address: 'Chennai, Tamil Nadu',
        gstNumber: '33AABCK5678P1Z2',
        state: 'Tamil Nadu',
        contactEmail: 'info@krelectricals.com',
        contactPhone: '+91-9876543212',
        isDeleted: false,
    }));
    const customers = [];
    customers.push(await upsertBy(customerRepo, { name: 'NHAI - National Highways Authority of India' }, {
        name: 'NHAI - National Highways Authority of India',
        address: 'New Delhi',
        gstNumber: '07AABCN5555M1Z3',
        state: 'Delhi',
        contactEmail: 'projects@nhai.gov.in',
        contactPhone: '+91-11-25074100',
        isDeleted: false,
    }));
    customers.push(await upsertBy(customerRepo, { name: 'Chennai Metro Rail Limited' }, {
        name: 'Chennai Metro Rail Limited',
        address: 'Chennai, Tamil Nadu',
        gstNumber: '33AABCC1234M1Z5',
        state: 'Tamil Nadu',
        contactEmail: 'infra@chennaimetrorail.com',
        contactPhone: '+91-44-27491111',
        isDeleted: false,
    }));
    customers.push(await upsertBy(customerRepo, { name: 'Prestige Group' }, {
        name: 'Prestige Group',
        address: 'Bangalore, Karnataka',
        gstNumber: '29AABCP3456K1Z7',
        state: 'Karnataka',
        contactEmail: 'procurement@prestigeconstruction.com',
        contactPhone: '+91-80-25591234',
        isDeleted: false,
    }));
    const projects = [];
    projects.push(await upsertBy(projectRepo, { name: 'NH-48 Highway Extension - Phase 2' }, {
        name: 'NH-48 Highway Extension - Phase 2',
        description: 'Extension of NH-48 highway by 12km with a four-lane bypass road',
        location: 'Krishnagiri, Tamil Nadu',
        clientName: 'NHAI',
        status: enums_js_1.ProjectStatus.IN_PROGRESS,
        completionPct: 35,
        estimatedBudget: 45_000_000,
        startDate: new Date('2025-06-01'),
        endDate: new Date('2027-03-31'),
        isDeleted: false,
        createdBy: admin.id,
        updatedBy: admin.id,
    }));
    projects.push(await upsertBy(projectRepo, { name: 'Chennai Metro Phase 2 - Station Block C' }, {
        name: 'Chennai Metro Phase 2 - Station Block C',
        description: 'Construction of underground metro station block with ventilation system',
        location: 'T. Nagar, Chennai',
        clientName: 'Chennai Metro Rail',
        status: enums_js_1.ProjectStatus.PLANNING,
        completionPct: 5,
        estimatedBudget: 120_000_000,
        startDate: new Date('2026-01-15'),
        endDate: new Date('2028-12-31'),
        isDeleted: false,
        createdBy: admin.id,
        updatedBy: admin.id,
    }));
    console.log(`✅ Reference data verified: ${vendors.length} vendors, ${customers.length} customers, ${projects.length} projects`);
    return { vendors, customers, projects };
}
async function seedOperationalSampleData(manager, admin, seedData) {
    const [steelVendor] = seedData.vendors;
    const [nhaiCustomer] = seedData.customers;
    const [highwayProject] = seedData.projects;
    const invoiceRepo = manager.getRepository(sales_invoice_entity_js_1.SalesInvoice);
    const billRepo = manager.getRepository(purchase_bill_entity_js_1.PurchaseBill);
    const workOrderRepo = manager.getRepository(work_order_entity_js_1.WorkOrder);
    const expenseRepo = manager.getRepository(expense_entity_js_1.Expense);
    const paymentRepo = manager.getRepository(payment_entity_js_1.Payment);
    const attendanceRepo = manager.getRepository(attendance_log_entity_js_1.AttendanceLog);
    const milestoneRepo = manager.getRepository(project_milestone_entity_js_1.ProjectMilestone);
    const workOrder = await upsertBy(workOrderRepo, { woNumber: 'WO-2026-0001' }, {
        woNumber: 'WO-2026-0001',
        vendorId: steelVendor.id,
        projectId: highwayProject.id,
        status: enums_js_1.WorkOrderStatus.APPROVED,
        terms: 'Payment within 30 days after material delivery and QC approval.',
        totalAmount: 1_850_000,
        cgstAmount: 166_500,
        sgstAmount: 166_500,
        igstAmount: 0,
        gstAmount: 333_000,
        isDeleted: false,
        createdBy: admin.id,
        updatedBy: admin.id,
    });
    await upsertBy(invoiceRepo, { invoiceNumber: 'INV-2026-0001' }, {
        invoiceNumber: 'INV-2026-0001',
        customerId: nhaiCustomer.id,
        projectId: highwayProject.id,
        status: enums_js_1.InvoiceStatus.PAID,
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
    });
    await upsertBy(billRepo, { billNumber: 'BILL-2026-0001' }, {
        billNumber: 'BILL-2026-0001',
        vendorId: steelVendor.id,
        projectId: highwayProject.id,
        amount: 1_325_000,
        billDate: new Date('2026-05-10'),
        dueDate: new Date('2026-05-15'),
        isDeleted: false,
        createdBy: admin.id,
    });
    await upsertBy(expenseRepo, {
        description: 'Site office setup and utilities',
        projectId: highwayProject.id,
        expenseDate: new Date('2026-04-18'),
    }, {
        category: enums_js_1.ExpenseCategory.OFFICE,
        description: 'Site office setup and utilities',
        amount: 82_500,
        expenseDate: new Date('2026-04-18'),
        paidBy: 'Corporate Card',
        projectId: highwayProject.id,
        isDeleted: false,
        createdBy: admin.id,
    });
    await upsertBy(paymentRepo, {
        payeeName: 'Labour Contractor - Krishnagiri',
        projectId: highwayProject.id,
        paymentDate: new Date('2026-04-26'),
    }, {
        paymentType: enums_js_1.PaymentType.LABOUR,
        payeeName: 'Labour Contractor - Krishnagiri',
        amount: 460_000,
        paymentDate: new Date('2026-04-26'),
        projectId: highwayProject.id,
        notes: 'Weekly labour payout for NH-48 site.',
        isDeleted: false,
        createdBy: admin.id,
    });
    await upsertBy(attendanceRepo, {
        projectId: highwayProject.id,
        logDate: new Date('2026-04-27'),
    }, {
        projectId: highwayProject.id,
        logDate: new Date('2026-04-27'),
        headcount: 132,
        notes: 'Civil, survey, safety, and equipment teams on site.',
    });
    await upsertBy(milestoneRepo, {
        projectId: highwayProject.id,
        title: 'Complete service road embankment',
    }, {
        projectId: highwayProject.id,
        title: 'Complete service road embankment',
        plannedDate: new Date('2026-06-15'),
        status: enums_js_1.MilestoneStatus.IN_PROGRESS,
    });
    console.log(`✅ Operational sample data verified: ${workOrder.woNumber}`);
}
async function seed() {
    loadEnvironment();
    const isProduction = process.env.NODE_ENV === 'production';
    const includeSampleData = boolEnv('SEED_SAMPLE_DATA', !isProduction);
    const dataSource = createDataSource();
    await dataSource.initialize();
    console.log(`🔌 Connected to ${env('DATABASE_NAME', 'edwin_erp')} on ${env('DATABASE_HOST', 'localhost')}:${env('DATABASE_PORT', '5432')}`);
    try {
        await dataSource.transaction(async (manager) => {
            const admin = await seedAdmin(manager.getRepository(user_entity_js_1.User));
            const referenceData = await seedReferenceData(manager, admin);
            if (includeSampleData) {
                await seedOperationalSampleData(manager, admin, referenceData);
            }
            else {
                console.log('⏭️  Sample operational data disabled. Set SEED_SAMPLE_DATA=true to enable it.');
            }
        });
        console.log('🎉 Seed completed successfully');
    }
    finally {
        await dataSource.destroy();
    }
}
seed().catch((error) => {
    console.error('❌ Seed failed');
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
});
//# sourceMappingURL=seed.js.map