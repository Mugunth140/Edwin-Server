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
const purchase_order_entity_js_1 = require("../purchase-orders/entities/purchase-order.entity.js");
const purchase_enquiry_entity_js_1 = require("../purchase-enquiries/entities/purchase-enquiry.entity.js");
const weekly_timesheet_entity_js_1 = require("../timesheet-attendance/entities/weekly-timesheet.entity.js");
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
    poRepo;
    enquiryRepo;
    tsRepo;
    constructor(projectsRepo, milestonesRepo, attendanceRepo, invoiceRepo, billRepo, expenseRepo, paymentRepo, usersRepo, poRepo, enquiryRepo, tsRepo) {
        this.projectsRepo = projectsRepo;
        this.milestonesRepo = milestonesRepo;
        this.attendanceRepo = attendanceRepo;
        this.invoiceRepo = invoiceRepo;
        this.billRepo = billRepo;
        this.expenseRepo = expenseRepo;
        this.paymentRepo = paymentRepo;
        this.usersRepo = usersRepo;
        this.poRepo = poRepo;
        this.enquiryRepo = enquiryRepo;
        this.tsRepo = tsRepo;
    }
    async getPurchaseDashboard() {
        const pendingPOs = await this.poRepo.find({
            where: {
                status: enums_js_1.PurchaseOrderStatus.APPROVED,
                isDeleted: false,
            },
            relations: ['vendor', 'items', 'project'],
            order: { createdAt: 'DESC' },
        });
        const bills = await this.billRepo.find({
            where: { isDeleted: false },
            relations: ['vendor', 'payments'],
        });
        const totalPayable = bills.reduce((sum, bill) => {
            const balance = Number(bill.amount) - Number(bill.paidAmount || 0);
            return sum + balance;
        }, 0);
        const unpaidBillCount = bills.filter((b) => Number(b.amount) - Number(b.paidAmount || 0) > 0).length;
        const recentPOs = await this.poRepo.find({
            where: { isDeleted: false },
            relations: ['vendor'],
            order: { createdAt: 'DESC' },
            take: 5,
        });
        const recentBills = await this.billRepo.find({
            where: { isDeleted: false },
            relations: ['vendor'],
            order: { createdAt: 'DESC' },
            take: 5,
        });
        return {
            pendingPOs: pendingPOs.map((po) => {
                const totalQty = po.items?.reduce((s, i) => s + Number(i.quantity), 0) || 0;
                const totalBilled = po.items?.reduce((s, i) => s + Number(i.billedQuantity || 0), 0) || 0;
                return {
                    id: po.id,
                    poNumber: po.poNumber,
                    vendorName: po.vendor?.name,
                    projectName: po.project?.name,
                    totalAmount: po.totalAmount,
                    fulfillment: totalQty > 0 ? Math.round((totalBilled / totalQty) * 100) : 0,
                    createdAt: po.createdAt,
                };
            }),
            kpis: {
                totalPayable,
                unpaidBillCount,
                activePOCount: pendingPOs.length,
                totalPOValue: recentPOs.reduce((s, p) => s + Number(p.totalAmount), 0),
            },
            recentActivity: {
                pos: recentPOs,
                bills: recentBills,
            },
        };
    }
    async getAccountsDashboard() {
        const invoices = await this.invoiceRepo.find({
            where: { isDeleted: false },
            relations: ['project'],
        });
        const totalReceivable = invoices.reduce((sum, inv) => {
            if (inv.status === enums_js_1.InvoiceStatus.PAID ||
                inv.status === enums_js_1.InvoiceStatus.CANCELLED)
                return sum;
            const balance = Number(inv.totalAmount) +
                Number(inv.gstAmount) -
                Number(inv.paidAmount || 0);
            return sum + balance;
        }, 0);
        const pendingInvoiceCount = invoices.filter((inv) => inv.status !== enums_js_1.InvoiceStatus.PAID &&
            inv.status !== enums_js_1.InvoiceStatus.CANCELLED).length;
        const bills = await this.billRepo.find({
            where: { isDeleted: false },
            relations: ['vendor'],
        });
        const totalPayable = bills.reduce((sum, bill) => {
            const balance = Number(bill.amount) - Number(bill.paidAmount || 0);
            return sum + balance;
        }, 0);
        const pendingBillCount = bills.filter((b) => Number(b.amount) - Number(b.paidAmount || 0) > 0).length;
        const recentPayments = await this.paymentRepo.find({
            where: { isDeleted: false },
            relations: ['vendor', 'project'],
            order: { paymentDate: 'DESC' },
            take: 10,
        });
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);
        const monthInflow = await this.paymentRepo
            .createQueryBuilder('p')
            .select('SUM(p.amount)', 'total')
            .where('p.isDeleted = false AND p.paymentType = :type AND p.paymentDate >= :start', {
            type: 'revenue',
            start: startOfMonth,
        })
            .getRawOne();
        const monthOutflow = await this.paymentRepo
            .createQueryBuilder('p')
            .select('SUM(p.amount)', 'total')
            .where('p.isDeleted = false AND p.paymentType != :type AND p.paymentDate >= :start', {
            type: 'revenue',
            start: startOfMonth,
        })
            .getRawOne();
        return {
            kpis: {
                totalReceivable,
                pendingInvoiceCount,
                totalPayable,
                pendingBillCount,
                monthInflow: Number(monthInflow?.total || 0),
                monthOutflow: Number(monthOutflow?.total || 0),
            },
            recentPayments: recentPayments.map((p) => ({
                id: p.id,
                amount: p.amount,
                date: p.paymentDate,
                mode: p.paymentMode,
                type: p.paymentType,
                party: p.vendor?.name || p.project?.clientName || p.payeeName,
            })),
        };
    }
    async getMasterDashboard() {
        const projects = await this.projectsRepo.find({
            where: { isDeleted: false },
        });
        const totalProjects = projects.length;
        const revenueResult = await this.invoiceRepo
            .createQueryBuilder('inv')
            .select('SUM(inv.totalAmount + inv.gstAmount)', 'total')
            .where('inv.isDeleted = false AND inv.status = :status', {
            status: enums_js_1.InvoiceStatus.PAID,
        })
            .getRawOne();
        const paymentCost = await this.paymentRepo
            .createQueryBuilder('p')
            .leftJoin('p.expense', 'expense')
            .select('SUM(p.amount)', 'total')
            .where('p.isDeleted = false')
            .andWhere("p.paymentType != 'revenue'")
            .andWhere('(expense.status = :status OR expense.status IS NULL)', {
            status: 'approved',
        })
            .getRawOne();
        const revenuePayment = await this.paymentRepo
            .createQueryBuilder('p')
            .select('SUM(p.amount)', 'total')
            .where('p.isDeleted = false')
            .andWhere("p.paymentType = 'revenue'")
            .getRawOne();
        const totalRevenue = Number(revenueResult?.total || 0);
        const totalCost = Number(paymentCost?.total || 0);
        const totalInflow = Number(revenuePayment?.total || 0);
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
            revenueVsCost: { totalRevenue, totalCost, totalInflow },
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
        const materialRequirements = await this.enquiryRepo.find({
            where: { createdBy: userId, isDeleted: false },
            relations: ['project'],
            order: { createdAt: 'DESC' },
        });
        const mrTotal = materialRequirements.length;
        const mrPending = materialRequirements.filter((m) => m.status === 'pending').length;
        const mrApproved = materialRequirements.filter((m) => m.status === 'approved').length;
        const mrRejected = materialRequirements.filter((m) => m.status === 'rejected').length;
        const recentMRs = materialRequirements.slice(0, 5).map((m) => ({
            id: m.id,
            enquiryNo: m.enquiryNo,
            projectName: m.project?.name || '-',
            status: m.status,
            createdAt: m.createdAt,
        }));
        const today = new Date();
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const monthTimesheets = await this.tsRepo.find({
            where: {
                siteEngineerId: userId,
                isDeleted: false,
                weekStart: (0, typeorm_2.MoreThanOrEqual)(startOfMonth),
            },
        });
        const tsApproved = monthTimesheets.filter((t) => t.status === 'approved').length;
        const tsSubmitted = monthTimesheets.filter((t) => t.status === 'submitted').length;
        const tsDraft = monthTimesheets.filter((t) => t.status === 'draft' || t.status === 'pending').length;
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
            materialRequirementCounts: { total: mrTotal, pending: mrPending, approved: mrApproved, rejected: mrRejected },
            recentMaterialRequirements: recentMRs,
            timesheetCounts: { approved: tsApproved, submitted: tsSubmitted, draft: tsDraft, total: monthTimesheets.length },
        };
    }
    async getEngineerReport(user) {
        const engineer = await this.usersRepo.findOne({
            where: { id: user.id, isActive: true },
            relations: ['projects', 'salaryGrade'],
        });
        if (!engineer)
            throw new common_1.NotFoundException('Engineer not found');
        const hourlyRate = engineer.salaryGrade?.avgCostPerHr ?? 0;
        const assignedProjects = (engineer.projects || []).map((p) => ({
            id: p.id,
            name: p.name,
            completionPct: Number(p.completionPct),
        }));
        const mrs = await this.enquiryRepo.find({
            where: { createdBy: user.id, isDeleted: false },
            relations: ['project'],
            order: { createdAt: 'DESC' },
        });
        const timesheets = await this.tsRepo.find({
            where: { siteEngineerId: user.id, isDeleted: false },
            order: { weekStart: 'DESC' },
        });
        const today = new Date();
        const thirtyDaysAgo = new Date(today);
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const attendanceLogs = await this.attendanceRepo.find({
            where: { logDate: (0, typeorm_2.MoreThanOrEqual)(thirtyDaysAgo) },
            relations: ['project'],
            order: { logDate: 'DESC' },
        });
        return {
            engineer: { id: engineer.id, name: engineer.name, email: engineer.email, employeeId: engineer.employeeId, phone: engineer.phone },
            assignedProjects,
            materialRequirements: mrs.map((m) => ({
                id: m.id,
                enquiryNo: m.enquiryNo,
                projectName: m.project?.name || '-',
                status: m.status,
                items: m.items,
                notes: m.notes,
                createdAt: m.createdAt,
            })),
            hourlyRate,
            timesheets: timesheets.map((t) => ({
                id: t.id,
                weekStart: t.weekStart,
                weekEnd: t.weekEnd,
                totalHours: Number(t.totalHours),
                earnedAmount: Number((Number(t.totalHours) * hourlyRate).toFixed(2)),
                status: t.status,
            })),
            attendanceLogs: attendanceLogs.map((a) => ({
                date: a.logDate,
                projectName: a.project?.name || '-',
                headcount: a.headcount,
            })),
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
    __param(8, (0, typeorm_1.InjectRepository)(purchase_order_entity_js_1.PurchaseOrder)),
    __param(9, (0, typeorm_1.InjectRepository)(purchase_enquiry_entity_js_1.PurchaseEnquiry)),
    __param(10, (0, typeorm_1.InjectRepository)(weekly_timesheet_entity_js_1.WeeklyTimesheet)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map