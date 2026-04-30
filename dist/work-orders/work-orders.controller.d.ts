import { WorkOrderStatus } from '../common/enums.js';
import { WorkOrdersService } from './work-orders.service.js';
import { CreateWorkOrderDto } from './dto/create-work-order.dto.js';
import { UpdateWorkOrderStatusDto } from './dto/update-work-order.dto.js';
export declare class WorkOrdersController {
    private readonly woService;
    constructor(woService: WorkOrdersService);
    create(dto: CreateWorkOrderDto, req: any): Promise<import("./entities/work-order.entity.js").WorkOrder>;
    findAll(status?: WorkOrderStatus, projectId?: string, vendorId?: string, page?: number, limit?: number): Promise<{
        data: import("./entities/work-order.entity.js").WorkOrder[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string): Promise<import("./entities/work-order.entity.js").WorkOrder>;
    updateStatus(id: string, dto: UpdateWorkOrderStatusDto, req: any): Promise<import("./entities/work-order.entity.js").WorkOrder>;
}
