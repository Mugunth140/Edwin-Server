import { PurchaseOrderStatus } from '../../common/enums.js';
import { Vendor } from '../../vendors/entities/vendor.entity.js';
import { Project } from '../../projects/entities/project.entity.js';
import { PoItem } from './po-item.entity.js';
export declare class PurchaseOrder {
    id: string;
    poNumber: string;
    vendor: Vendor;
    vendorId: string;
    project: Project;
    projectId: string;
    enquiryNo: string;
    paymentTerms: string;
    status: PurchaseOrderStatus;
    totalAmount: number;
    gstPercent: number;
    gstAmount: number;
    totalWithGst: number;
    billFileUrl: string;
    billFileKey: string;
    items: PoItem[];
    isDeleted: boolean;
    createdBy: string;
    updatedBy: string;
    createdAt: Date;
    updatedAt: Date;
}
