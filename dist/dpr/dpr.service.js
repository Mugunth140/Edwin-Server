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
exports.DprService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const dpr_report_entity_js_1 = require("./entities/dpr-report.entity.js");
const enums_js_1 = require("../common/enums.js");
let DprService = class DprService {
    dprRepo;
    constructor(dprRepo) {
        this.dprRepo = dprRepo;
    }
    async create(data) {
        const report = this.dprRepo.create(data);
        return this.dprRepo.save(report);
    }
    async findAll(query, user) {
        const { projectId, dateFrom, dateTo, page = 1, limit = 20 } = query;
        console.log('DPR Filter Query:', { projectId, dateFrom, dateTo });
        const qb = this.dprRepo.createQueryBuilder('dpr')
            .leftJoinAndSelect('dpr.project', 'project')
            .where('dpr.isDeleted = false');
        if (projectId && projectId !== 'undefined' && projectId !== '') {
            qb.andWhere('dpr.projectId = :projectId', { projectId });
        }
        if (dateFrom && dateFrom !== '' && dateFrom !== 'undefined') {
            const fromDate = new Date(dateFrom);
            if (!isNaN(fromDate.getTime())) {
                qb.andWhere('dpr.reportDate >= :dateFromFormatted', {
                    dateFromFormatted: fromDate.toISOString().split('T')[0]
                });
            }
        }
        if (dateTo && dateTo !== '' && dateTo !== 'undefined') {
            const toDate = new Date(dateTo);
            if (!isNaN(toDate.getTime())) {
                qb.andWhere('dpr.reportDate <= :dateToFormatted', {
                    dateToFormatted: toDate.toISOString().split('T')[0]
                });
            }
        }
        if (user && user.role === enums_js_1.Role.SITE_ENGINEER) {
            qb.andWhere('dpr.uploadedBy = :userId', { userId: user.id });
        }
        qb.orderBy('dpr.reportDate', 'DESC');
        qb.addOrderBy('dpr.createdAt', 'DESC');
        qb.skip((page - 1) * limit).take(limit);
        console.log('SQL Query:', qb.getSql());
        console.log('SQL Parameters:', qb.getParameters());
        const [data, total] = await qb.getManyAndCount();
        return { data, total, page, limit };
    }
    async findOne(id) {
        const report = await this.dprRepo.findOne({ where: { id, isDeleted: false }, relations: ['project'] });
        if (!report)
            throw new common_1.NotFoundException('DPR Report not found');
        return report;
    }
    async softDelete(id) {
        await this.dprRepo.update(id, { isDeleted: true });
    }
};
exports.DprService = DprService;
exports.DprService = DprService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(dpr_report_entity_js_1.DprReport)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DprService);
//# sourceMappingURL=dpr.service.js.map