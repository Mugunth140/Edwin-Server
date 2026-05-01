import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module.js';
import { UsersModule } from './users/users.module.js';
import { VendorsModule } from './vendors/vendors.module.js';
import { CustomersModule } from './customers/customers.module.js';
import { ProjectsModule } from './projects/projects.module.js';
import { WorkOrdersModule } from './work-orders/work-orders.module.js';
import { DprModule } from './dpr/dpr.module.js';
import { DrawingsModule } from './drawings/drawings.module.js';
import { PurchaseOrdersModule } from './purchase-orders/purchase-orders.module.js';
import { AccountsModule } from './accounts/accounts.module.js';
import { ExpensesModule } from './expenses/expenses.module.js';
import { PaymentsModule } from './payments/payments.module.js';
import { DashboardModule } from './dashboard/dashboard.module.js';

// Entity imports
import { User } from './users/entities/user.entity.js';
import { Vendor } from './vendors/entities/vendor.entity.js';
import { Customer } from './customers/entities/customer.entity.js';
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
import { Payment } from './payments/entities/payment.entity.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres' as const,
        host: configService.get<string>('DATABASE_HOST', 'localhost'),
        port: configService.get<number>('DATABASE_PORT', 5432),
        username: configService.get<string>('DATABASE_USERNAME', 'postgres'),
        password: configService.get<string>('DATABASE_PASSWORD', '8220'),
        database: configService.get<string>('DATABASE_NAME', 'edwin_erp'),
        entities: [
          User,
          Vendor,
          Customer,
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
        ],
        // Set to true only in development for auto-schema sync
        // NEVER use synchronize: true in production — use migrations instead
        synchronize: process.env.NODE_ENV !== 'production',
        logging: process.env.NODE_ENV !== 'production',
      }),
    }),
    AuthModule,
    UsersModule,
    VendorsModule,
    CustomersModule,
    ProjectsModule,
    WorkOrdersModule,
    DprModule,
    DrawingsModule,
    PurchaseOrdersModule,
    AccountsModule,
    ExpensesModule,
    PaymentsModule,
    DashboardModule,
  ],
})
export class AppModule {}
