import { WorkOrderStatus } from '../../common/enums.js';
import { Vendor } from '../../vendors/entities/vendor.entity.js';
import { Project } from '../../projects/entities/project.entity.js';
import { WorkOrderItem } from './work-order-item.entity.js';
export declare class WorkOrder {
    id: string;
    woNumber: string;
    vendor: Vendor;
    vendorId: string;
    project: Project;
    projectId: string;
    status: WorkOrderStatus;
    terms: string;
    totalAmount: number;
    cgstAmount: number;
    sgstAmount: number;
    igstAmount: number;
    gstAmount: number;
    items: WorkOrderItem[];
    isDeleted: boolean;
    createdBy: string;
    updatedBy: string;
    createdAt: Date;
    updatedAt: Date;
}
