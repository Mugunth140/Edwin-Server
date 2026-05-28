import { InvoiceStatus } from '../common/enums.js';
import { AccountsService } from './accounts.service.js';
import { CreateInvoiceDto, CreateBillDto, CreateAdvanceDto, CreateBoqDto } from './dto/accounts.dto.js';
export declare class AccountsController {
    private readonly accountsService;
    constructor(accountsService: AccountsService);
    getLedger(): Promise<{
        type: string;
        refNumber: string;
        party: string;
        amount: number;
        date: Date;
        status: string;
    }[]>;
    getPayables(): Promise<import("./entities/purchase-bill.entity.js").PurchaseBill[]>;
    getReceivables(): Promise<import("./entities/sales-invoice.entity.js").SalesInvoice[]>;
    getBalance(): Promise<{
        totalRevenue: number;
        totalCost: number;
    }>;
    createInvoice(dto: CreateInvoiceDto, req: any): Promise<import("./entities/sales-invoice.entity.js").SalesInvoice>;
    findInvoices(status?: InvoiceStatus, customerId?: string, projectId?: string): Promise<import("./entities/sales-invoice.entity.js").SalesInvoice[]>;
    updateInvoiceStatus(id: string, status: InvoiceStatus): Promise<import("./entities/sales-invoice.entity.js").SalesInvoice>;
    createBill(dto: CreateBillDto, req: any): Promise<import("./entities/purchase-bill.entity.js").PurchaseBill>;
    findBills(): Promise<import("./entities/purchase-bill.entity.js").PurchaseBill[]>;
    convertPoToBill(id: string, req: any): Promise<import("./entities/purchase-bill.entity.js").PurchaseBill>;
    createBoq(dto: CreateBoqDto): Promise<import("./entities/boq-item.entity.js").BoqItem>;
    findBoq(projectId: string): Promise<import("./entities/boq-item.entity.js").BoqItem[]>;
    createAdvance(dto: CreateAdvanceDto, req: any): Promise<import("./entities/advance.entity.js").Advance>;
    findAdvances(): Promise<import("./entities/advance.entity.js").Advance[]>;
}
