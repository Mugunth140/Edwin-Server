import { InvoiceStatus } from '../../common/enums.js';
import { Project } from '../../projects/entities/project.entity.js';
import { InvoiceItem } from './invoice-item.entity.js';
export declare class SalesInvoice {
    id: string;
    invoiceNumber: string;
    project: Project;
    projectId: string;
    status: InvoiceStatus;
    totalAmount: number;
    cgstAmount: number;
    sgstAmount: number;
    igstAmount: number;
    gstAmount: number;
    dueDate: Date;
    paidAt: Date;
    reminderSentAt: Date;
    items: InvoiceItem[];
    isDeleted: boolean;
    createdBy: string;
    updatedBy: string;
    createdAt: Date;
    updatedAt: Date;
}
