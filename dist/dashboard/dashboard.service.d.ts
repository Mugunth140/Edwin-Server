import { Repository } from 'typeorm';
import { Project } from '../projects/entities/project.entity.js';
import { ProjectMilestone } from '../projects/entities/project-milestone.entity.js';
import { AttendanceLog } from '../projects/entities/attendance-log.entity.js';
import { SalesInvoice } from '../accounts/entities/sales-invoice.entity.js';
import { PurchaseBill } from '../accounts/entities/purchase-bill.entity.js';
import { Expense } from '../expenses/entities/expense.entity.js';
import { Payment } from '../payments/entities/payment.entity.js';
export declare class DashboardService {
    private projectsRepo;
    private milestonesRepo;
    private attendanceRepo;
    private invoiceRepo;
    private billRepo;
    private expenseRepo;
    private paymentRepo;
    constructor(projectsRepo: Repository<Project>, milestonesRepo: Repository<ProjectMilestone>, attendanceRepo: Repository<AttendanceLog>, invoiceRepo: Repository<SalesInvoice>, billRepo: Repository<PurchaseBill>, expenseRepo: Repository<Expense>, paymentRepo: Repository<Payment>);
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
        };
        weeklyLabour: {
            weekStart: any;
            headcount: number;
        }[];
        criticalActions: never[];
    }>;
}
