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
exports.DrawingsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const drawing_entity_js_1 = require("./entities/drawing.entity.js");
let DrawingsService = class DrawingsService {
    drawingsRepo;
    constructor(drawingsRepo) {
        this.drawingsRepo = drawingsRepo;
    }
    async create(data) {
        const drawing = this.drawingsRepo.create(data);
        return this.drawingsRepo.save(drawing);
    }
    async findAll(query) {
        const qb = this.drawingsRepo.createQueryBuilder('d')
            .leftJoinAndSelect('d.project', 'project')
            .where('d.isDeleted = false');
        if (query.projectId)
            qb.andWhere('d.projectId = :projectId', { projectId: query.projectId });
        if (query.category)
            qb.andWhere('d.category = :category', { category: query.category });
        if (query.revision)
            qb.andWhere('d.revision = :revision', { revision: query.revision });
        return qb.orderBy('d.createdAt', 'DESC').getMany();
    }
    async findOne(id) {
        const drawing = await this.drawingsRepo.findOne({ where: { id, isDeleted: false }, relations: ['project'] });
        if (!drawing)
            throw new common_1.NotFoundException('Drawing not found');
        return drawing;
    }
    async softDelete(id) {
        await this.drawingsRepo.update(id, { isDeleted: true });
    }
};
exports.DrawingsService = DrawingsService;
exports.DrawingsService = DrawingsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(drawing_entity_js_1.Drawing)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DrawingsService);
//# sourceMappingURL=drawings.service.js.map