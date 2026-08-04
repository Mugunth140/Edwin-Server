"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseOrdersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const purchase_order_entity_js_1 = require("./entities/purchase-order.entity.js");
const po_item_entity_js_1 = require("./entities/po-item.entity.js");
let PurchaseOrdersService = class PurchaseOrdersService {
    poRepo;
    poItemRepo;
    constructor(poRepo, poItemRepo) {
        this.poRepo = poRepo;
        this.poItemRepo = poItemRepo;
    }
    async generatePoNumber() {
        const year = new Date().getFullYear();
        const lastPo = await this.poRepo
            .createQueryBuilder('po')
            .where('po.poNumber LIKE :prefix', { prefix: `PO-${year}-%` })
            .orderBy('po.poNumber', 'DESC')
            .getOne();
        let seq = 1;
        if (lastPo) {
            const parts = lastPo.poNumber.split('-');
            seq = parseInt(parts[2], 10) + 1;
        }
        return `PO-${year}-${String(seq).padStart(3, '0')}`;
    }
    async create(dto, userId) {
        const poNumber = await this.generatePoNumber();
        const items = dto.items.map((item) => {
            const amount = item.quantity * item.rate;
            return this.poItemRepo.create({
                ...item,
                unit: item.unit || 'nos',
                amount,
            });
        });
        const basicAmount = items.reduce((sum, item) => sum + Number(item.amount), 0);
        const gstPercent = dto.gstPercent || 0;
        const gstAmount = Number((basicAmount * gstPercent / 100).toFixed(2));
        const totalWithGst = Number((basicAmount + gstAmount).toFixed(2));
        const po = this.poRepo.create({
            poNumber,
            vendorId: dto.vendorId,
            projectId: dto.projectId,
            materialRequirementNo: dto.materialRequirementNo,
            paymentTerms: dto.paymentTerms,
            billFileUrl: dto.billFileUrl,
            billFileKey: dto.billFileKey,
            totalAmount: basicAmount,
            gstPercent,
            gstAmount,
            totalWithGst,
            items,
            createdBy: userId,
        });
        return this.poRepo.save(po);
    }
    async findAll() {
        return this.poRepo.find({
            where: { isDeleted: false },
            relations: ['vendor', 'items', 'project'],
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id) {
        const po = await this.poRepo.findOne({
            where: { id, isDeleted: false },
            relations: ['vendor', 'items', 'project'],
        });
        if (!po)
            throw new common_1.NotFoundException('Purchase Order not found');
        return po;
    }
    async updateStatus(id, status) {
        try {
            const po = await this.findOne(id);
            po.status = status;
            return await this.poRepo.save(po);
        }
        catch (error) {
            console.error('Error updating PO status:', error);
            if (error.code === '22P02') {
                throw new Error(`Database rejected status '${status}'. Please ensure the database schema is updated.`);
            }
            throw error;
        }
    }
    async update(id, dto, userId) {
        const po = await this.findOne(id);
        if (dto.items) {
            await this.poItemRepo.delete({ purchaseOrderId: id });
            const items = dto.items.map((item) => {
                const amount = item.quantity * item.rate;
                return this.poItemRepo.create({
                    purchaseOrderId: id,
                    description: item.description,
                    quantity: item.quantity,
                    unit: item.unit || 'nos',
                    rate: item.rate,
                    amount,
                });
            });
            po.items = await this.poItemRepo.save(items);
        }
        Object.assign(po, {
            ...dto,
            items: po.items,
            updatedBy: userId ?? '',
        });
        const basicAmount = po.items.reduce((sum, item) => sum + Number(item.amount), 0);
        const gstPercent = Number(po.gstPercent) || 0;
        const gstAmount = Number((basicAmount * gstPercent / 100).toFixed(2));
        po.totalAmount = basicAmount;
        po.gstAmount = gstAmount;
        po.totalWithGst = Number((basicAmount + gstAmount).toFixed(2));
        return this.poRepo.save(po);
    }
    async remove(id) {
        const po = await this.findOne(id);
        po.isDeleted = true;
        await this.poRepo.save(po);
    }
};
exports.PurchaseOrdersService = PurchaseOrdersService;
exports.PurchaseOrdersService = PurchaseOrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(purchase_order_entity_js_1.PurchaseOrder)),
    __param(1, (0, typeorm_1.InjectRepository)(po_item_entity_js_1.PoItem)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], PurchaseOrdersService);
//# sourceMappingURL=purchase-orders.service.js.map