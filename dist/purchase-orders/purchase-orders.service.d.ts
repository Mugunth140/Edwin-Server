import { Repository } from 'typeorm';
import { PurchaseOrder } from './entities/purchase-order.entity.js';
import { PoItem } from './entities/po-item.entity.js';
import { CreatePurchaseOrderDto } from './dto/create-purchase-order.dto.js';
export declare class PurchaseOrdersService {
    private poRepo;
    private poItemRepo;
    constructor(poRepo: Repository<PurchaseOrder>, poItemRepo: Repository<PoItem>);
    private generatePoNumber;
    create(dto: CreatePurchaseOrderDto, userId?: string): Promise<PurchaseOrder>;
    findAll(): Promise<PurchaseOrder[]>;
    findOne(id: string): Promise<PurchaseOrder>;
}
