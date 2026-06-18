export declare class PoItemDto {
    description: string;
    quantity: number;
    unit?: string;
    rate: number;
}
export declare class CreatePurchaseOrderDto {
    vendorId: string;
    projectId: string;
    paymentTerms?: string;
    billFileUrl?: string;
    billFileKey?: string;
    items: PoItemDto[];
}
