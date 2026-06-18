"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_js_1 = require("./auth/auth.module.js");
const users_module_js_1 = require("./users/users.module.js");
const vendors_module_js_1 = require("./vendors/vendors.module.js");
const projects_module_js_1 = require("./projects/projects.module.js");
const work_orders_module_js_1 = require("./work-orders/work-orders.module.js");
const dpr_module_js_1 = require("./dpr/dpr.module.js");
const drawings_module_js_1 = require("./drawings/drawings.module.js");
const purchase_orders_module_js_1 = require("./purchase-orders/purchase-orders.module.js");
const accounts_module_js_1 = require("./accounts/accounts.module.js");
const expenses_module_js_1 = require("./expenses/expenses.module.js");
const payments_module_js_1 = require("./payments/payments.module.js");
const dashboard_module_js_1 = require("./dashboard/dashboard.module.js");
const subcontractors_module_js_1 = require("./subcontractors/subcontractors.module.js");
const work_categories_module_js_1 = require("./work-categories/work-categories.module.js");
const subcontract_work_orders_module_js_1 = require("./subcontract-work-orders/subcontract-work-orders.module.js");
const site_engineers_module_js_1 = require("./site-engineers/site-engineers.module.js");
const daily_labour_module_js_1 = require("./daily-labour/daily-labour.module.js");
const trades_module_js_1 = require("./trades/trades.module.js");
const expense_types_module_js_1 = require("./expense-types/expense-types.module.js");
const accounts_managers_module_js_1 = require("./accounts-managers/accounts-managers.module.js");
const purchase_team_module_js_1 = require("./purchase-team/purchase-team.module.js");
const item_descriptions_module_js_1 = require("./item-descriptions/item-descriptions.module.js");
const purchase_enquiries_module_js_1 = require("./purchase-enquiries/purchase-enquiries.module.js");
const user_entity_js_1 = require("./users/entities/user.entity.js");
const vendor_entity_js_1 = require("./vendors/entities/vendor.entity.js");
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
const bill_item_entity_js_1 = require("./accounts/entities/bill-item.entity.js");
const boq_item_entity_js_1 = require("./accounts/entities/boq-item.entity.js");
const advance_entity_js_1 = require("./accounts/entities/advance.entity.js");
const expense_entity_js_1 = require("./expenses/entities/expense.entity.js");
const expense_type_entity_js_1 = require("./expense-types/entities/expense-type.entity.js");
const payment_entity_js_1 = require("./payments/entities/payment.entity.js");
const subcontractor_entity_js_1 = require("./subcontractors/entities/subcontractor.entity.js");
const work_category_entity_js_1 = require("./work-categories/entities/work-category.entity.js");
const subcontract_work_order_entity_js_1 = require("./subcontract-work-orders/entities/subcontract-work-order.entity.js");
const daily_labour_report_entity_js_1 = require("./daily-labour/entities/daily-labour-report.entity.js");
const daily_worker_entity_js_1 = require("./daily-labour/entities/daily-worker.entity.js");
const trade_entity_js_1 = require("./trades/entities/trade.entity.js");
const item_description_entity_js_1 = require("./item-descriptions/entities/item-description.entity.js");
const purchase_enquiry_entity_js_1 = require("./purchase-enquiries/entities/purchase-enquiry.entity.js");
function getBooleanConfig(configService, key, fallback) {
    const value = configService.get(key);
    if (typeof value === 'boolean')
        return value;
    if (typeof value === 'string' && value.trim() !== '') {
        return ['1', 'true', 'yes', 'on'].includes(value.toLowerCase());
    }
    return fallback;
}
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    type: 'postgres',
                    host: configService.get('DATABASE_HOST', 'localhost'),
                    port: configService.get('DATABASE_PORT', 5432),
                    username: configService.get('DATABASE_USERNAME', 'postgres'),
                    password: configService.get('DATABASE_PASSWORD', '8220'),
                    database: configService.get('DATABASE_NAME', 'edwin_erp'),
                    entities: [
                        user_entity_js_1.User,
                        vendor_entity_js_1.Vendor,
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
                        bill_item_entity_js_1.BillItem,
                        boq_item_entity_js_1.BoqItem,
                        advance_entity_js_1.Advance,
                        expense_entity_js_1.Expense,
                        payment_entity_js_1.Payment,
                        subcontractor_entity_js_1.Subcontractor,
                        work_category_entity_js_1.WorkCategory,
                        subcontract_work_order_entity_js_1.SubcontractWorkOrder,
                        daily_labour_report_entity_js_1.DailyLabourReport,
                        daily_worker_entity_js_1.DailyWorker,
                        trade_entity_js_1.Trade,
                        expense_type_entity_js_1.ExpenseType,
                        item_description_entity_js_1.ItemDescription,
                        purchase_enquiry_entity_js_1.PurchaseEnquiry,
                    ],
                    synchronize: getBooleanConfig(configService, 'TYPEORM_SYNCHRONIZE', false),
                    logging: getBooleanConfig(configService, 'TYPEORM_LOGGING', false),
                }),
            }),
            auth_module_js_1.AuthModule,
            users_module_js_1.UsersModule,
            vendors_module_js_1.VendorsModule,
            projects_module_js_1.ProjectsModule,
            work_orders_module_js_1.WorkOrdersModule,
            dpr_module_js_1.DprModule,
            drawings_module_js_1.DrawingsModule,
            purchase_orders_module_js_1.PurchaseOrdersModule,
            accounts_module_js_1.AccountsModule,
            expenses_module_js_1.ExpensesModule,
            payments_module_js_1.PaymentsModule,
            dashboard_module_js_1.DashboardModule,
            subcontractors_module_js_1.SubcontractorsModule,
            work_categories_module_js_1.WorkCategoriesModule,
            subcontract_work_orders_module_js_1.SubcontractWorkOrdersModule,
            site_engineers_module_js_1.SiteEngineersModule,
            daily_labour_module_js_1.DailyLabourModule,
            trades_module_js_1.TradesModule,
            expense_types_module_js_1.ExpenseTypesModule,
            accounts_managers_module_js_1.AccountsManagersModule,
            purchase_team_module_js_1.PurchaseTeamModule,
            item_descriptions_module_js_1.ItemDescriptionsModule,
            purchase_enquiries_module_js_1.PurchaseEnquiriesModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map