"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const dashboard_controller_js_1 = require("./dashboard.controller.js");
const dashboard_service_js_1 = require("./dashboard.service.js");
const project_entity_js_1 = require("../projects/entities/project.entity.js");
const project_milestone_entity_js_1 = require("../projects/entities/project-milestone.entity.js");
const attendance_log_entity_js_1 = require("../projects/entities/attendance-log.entity.js");
const sales_invoice_entity_js_1 = require("../accounts/entities/sales-invoice.entity.js");
const purchase_bill_entity_js_1 = require("../accounts/entities/purchase-bill.entity.js");
const expense_entity_js_1 = require("../expenses/entities/expense.entity.js");
const payment_entity_js_1 = require("../payments/entities/payment.entity.js");
let DashboardModule = class DashboardModule {
};
exports.DashboardModule = DashboardModule;
exports.DashboardModule = DashboardModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                project_entity_js_1.Project,
                project_milestone_entity_js_1.ProjectMilestone,
                attendance_log_entity_js_1.AttendanceLog,
                sales_invoice_entity_js_1.SalesInvoice,
                purchase_bill_entity_js_1.PurchaseBill,
                expense_entity_js_1.Expense,
                payment_entity_js_1.Payment,
            ]),
        ],
        controllers: [dashboard_controller_js_1.DashboardController],
        providers: [dashboard_service_js_1.DashboardService],
    })
], DashboardModule);
//# sourceMappingURL=dashboard.module.js.map