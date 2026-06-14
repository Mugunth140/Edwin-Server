"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const project_entity_js_1 = require("../projects/entities/project.entity.js");
const project_milestone_entity_js_1 = require("../projects/entities/project-milestone.entity.js");
const attendance_log_entity_js_1 = require("../projects/entities/attendance-log.entity.js");
const sales_invoice_entity_js_1 = require("../accounts/entities/sales-invoice.entity.js");
const purchase_bill_entity_js_1 = require("../accounts/entities/purchase-bill.entity.js");
const expense_entity_js_1 = require("../expenses/entities/expense.entity.js");
const payment_entity_js_1 = require("../payments/entities/payment.entity.js");
const user_entity_js_1 = require("../users/entities/user.entity.js");
const enums_js_1 = require("../common/enums.js");
let DashboardService = class DashboardService {
    projectsRepo;
    milestonesRepo;
    attendanceRepo;
    invoiceRepo;
    billRepo;
    expenseRepo;
    paymentRepo;
    usersRepo;
    constructor(projectsRepo, milestonesRepo, attendanceRepo, invoiceRepo, billRepo, expenseRepo, paymentRepo, usersRepo) {
        this.projectsRepo = projectsRepo;
        this.milestonesRepo = milestonesRepo;
        this.attendanceRepo = attendanceRepo;
        this.invoiceRepo = invoiceRepo;
        this.billRepo = billRepo;
        this.expenseRepo = expenseRepo;
        this.paymentRepo = paymentRepo;
        this.usersRepo = usersRepo;
    }
    async getMasterDashboard() {
        const projects = await this.projectsRepo.find({ where: { isDeleted: false } });
        const totalProjects = projects.length;
        const revenueResult = await this.invoiceRepo
            .createQueryBuilder('inv')
            .select('SUM(inv.totalAmount + inv.gstAmount)', 'total')
            .where('inv.isDeleted = false AND inv.status = :status', { status: enums_js_1.InvoiceStatus.PAID })
            .getRawOne();
        const billCost = await this.billRepo
            .createQueryBuilder('bill')
            .select('SUM(bill.amount)', 'total')
            .where('bill.isDeleted = false')
            .getRawOne();
        const expenseCost = await this.expenseRepo
            .createQueryBuilder('e')
            .select('SUM(e.amount)', 'total')
            .where('e.isDeleted = false')
            .getRawOne();
        const paymentCost = await this.paymentRepo
            .createQueryBuilder('p')
            .select('SUM(p.amount)', 'total')
            .where('p.isDeleted = false')
            .getRawOne();
        const totalRevenue = Number(revenueResult?.total || 0);
        const totalCost = Number(billCost?.total || 0) + Number(expenseCost?.total || 0) + Number(paymentCost?.total || 0);
        const weeklyLabour = await this.attendanceRepo
            .createQueryBuilder('a')
            .select("DATE_TRUNC('week', a.logDate)", 'weekStart')
            .addSelect('SUM(a.headcount)', 'headcount')
            .groupBy("DATE_TRUNC('week', a.logDate)")
            .orderBy("DATE_TRUNC('week', a.logDate)", 'DESC')
            .limit(8)
            .getRawMany();
        return {
            totalProjects,
            projects: projects.map((p) => ({
                id: p.id,
                name: p.name,
                completionPct: Number(p.completionPct),
            })),
            revenueVsCost: { totalRevenue, totalCost },
            weeklyLabour: weeklyLabour.map((w) => ({
                weekStart: w.weekStart,
                headcount: Number(w.headcount),
            })),
            criticalActions: [],
        };
    }
    async getEngineerDashboard(userId) {
        const engineer = await this.usersRepo.findOne({
            where: { id: userId, isActive: true },
            relations: ['projects'],
        });
        if (!engineer) {
            throw new common_1.NotFoundException('Engineer not found');
        }
        const assignedProjects = engineer.projects || [];
        return {
            totalProjects: assignedProjects.length,
            projects: assignedProjects.map((p) => ({
                id: p.id,
                name: p.name,
                completionPct: Number(p.completionPct),
            })),
            revenueVsCost: { totalRevenue: 0, totalCost: 0 },
            weeklyLabour: [],
            criticalActions: [],
        };
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(project_entity_js_1.Project)),
    __param(1, (0, typeorm_1.InjectRepository)(project_milestone_entity_js_1.ProjectMilestone)),
    __param(2, (0, typeorm_1.InjectRepository)(attendance_log_entity_js_1.AttendanceLog)),
    __param(3, (0, typeorm_1.InjectRepository)(sales_invoice_entity_js_1.SalesInvoice)),
    __param(4, (0, typeorm_1.InjectRepository)(purchase_bill_entity_js_1.PurchaseBill)),
    __param(5, (0, typeorm_1.InjectRepository)(expense_entity_js_1.Expense)),
    __param(6, (0, typeorm_1.InjectRepository)(payment_entity_js_1.Payment)),
    __param(7, (0, typeorm_1.InjectRepository)(user_entity_js_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map