import { PurchaseOrder } from './purchase-order.entity.js';
export declare class PoItem {
    id: string;
    purchaseOrder: PurchaseOrder;
    purchaseOrderId: string;
    description: string;
    quantity: number;
    unit: string;
    rate: number;
    amount: number;
}
