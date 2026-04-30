import { PurchaseOrdersService } from './purchase-orders.service.js';
import { CreatePurchaseOrderDto } from './dto/create-purchase-order.dto.js';
export declare class PurchaseOrdersController {
    private readonly poService;
    constructor(poService: PurchaseOrdersService);
    create(dto: CreatePurchaseOrderDto, req: any): Promise<import("./entities/purchase-order.entity.js").PurchaseOrder>;
    findAll(): Promise<import("./entities/purchase-order.entity.js").PurchaseOrder[]>;
    findOne(id: string): Promise<import("./entities/purchase-order.entity.js").PurchaseOrder>;
}
