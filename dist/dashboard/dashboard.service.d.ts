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
import { PurchaseEnquiry } from '../purchase-enquiries/entities/purchase-enquiry.entity.js';
import { MaterialReceived } from '../material-received/entities/material-received.entity.js';
import { WeeklyTimesheet } from '../timesheet-attendance/entities/weekly-timesheet.entity.js';
import { PurchaseOrderStatus } from '../common/enums.js';
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
    private enquiryRepo;
    private materialReceivedRepo;
    private tsRepo;
    constructor(projectsRepo: Repository<Project>, milestonesRepo: Repository<ProjectMilestone>, attendanceRepo: Repository<AttendanceLog>, invoiceRepo: Repository<SalesInvoice>, billRepo: Repository<PurchaseBill>, expenseRepo: Repository<Expense>, paymentRepo: Repository<Payment>, usersRepo: Repository<User>, poRepo: Repository<PurchaseOrder>, enquiryRepo: Repository<PurchaseEnquiry>, materialReceivedRepo: Repository<MaterialReceived>, tsRepo: Repository<WeeklyTimesheet>);
    getPurchaseAssignedProjects(userId: string): Promise<{
        id: string;
        name: string;
        projectCode: string;
        status: import("../common/enums.js").ProjectStatus;
        completionPct: number;
        location: string;
        clientName: string;
    }[]>;
    getPurchaseDashboard(userId: string): Promise<{
        pendingPOs: {
            id: string;
            poNumber: string;
            vendorName: string;
            projectName: string;
            fulfillment: number;
            createdAt: Date;
        }[];
        kpis: {
            assignedProjectCount: number;
            materialRequirementCount: number;
            materialReceivedCount: number;
            activePOCount: number;
            unpaidBillCount: number;
        };
        recentActivity: {
            pos: {
                id: string;
                poNumber: string;
                vendorName: string;
                status: PurchaseOrderStatus;
                createdAt: Date;
            }[];
            bills: {
                id: string;
                billNumber: string;
                vendorName: string;
                status: import("../common/enums.js").BillStatus;
                billDate: Date;
            }[];
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
        materialRequirementCounts: {
            total: number;
            pending: number;
            approved: number;
            rejected: number;
        };
        recentMaterialRequirements: {
            id: string;
            enquiryNo: string;
            projectName: string;
            status: string;
            createdAt: Date;
        }[];
        timesheetCounts: {
            approved: number;
            submitted: number;
            draft: number;
            total: number;
        };
    }>;
    getEngineerReport(user: any): Promise<{
        engineer: {
            id: string;
            name: string;
            email: string;
            employeeId: string;
            phone: string;
        };
        assignedProjects: {
            id: string;
            name: string;
            completionPct: number;
        }[];
        materialRequirements: {
            id: string;
            enquiryNo: string;
            projectName: string;
            status: string;
            items: {
                description: string;
                quantity: number;
            }[];
            notes: string;
            createdAt: Date;
        }[];
        hourlyRate: number;
        timesheets: {
            id: string;
            weekStart: Date;
            weekEnd: Date;
            totalHours: number;
            earnedAmount: number;
            status: string;
        }[];
        attendanceLogs: {
            date: Date;
            projectName: string;
            headcount: number;
        }[];
    }>;
}
