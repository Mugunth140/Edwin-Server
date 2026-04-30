import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './users/entities/user.entity.js';
import { Vendor } from './vendors/entities/vendor.entity.js';
import { Customer } from './customers/entities/customer.entity.js';
import { Project } from './projects/entities/project.entity.js';
import { Role, ProjectStatus } from './common/enums.js';

/**
 * Seed script — run with:
 *   npx ts-node --esm src/seed.ts
 *
 * Creates:
 * - 1 admin user
 * - 2 sample projects
 * - 3 sample vendors
 * - 3 sample customers
 */

async function seed() {
  const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT || '5432', 10),
    username: process.env.DATABASE_USERNAME || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'postgres',
    database: process.env.DATABASE_NAME || 'edwin_erp',
    entities: [User, Vendor, Customer, Project],
    synchronize: true,
  });

  await dataSource.initialize();
  console.log('🔌 Connected to database');

  const userRepo = dataSource.getRepository(User);
  const vendorRepo = dataSource.getRepository(Vendor);
  const customerRepo = dataSource.getRepository(Customer);
  const projectRepo = dataSource.getRepository(Project);

  // --- Admin User ---
  const existingAdmin = await userRepo.findOne({ where: { email: 'admin@edwinconstructions.com' } });
  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash('admin123', 10);
    await userRepo.save(
      userRepo.create({
        name: 'Edwin Admin',
        email: 'admin@edwinconstructions.com',
        passwordHash,
        role: Role.ADMIN,
      }),
    );
    console.log('✅ Admin user created (admin@edwinconstructions.com / admin123)');
  } else {
    console.log('⏭️  Admin user already exists');
  }

  // --- Vendors ---
  const vendorCount = await vendorRepo.count();
  if (vendorCount === 0) {
    await vendorRepo.save([
      vendorRepo.create({
        name: 'Tata Steel Limited',
        address: 'Jamshedpur, Jharkhand',
        gstNumber: '20AABCT1332Q1Z5',
        state: 'Jharkhand',
        contactEmail: 'supply@tatasteel.com',
        contactPhone: '+91-9876543210',
      }),
      vendorRepo.create({
        name: 'Ambuja Cements Ltd',
        address: 'Mumbai, Maharashtra',
        gstNumber: '27AADCA0170J1Z8',
        state: 'Maharashtra',
        contactEmail: 'orders@ambujacement.com',
        contactPhone: '+91-9876543211',
      }),
      vendorRepo.create({
        name: 'KR Electricals',
        address: 'Chennai, Tamil Nadu',
        gstNumber: '33AABCK5678P1Z2',
        state: 'Tamil Nadu',
        contactEmail: 'info@krelectricals.com',
        contactPhone: '+91-9876543212',
      }),
    ]);
    console.log('✅ 3 sample vendors created');
  } else {
    console.log('⏭️  Vendors already exist');
  }

  // --- Customers ---
  const customerCount = await customerRepo.count();
  if (customerCount === 0) {
    await customerRepo.save([
      customerRepo.create({
        name: 'NHAI - National Highways Authority of India',
        address: 'New Delhi',
        gstNumber: '07AABCN5555M1Z3',
        state: 'Delhi',
        contactEmail: 'projects@nhai.gov.in',
        contactPhone: '+91-11-25074100',
      }),
      customerRepo.create({
        name: 'Chennai Metro Rail Limited',
        address: 'Chennai, Tamil Nadu',
        gstNumber: '33AABCC1234M1Z5',
        state: 'Tamil Nadu',
        contactEmail: 'infra@chennaimetrorail.com',
        contactPhone: '+91-44-27491111',
      }),
      customerRepo.create({
        name: 'Prestige Group',
        address: 'Bangalore, Karnataka',
        gstNumber: '29AABCP3456K1Z7',
        state: 'Karnataka',
        contactEmail: 'procurement@prestigeconstruction.com',
        contactPhone: '+91-80-25591234',
      }),
    ]);
    console.log('✅ 3 sample customers created');
  } else {
    console.log('⏭️  Customers already exist');
  }

  // --- Projects ---
  const projectCount = await projectRepo.count();
  if (projectCount === 0) {
    await projectRepo.save([
      projectRepo.create({
        name: 'NH-48 Highway Extension - Phase 2',
        description: 'Extension of NH-48 highway by 12km with 4-lane bypass road',
        location: 'Krishnagiri, Tamil Nadu',
        clientName: 'NHAI',
        status: ProjectStatus.IN_PROGRESS,
        completionPct: 35,
        estimatedBudget: 45000000,
        startDate: new Date('2025-06-01'),
        endDate: new Date('2027-03-31'),
      }),
      projectRepo.create({
        name: 'Chennai Metro Phase 2 - Station Block C',
        description: 'Construction of underground metro station block with ventilation system',
        location: 'T. Nagar, Chennai',
        clientName: 'Chennai Metro Rail',
        status: ProjectStatus.PLANNING,
        completionPct: 5,
        estimatedBudget: 120000000,
        startDate: new Date('2026-01-15'),
        endDate: new Date('2028-12-31'),
      }),
    ]);
    console.log('✅ 2 sample projects created');
  } else {
    console.log('⏭️  Projects already exist');
  }

  await dataSource.destroy();
  console.log('🎉 Seed completed!');
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
