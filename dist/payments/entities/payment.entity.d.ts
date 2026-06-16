import { PaymentType, PaymentMode } from '../../common/enums.js';
import { Project } from '../../projects/entities/project.entity.js';
import { PurchaseBill } from '../../accounts/entities/purchase-bill.entity.js';
import { Vendor } from '../../vendors/entities/vendor.entity.js';
import { Expense } from '../../expenses/entities/expense.entity.js';
import { SalesInvoice } from '../../accounts/entities/sales-invoice.entity.js';
export declare class Payment {
    id: string;
    paymentType: PaymentType;
    purchaseBill: PurchaseBill;
    purchaseBillId: string;
    salesInvoice: SalesInvoice;
    salesInvoiceId: string;
    expense: Expense;
    expenseId: string;
    vendor: Vendor;
    vendorId: string;
    payeeName: string;
    amount: number;
    paymentDate: Date;
    paymentMode: PaymentMode;
    referenceNumber: string;
    project: Project;
    projectId: string;
    notes: string;
    isDeleted: boolean;
    createdBy: string;
    createdAt: Date;
}
