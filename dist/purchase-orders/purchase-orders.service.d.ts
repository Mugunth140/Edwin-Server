import { Repository } from 'typeorm';
import { PurchaseOrder } from './entities/purchase-order.entity.js';
import { PoItem } from './entities/po-item.entity.js';
import { CreatePurchaseOrderDto } from './dto/create-purchase-order.dto.js';
import { PurchaseOrderStatus } from '../common/enums.js';
import { PurchaseEnquiry } from '../purchase-enquiries/entities/purchase-enquiry.entity.js';
import { NotificationsService } from '../notifications/notifications.service.js';
type RequestUser = {
    id: string;
    role: string;
    name?: string;
};
export declare class PurchaseOrdersService {
    private poRepo;
    private poItemRepo;
    private purchaseEnquiryRepo;
    private readonly notifications;
    constructor(poRepo: Repository<PurchaseOrder>, poItemRepo: Repository<PoItem>, purchaseEnquiryRepo: Repository<PurchaseEnquiry>, notifications: NotificationsService);
    private generatePoNumber;
    create(dto: CreatePurchaseOrderDto, userId?: string): Promise<PurchaseOrder>;
    findAll(): Promise<PurchaseOrder[]>;
    findOne(id: string): Promise<PurchaseOrder>;
    updateStatus(id: string, status: PurchaseOrderStatus, user?: RequestUser): Promise<PurchaseOrder>;
    update(id: string, dto: any, userId?: string): Promise<PurchaseOrder>;
    remove(id: string): Promise<void>;
}
export {};
