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
const enums_js_1 = require("../common/enums.js");
const payment_entity_js_1 = require("../payments/entities/payment.entity.js");
let ExpensesService = class ExpensesService {
    expensesRepo;
    paymentsRepo;
    dataSource;
    constructor(expensesRepo, paymentsRepo, dataSource) {
        this.expensesRepo = expensesRepo;
        this.paymentsRepo = paymentsRepo;
        this.dataSource = dataSource;
    }
    async create(dto, userId, files) {
        return await this.dataSource.transaction(async (manager) => {
            const receiptUrls = [];
            const receiptKeys = [];
            if (files && files.length > 0) {
                files.forEach(file => {
                    receiptUrls.push(`/uploads/expenses/${file.filename}`);
                    receiptKeys.push(file.filename);
                });
            }
            const expense = manager.create(expense_entity_js_1.Expense, {
                ...dto,
                createdBy: userId,
                receiptUrls: receiptUrls.length > 0 ? receiptUrls : undefined,
                receiptKeys: receiptKeys.length > 0 ? receiptKeys : undefined,
                receiptUrl: receiptUrls.length > 0 ? receiptUrls[0] : undefined,
                receiptKey: receiptKeys.length > 0 ? receiptKeys[0] : undefined,
            });
            const savedExpense = await manager.save(expense);
            if (dto.status === 'approved') {
                let pType = enums_js_1.PaymentType.STAFF_EXPENSE;
                if (dto.category === enums_js_1.ExpenseCategory.OFFICE)
                    pType = enums_js_1.PaymentType.OFFICE_MAINTENANCE;
                if (dto.category === enums_js_1.ExpenseCategory.TRANSPORT)
                    pType = enums_js_1.PaymentType.TRANSPORT;
                if (dto.category === enums_js_1.ExpenseCategory.TRAVEL)
                    pType = enums_js_1.PaymentType.TRAVEL;
                const payment = manager.create(payment_entity_js_1.Payment, {
                    paymentType: pType,
                    expenseId: savedExpense.id,
                    amount: dto.amount,
                    paymentDate: dto.expenseDate,
                    paymentMode: enums_js_1.PaymentMode.CASH,
                    payeeName: dto.paidBy || 'Staff',
                    projectId: dto.projectId,
                    notes: dto.description + (dto.remarks ? ` - ${dto.remarks}` : ''),
                    createdBy: userId,
                });
                await manager.save(payment);
            }
            return savedExpense;
        });
    }
    async findAll(query, user) {
        const { category, projectId, dateFrom, dateTo, page = 1, limit = 20 } = query;
        const qb = this.expensesRepo.createQueryBuilder('e')
            .leftJoinAndSelect('e.project', 'project')
            .leftJoinAndSelect('e.trade', 'trade')
            .leftJoinAndSelect('e.creator', 'creator')
            .leftJoinAndSelect('e.expenseType', 'expenseType')
            .where('e.isDeleted = false');
        if (category)
            qb.andWhere('e.category = :category', { category });
        if (projectId)
            qb.andWhere('e.projectId = :projectId', { projectId });
        if (dateFrom && dateTo)
            qb.andWhere('e.expenseDate BETWEEN :dateFrom AND :dateTo', { dateFrom, dateTo });
        if (user && user.role === enums_js_1.Role.SITE_ENGINEER) {
            qb.andWhere('e.createdBy = :userId', { userId: user.id });
        }
        qb.orderBy('e.expenseDate', 'DESC').skip((page - 1) * limit).take(limit);
        const [data, total] = await qb.getManyAndCount();
        return { data, total, page, limit };
    }
    async findOne(id) {
        const expense = await this.expensesRepo.findOne({
            where: { id, isDeleted: false },
            relations: ['project', 'trade', 'creator', 'expenseType'],
        });
        if (!expense)
            throw new common_1.NotFoundException('Expense not found');
        return expense;
    }
    async update(id, dto, files) {
        const expense = await this.findOne(id);
        if (files && files.length > 0) {
            const receiptUrls = expense.receiptUrls || [];
            const receiptKeys = expense.receiptKeys || [];
            files.forEach(file => {
                receiptUrls.push(`/uploads/expenses/${file.filename}`);
                receiptKeys.push(file.filename);
            });
            expense.receiptUrls = receiptUrls;
            expense.receiptKeys = receiptKeys;
            if (!expense.receiptUrl && receiptUrls.length > 0) {
                expense.receiptUrl = receiptUrls[0];
                expense.receiptKey = receiptKeys[0];
            }
        }
        if (dto.status === 'approved' && expense.status !== 'approved') {
            const existing = await this.paymentsRepo.findOne({ where: { expenseId: id } });
            if (existing) {
                if (existing.isDeleted) {
                    await this.paymentsRepo.update({ expenseId: id }, { isDeleted: false });
                }
            }
            else {
                let pType = enums_js_1.PaymentType.STAFF_EXPENSE;
                if (expense.category === enums_js_1.ExpenseCategory.OFFICE)
                    pType = enums_js_1.PaymentType.OFFICE_MAINTENANCE;
                if (expense.category === enums_js_1.ExpenseCategory.TRANSPORT)
                    pType = enums_js_1.PaymentType.TRANSPORT;
                if (expense.category === enums_js_1.ExpenseCategory.TRAVEL)
                    pType = enums_js_1.PaymentType.TRAVEL;
                const payment = this.paymentsRepo.create({
                    paymentType: pType,
                    expenseId: id,
                    amount: expense.amount,
                    paymentDate: expense.expenseDate,
                    paymentMode: enums_js_1.PaymentMode.CASH,
                    payeeName: expense.paidBy || 'Staff',
                    projectId: expense.projectId,
                    notes: expense.description + (expense.remarks ? ` - ${expense.remarks}` : ''),
                    createdBy: expense.createdBy,
                });
                await this.paymentsRepo.save(payment);
            }
        }
        if (dto.status && dto.status !== 'approved' && expense.status === 'approved') {
            await this.paymentsRepo.update({ expenseId: id }, { isDeleted: true });
        }
        Object.assign(expense, dto);
        return this.expensesRepo.save(expense);
    }
    async softDelete(id) {
        const expense = await this.findOne(id);
        expense.isDeleted = true;
        await this.expensesRepo.save(expense);
        await this.paymentsRepo.update({ expenseId: id }, { isDeleted: true });
    }
    async getSummary() {
        const result = await this.expensesRepo
            .createQueryBuilder('e')
            .select('e.category', 'category')
            .addSelect('SUM(e.amount)', 'total')
            .where('e.isDeleted = false')
            .andWhere('e.status = :status', { status: 'approved' })
            .groupBy('e.category')
            .getRawMany();
        return result;
    }
};
exports.ExpensesService = ExpensesService;
exports.ExpensesService = ExpensesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(expense_entity_js_1.Expense)),
    __param(1, (0, typeorm_1.InjectRepository)(payment_entity_js_1.Payment)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], ExpensesService);
//# sourceMappingURL=expenses.service.js.map