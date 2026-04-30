import { SalesInvoice } from './sales-invoice.entity.js';
export declare class InvoiceItem {
    id: string;
    invoice: SalesInvoice;
    invoiceId: string;
    description: string;
    quantity: number;
    unit: string;
    rate: number;
    amount: number;
}
