import { Vendor } from '../../vendors/entities/vendor.entity.js';
import { PurchaseOrder } from '../../purchase-orders/entities/purchase-order.entity.js';
import { Project } from '../../projects/entities/project.entity.js';
export declare class PurchaseBill {
    id: string;
    billNumber: string;
    vendor: Vendor;
    vendorId: string;
    purchaseOrder: PurchaseOrder;
    purchaseOrderId: string;
    project: Project;
    projectId: string;
    amount: number;
    billDate: Date;
    dueDate: Date;
    paidAt: Date;
    isDeleted: boolean;
    createdBy: string;
    createdAt: Date;
}
