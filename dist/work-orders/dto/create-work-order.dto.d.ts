export declare class WorkOrderItemDto {
    description: string;
    quantity: number;
    unit?: string;
    rate: number;
}
export declare class CreateWorkOrderDto {
    vendorId: string;
    projectId: string;
    terms?: string;
    items: WorkOrderItemDto[];
}
