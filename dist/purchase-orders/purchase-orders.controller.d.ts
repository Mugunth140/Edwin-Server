import { PurchaseOrdersService } from './purchase-orders.service.js';
import { CreatePurchaseOrderDto } from './dto/create-purchase-order.dto.js';
import { UpdatePurchaseOrderStatusDto } from './dto/update-purchase-order-status.dto.js';
export declare class PurchaseOrdersController {
    private readonly poService;
    constructor(poService: PurchaseOrdersService);
    create(dto: CreatePurchaseOrderDto, req: any): Promise<import("./entities/purchase-order.entity.js").PurchaseOrder>;
    findAll(): Promise<import("./entities/purchase-order.entity.js").PurchaseOrder[]>;
    findOne(id: string): Promise<import("./entities/purchase-order.entity.js").PurchaseOrder>;
    updateStatus(id: string, dto: UpdatePurchaseOrderStatusDto, req: any): Promise<import("./entities/purchase-order.entity.js").PurchaseOrder>;
    update(id: string, dto: any, req: any): Promise<import("./entities/purchase-order.entity.js").PurchaseOrder>;
    uploadFile(file: Express.Multer.File): Promise<{
        fileUrl: string;
        fileKey: string;
    }>;
    remove(id: string): Promise<void>;
}
