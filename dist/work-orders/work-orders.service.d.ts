import { Repository } from 'typeorm';
import { WorkOrder } from './entities/work-order.entity.js';
import { WorkOrderItem } from './entities/work-order-item.entity.js';
import { Vendor } from '../vendors/entities/vendor.entity.js';
import { CreateWorkOrderDto } from './dto/create-work-order.dto.js';
import { WorkOrderStatus } from '../common/enums.js';
export declare class WorkOrdersService {
    private woRepo;
    private woItemRepo;
    private vendorRepo;
    constructor(woRepo: Repository<WorkOrder>, woItemRepo: Repository<WorkOrderItem>, vendorRepo: Repository<Vendor>);
    private generateWoNumber;
    create(dto: CreateWorkOrderDto, userId?: string): Promise<WorkOrder>;
    findAll(query: {
        status?: WorkOrderStatus;
        projectId?: string;
        vendorId?: string;
        page?: number;
        limit?: number;
    }): Promise<{
        data: WorkOrder[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string): Promise<WorkOrder>;
    updateStatus(id: string, status: WorkOrderStatus, userId?: string): Promise<WorkOrder>;
    update(id: string, dto: any, userId?: string): Promise<WorkOrder>;
    remove(id: string): Promise<void>;
}
