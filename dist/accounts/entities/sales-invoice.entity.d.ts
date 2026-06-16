import { InvoiceStatus } from '../../common/enums.js';
import { Project } from '../../projects/entities/project.entity.js';
import { InvoiceItem } from './invoice-item.entity.js';
import { Payment } from '../../payments/entities/payment.entity.js';
export declare class SalesInvoice {
    id: string;
    invoiceNumber: string;
    project: Project;
    projectId: string;
    status: InvoiceStatus;
    totalAmount: number;
    paidAmount: number;
    cgstAmount: number;
    sgstAmount: number;
    igstAmount: number;
    gstAmount: number;
    dueDate: Date;
    paidAt: Date;
    reminderSentAt: Date;
    items: InvoiceItem[];
    payments: Payment[];
    isDeleted: boolean;
    createdBy: string;
    updatedBy: string;
    createdAt: Date;
    updatedAt: Date;
}
