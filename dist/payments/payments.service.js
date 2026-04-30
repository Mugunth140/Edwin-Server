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
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const payment_entity_js_1 = require("./entities/payment.entity.js");
let PaymentsService = class PaymentsService {
    paymentsRepo;
    constructor(paymentsRepo) {
        this.paymentsRepo = paymentsRepo;
    }
    async create(dto, userId) {
        const payment = this.paymentsRepo.create({ ...dto, createdBy: userId });
        return this.paymentsRepo.save(payment);
    }
    async findAll(query) {
        const { type, projectId, dateFrom, dateTo, page = 1, limit = 20 } = query;
        const qb = this.paymentsRepo.createQueryBuilder('p')
            .leftJoinAndSelect('p.project', 'project')
            .where('p.isDeleted = false');
        if (type)
            qb.andWhere('p.paymentType = :type', { type });
        if (projectId)
            qb.andWhere('p.projectId = :projectId', { projectId });
        if (dateFrom && dateTo)
            qb.andWhere('p.paymentDate BETWEEN :dateFrom AND :dateTo', { dateFrom, dateTo });
        qb.orderBy('p.paymentDate', 'DESC').skip((page - 1) * limit).take(limit);
        const [data, total] = await qb.getManyAndCount();
        return { data, total, page, limit };
    }
    async getSummary() {
        return this.paymentsRepo
            .createQueryBuilder('p')
            .select('p.paymentType', 'paymentType')
            .addSelect('SUM(p.amount)', 'total')
            .where('p.isDeleted = false')
            .groupBy('p.paymentType')
            .getRawMany();
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(payment_entity_js_1.Payment)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PaymentsService);
//# sourceMappingURL=payments.service.js.map