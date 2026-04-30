import { WorkOrder } from './work-order.entity.js';
export declare class WorkOrderItem {
    id: string;
    workOrder: WorkOrder;
    workOrderId: string;
    description: string;
    quantity: number;
    unit: string;
    rate: number;
    amount: number;
}
