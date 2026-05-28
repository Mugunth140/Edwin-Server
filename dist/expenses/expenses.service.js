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
exports.ExpensesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const expense_entity_js_1 = require("./entities/expense.entity.js");
let ExpensesService = class ExpensesService {
    expensesRepo;
    constructor(expensesRepo) {
        this.expensesRepo = expensesRepo;
    }
    async create(dto, userId) {
        const expense = this.expensesRepo.create({ ...dto, createdBy: userId });
        return this.expensesRepo.save(expense);
    }
    async findAll(query) {
        const { category, projectId, dateFrom, dateTo, page = 1, limit = 20 } = query;
        const qb = this.expensesRepo.createQueryBuilder('e')
            .leftJoinAndSelect('e.project', 'project')
            .where('e.isDeleted = false');
        if (category)
            qb.andWhere('e.category = :category', { category });
        if (projectId)
            qb.andWhere('e.projectId = :projectId', { projectId });
        if (dateFrom && dateTo)
            qb.andWhere('e.expenseDate BETWEEN :dateFrom AND :dateTo', { dateFrom, dateTo });
        qb.orderBy('e.expenseDate', 'DESC').skip((page - 1) * limit).take(limit);
        const [data, total] = await qb.getManyAndCount();
        return { data, total, page, limit };
    }
    async findOne(id) {
        const expense = await this.expensesRepo.findOne({
            where: { id, isDeleted: false },
            relations: ['project'],
        });
        if (!expense)
            throw new common_1.NotFoundException('Expense not found');
        return expense;
    }
    async update(id, dto) {
        const expense = await this.findOne(id);
        Object.assign(expense, dto);
        return this.expensesRepo.save(expense);
    }
    async softDelete(id) {
        const expense = await this.findOne(id);
        expense.isDeleted = true;
        await this.expensesRepo.save(expense);
    }
    async getSummary() {
        const result = await this.expensesRepo
            .createQueryBuilder('e')
            .select('e.category', 'category')
            .addSelect('SUM(e.amount)', 'total')
            .where('e.isDeleted = false')
            .groupBy('e.category')
            .getRawMany();
        return result;
    }
};
exports.ExpensesService = ExpensesService;
exports.ExpensesService = ExpensesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(expense_entity_js_1.Expense)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ExpensesService);
//# sourceMappingURL=expenses.service.js.map