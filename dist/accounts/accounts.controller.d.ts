import { AccountsService } from './accounts.service.js';
export declare class AccountsController {
    private readonly accountsService;
    constructor(accountsService: AccountsService);
    getLedger(): Promise<({
        type: string;
        refNumber: string;
        party: string;
        amount: number;
        date: Date;
        status: import("../common/enums.js").InvoiceStatus;
    } | {
        type: string;
        refNumber: string;
        party: string;
        amount: number;
        date: Date;
        status: import("../common/enums.js").BillStatus;
    })[]>;
    getPayables(): Promise<import("./entities/purchase-bill.entity.js").PurchaseBill[]>;
    getReceivables(): Promise<import("./entities/sales-invoice.entity.js").SalesInvoice[]>;
    getBalance(): Promise<{
        totalRevenue: number;
        totalCost: number;
    }>;
}
