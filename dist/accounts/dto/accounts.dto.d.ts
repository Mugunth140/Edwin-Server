import { AdvanceEntityType } from '../../common/enums.js';
export declare class InvoiceItemDto {
    description: string;
    quantity: number;
    unit?: string;
    rate: number;
}
export declare class CreateInvoiceDto {
    projectId: string;
    dueDate?: string;
    items: InvoiceItemDto[];
}
export declare class BillItemDto {
    poItemId: string;
    quantity: number;
    description?: string;
    unit?: string;
    rate?: number;
    orderedQty?: number;
    billedQty?: number;
}
export declare class CreateBillDto {
    vendorId: string;
    purchaseOrderId?: string;
    projectId?: string;
    amount: number;
    gstPercent?: number;
    gstAmount?: number;
    billDate?: string;
    dueDate?: string;
    billFileUrl?: string;
    billFileKey?: string;
    notes?: string;
    items?: BillItemDto[];
}
export declare class CreateAdvanceDto {
    entityType: AdvanceEntityType;
    entityId: string;
    amount: number;
    date: string;
    notes?: string;
}
export declare class CreateBoqDto {
    projectId: string;
    description: string;
    estimatedQty?: number;
    estimatedRate?: number;
    estimatedAmount?: number;
}
