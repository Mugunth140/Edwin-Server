import { DashboardService } from './dashboard.service.js';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    getMaster(): Promise<{
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
    getAccounts(): Promise<{
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
    getPurchase(req: any): Promise<{
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
                status: import("../common/enums.js").PurchaseOrderStatus;
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
    getPurchaseAssignedProjects(req: any): Promise<{
        id: string;
        name: string;
        projectCode: string;
        status: import("../common/enums.js").ProjectStatus;
        completionPct: number;
        location: string;
        clientName: string;
    }[]>;
    getEngineer(req: any): Promise<{
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
    getEngineerReport(req: any): Promise<{
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
