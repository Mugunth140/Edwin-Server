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
exports.WorkOrdersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const work_order_entity_js_1 = require("./entities/work-order.entity.js");
const work_order_item_entity_js_1 = require("./entities/work-order-item.entity.js");
const vendor_entity_js_1 = require("../vendors/entities/vendor.entity.js");
let WorkOrdersService = class WorkOrdersService {
    woRepo;
    woItemRepo;
    vendorRepo;
    constructor(woRepo, woItemRepo, vendorRepo) {
        this.woRepo = woRepo;
        this.woItemRepo = woItemRepo;
        this.vendorRepo = vendorRepo;
    }
    async generateWoNumber() {
        const year = new Date().getFullYear();
        const lastWo = await this.woRepo
            .createQueryBuilder('wo')
            .where('wo.woNumber LIKE :prefix', { prefix: `WO-${year}-%` })
            .orderBy('wo.woNumber', 'DESC')
            .getOne();
        let seq = 1;
        if (lastWo) {
            const parts = lastWo.woNumber.split('-');
            seq = parseInt(parts[2], 10) + 1;
        }
        return `WO-${year}-${String(seq).padStart(3, '0')}`;
    }
    async create(dto, userId) {
        const vendor = await this.vendorRepo.findOne({ where: { id: dto.vendorId } });
        if (!vendor)
            throw new common_1.NotFoundException('Vendor not found');
        const woNumber = await this.generateWoNumber();
        const items = dto.items.map((item) => {
            const amount = item.quantity * item.rate;
            return this.woItemRepo.create({
                description: item.description,
                quantity: item.quantity,
                unit: item.unit || 'nos',
                rate: item.rate,
                amount,
            });
        });
        const totalAmount = items.reduce((sum, item) => sum + Number(item.amount), 0);
        const gstRate = 0.18;
        const gstAmount = totalAmount * gstRate;
        const companyState = 'Tamil Nadu';
        let cgstAmount = 0;
        let sgstAmount = 0;
        let igstAmount = 0;
        if (vendor.state && vendor.state.toLowerCase() === companyState.toLowerCase()) {
            cgstAmount = gstAmount / 2;
            sgstAmount = gstAmount / 2;
        }
        else {
            igstAmount = gstAmount;
        }
        const workOrder = this.woRepo.create({
            woNumber,
            vendorId: dto.vendorId,
            projectId: dto.projectId,
            terms: dto.terms,
            totalAmount,
            gstAmount,
            cgstAmount,
            sgstAmount,
            igstAmount,
            items,
            createdBy: userId,
        });
        return this.woRepo.save(workOrder);
    }
    async findAll(query) {
        const { status, projectId, vendorId, page = 1, limit = 20 } = query;
        const qb = this.woRepo
            .createQueryBuilder('wo')
            .leftJoinAndSelect('wo.vendor', 'vendor')
            .leftJoinAndSelect('wo.project', 'project')
            .leftJoinAndSelect('wo.items', 'items')
            .where('wo.isDeleted = false');
        if (status)
            qb.andWhere('wo.status = :status', { status });
        if (projectId)
            qb.andWhere('wo.projectId = :projectId', { projectId });
        if (vendorId)
            qb.andWhere('wo.vendorId = :vendorId', { vendorId });
        qb.orderBy('wo.createdAt', 'DESC');
        qb.skip((page - 1) * limit).take(limit);
        const [data, total] = await qb.getManyAndCount();
        return { data, total, page, limit };
    }
    async findOne(id) {
        const wo = await this.woRepo.findOne({
            where: { id, isDeleted: false },
            relations: ['vendor', 'items', 'project'],
        });
        if (!wo)
            throw new common_1.NotFoundException('Work Order not found');
        return wo;
    }
    async updateStatus(id, status, userId) {
        const wo = await this.findOne(id);
        wo.status = status;
        wo.updatedBy = userId ?? '';
        return this.woRepo.save(wo);
    }
    async update(id, dto, userId) {
        const wo = await this.findOne(id);
        const vendor = await this.vendorRepo.findOne({ where: { id: dto.vendorId || wo.vendorId } });
        if (!vendor)
            throw new common_1.NotFoundException('Vendor not found');
        if (dto.items) {
            await this.woItemRepo.delete({ workOrderId: id });
            const items = dto.items.map((item) => {
                const amount = item.quantity * item.rate;
                return this.woItemRepo.create({
                    workOrderId: id,
                    description: item.description,
                    quantity: item.quantity,
                    unit: item.unit || 'nos',
                    rate: item.rate,
                    amount,
                });
            });
            wo.items = await this.woItemRepo.save(items);
        }
        Object.assign(wo, {
            ...dto,
            items: wo.items,
            updatedBy: userId ?? '',
        });
        wo.totalAmount = wo.items.reduce((sum, item) => sum + Number(item.amount), 0);
        const gstRate = 0.18;
        wo.gstAmount = wo.totalAmount * gstRate;
        const companyState = 'Tamil Nadu';
        if (vendor.state && vendor.state.toLowerCase() === companyState.toLowerCase()) {
            wo.cgstAmount = wo.gstAmount / 2;
            wo.sgstAmount = wo.gstAmount / 2;
            wo.igstAmount = 0;
        }
        else {
            wo.igstAmount = wo.gstAmount;
            wo.cgstAmount = 0;
            wo.sgstAmount = 0;
        }
        return this.woRepo.save(wo);
    }
    async remove(id) {
        const wo = await this.findOne(id);
        wo.isDeleted = true;
        await this.woRepo.save(wo);
    }
};
exports.WorkOrdersService = WorkOrdersService;
exports.WorkOrdersService = WorkOrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(work_order_entity_js_1.WorkOrder)),
    __param(1, (0, typeorm_1.InjectRepository)(work_order_item_entity_js_1.WorkOrderItem)),
    __param(2, (0, typeorm_1.InjectRepository)(vendor_entity_js_1.Vendor)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], WorkOrdersService);
//# sourceMappingURL=work-orders.service.js.map