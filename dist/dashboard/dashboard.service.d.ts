import { Repository } from 'typeorm';
import { Project } from '../projects/entities/project.entity.js';
import { ProjectMilestone } from '../projects/entities/project-milestone.entity.js';
import { AttendanceLog } from '../projects/entities/attendance-log.entity.js';
import { SalesInvoice } from '../accounts/entities/sales-invoice.entity.js';
import { PurchaseBill } from '../accounts/entities/purchase-bill.entity.js';
import { Expense } from '../expenses/entities/expense.entity.js';
import { Payment } from '../payments/entities/payment.entity.js';
import { User } from '../users/entities/user.entity.js';
import { PurchaseOrder } from '../purchase-orders/entities/purchase-order.entity.js';
export declare class DashboardService {
    private projectsRepo;
    private milestonesRepo;
    private attendanceRepo;
    private invoiceRepo;
    private billRepo;
    private expenseRepo;
    private paymentRepo;
    private usersRepo;
    private poRepo;
    constructor(projectsRepo: Repository<Project>, milestonesRepo: Repository<ProjectMilestone>, attendanceRepo: Repository<AttendanceLog>, invoiceRepo: Repository<SalesInvoice>, billRepo: Repository<PurchaseBill>, expenseRepo: Repository<Expense>, paymentRepo: Repository<Payment>, usersRepo: Repository<User>, poRepo: Repository<PurchaseOrder>);
    getPurchaseDashboard(): Promise<{
        pendingPOs: {
            id: string;
            poNumber: string;
            vendorName: string;
            projectName: string;
            totalAmount: number;
            fulfillment: number;
            createdAt: Date;
        }[];
        kpis: {
            totalPayable: number;
            unpaidBillCount: number;
            activePOCount: number;
            totalPOValue: number;
        };
        recentActivity: {
            pos: PurchaseOrder[];
            bills: PurchaseBill[];
        };
    }>;
    getAccountsDashboard(): Promise<{
        kpis: {
            totalReceivable: number;
            pendingInvoiceCount: number;
            totalPayable: number;
            pendingBillCount: number;
            monthInflow: number;
            monthOutflow: number;
        };
        recentPayments: {
            id: string;
            amount: number;
            date: Date;
            mode: import("../common/enums.js").PaymentMode;
            type: import("../common/enums.js").PaymentType;
            party: string;
        }[];
    }>;
    getMasterDashboard(): Promise<{
        totalProjects: number;
        projects: {
            id: string;
            name: string;
            completionPct: number;
        }[];
        revenueVsCost: {
            totalRevenue: number;
            totalCost: number;
            totalInflow: number;
        };
        weeklyLabour: {
            weekStart: any;
            headcount: number;
        }[];
        criticalActions: never[];
    }>;
    getEngineerDashboard(userId: string): Promise<{
        totalProjects: number;
        projects: {
            id: string;
            name: string;
            completionPct: number;
        }[];
        revenueVsCost: {
            totalRevenue: number;
            totalCost: number;
        };
        weeklyLabour: never[];
        criticalActions: never[];
    }>;
}
