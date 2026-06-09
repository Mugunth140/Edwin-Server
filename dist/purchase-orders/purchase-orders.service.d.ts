import { Repository } from 'typeorm';
import { PurchaseOrder } from './entities/purchase-order.entity.js';
import { PoItem } from './entities/po-item.entity.js';
import { CreatePurchaseOrderDto } from './dto/create-purchase-order.dto.js';
import { PurchaseOrderStatus } from '../common/enums.js';
export declare class PurchaseOrdersService {
    private poRepo;
    private poItemRepo;
    constructor(poRepo: Repository<PurchaseOrder>, poItemRepo: Repository<PoItem>);
    private generatePoNumber;
    create(dto: CreatePurchaseOrderDto, userId?: string): Promise<PurchaseOrder>;
    findAll(): Promise<PurchaseOrder[]>;
    findOne(id: string): Promise<PurchaseOrder>;
    updateStatus(id: string, status: PurchaseOrderStatus): Promise<PurchaseOrder>;
    update(id: string, dto: any, userId?: string): Promise<PurchaseOrder>;
    remove(id: string): Promise<void>;
}
