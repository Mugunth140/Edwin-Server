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
    getPurchase(): Promise<{
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
            pos: import("../purchase-orders/entities/purchase-order.entity.js").PurchaseOrder[];
            bills: import("../accounts/entities/purchase-bill.entity.js").PurchaseBill[];
        };
    }>;
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
    }>;
}
