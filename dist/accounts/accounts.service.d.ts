import { Repository } from 'typeorm';
import { SalesInvoice } from './entities/sales-invoice.entity.js';
import { InvoiceItem } from './entities/invoice-item.entity.js';
import { PurchaseBill } from './entities/purchase-bill.entity.js';
import { BoqItem } from './entities/boq-item.entity.js';
import { Advance } from './entities/advance.entity.js';
import { Customer } from '../customers/entities/customer.entity.js';
import { PurchaseOrder } from '../purchase-orders/entities/purchase-order.entity.js';
import { CreateInvoiceDto, CreateBillDto, CreateAdvanceDto, CreateBoqDto } from './dto/accounts.dto.js';
import { InvoiceStatus } from '../common/enums.js';
export declare class AccountsService {
    private invoiceRepo;
    private invoiceItemRepo;
    private billRepo;
    private boqRepo;
    private advanceRepo;
    private customerRepo;
    private poRepo;
    constructor(invoiceRepo: Repository<SalesInvoice>, invoiceItemRepo: Repository<InvoiceItem>, billRepo: Repository<PurchaseBill>, boqRepo: Repository<BoqItem>, advanceRepo: Repository<Advance>, customerRepo: Repository<Customer>, poRepo: Repository<PurchaseOrder>);
    convertPoToBill(poId: string, userId?: string): Promise<PurchaseBill>;
    private generateInvoiceNumber;
    createInvoice(dto: CreateInvoiceDto, userId?: string): Promise<SalesInvoice>;
    findInvoices(query: {
        status?: InvoiceStatus;
        customerId?: string;
        projectId?: string;
    }): Promise<SalesInvoice[]>;
    updateInvoiceStatus(id: string, status: InvoiceStatus): Promise<SalesInvoice>;
    private generateBillNumber;
    createBill(dto: CreateBillDto, userId?: string): Promise<PurchaseBill>;
    findBills(): Promise<PurchaseBill[]>;
    createBoq(dto: CreateBoqDto): Promise<BoqItem>;
    findBoq(projectId: string): Promise<BoqItem[]>;
    createAdvance(dto: CreateAdvanceDto, userId?: string): Promise<Advance>;
    findAdvances(): Promise<Advance[]>;
    getLedger(): Promise<{
        type: string;
        refNumber: string;
        party: string;
        amount: number;
        date: Date;
        status: string;
    }[]>;
    getPayables(): Promise<PurchaseBill[]>;
    getReceivables(): Promise<SalesInvoice[]>;
    getBalance(): Promise<{
        totalRevenue: number;
        totalCost: number;
    }>;
}
