import { AdvanceEntityType } from '../../common/enums.js';
export declare class InvoiceItemDto {
    description: string;
    quantity: number;
    unit?: string;
    rate: number;
}
export declare class CreateInvoiceDto {
    customerId: string;
    projectId?: string;
    dueDate?: string;
    items: InvoiceItemDto[];
}
export declare class CreateBillDto {
    vendorId: string;
    purchaseOrderId?: string;
    projectId?: string;
    amount: number;
    dueDate?: string;
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
