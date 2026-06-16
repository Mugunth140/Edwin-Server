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
const enums_js_1 = require("../common/enums.js");
const purchase_bill_entity_js_1 = require("../accounts/entities/purchase-bill.entity.js");
const expense_entity_js_1 = require("../expenses/entities/expense.entity.js");
const sales_invoice_entity_js_1 = require("../accounts/entities/sales-invoice.entity.js");
let PaymentsService = class PaymentsService {
    paymentsRepo;
    billRepo;
    expenseRepo;
    dataSource;
    constructor(paymentsRepo, billRepo, expenseRepo, dataSource) {
        this.paymentsRepo = paymentsRepo;
        this.billRepo = billRepo;
        this.expenseRepo = expenseRepo;
        this.dataSource = dataSource;
    }
    async create(dto, userId) {
        return await this.dataSource.transaction(async (manager) => {
            let projectId = dto.projectId;
            let vendorId = dto.vendorId;
            if (dto.purchaseBillId) {
                const bill = await manager.findOne(purchase_bill_entity_js_1.PurchaseBill, {
                    where: { id: dto.purchaseBillId },
                });
                if (!bill)
                    throw new common_1.NotFoundException('Purchase Bill not found');
                projectId = bill.projectId;
                vendorId = bill.vendorId;
                const newPaidAmount = Number(bill.paidAmount) + Number(dto.amount);
                bill.paidAmount = newPaidAmount;
                if (newPaidAmount >= Number(bill.amount)) {
                    bill.status = enums_js_1.BillStatus.APPROVED;
                    bill.paidAt = new Date();
                }
                else if (newPaidAmount > 0) {
                    bill.status = enums_js_1.BillStatus.APPROVED;
                }
                await manager.save(bill);
            }
            if (dto.salesInvoiceId) {
                const invoice = await manager.findOne(sales_invoice_entity_js_1.SalesInvoice, {
                    where: { id: dto.salesInvoiceId },
                });
                if (!invoice)
                    throw new common_1.NotFoundException('Sales Invoice not found');
                projectId = invoice.projectId;
                const newPaidAmount = Number(invoice.paidAmount || 0) + Number(dto.amount);
                invoice.paidAmount = newPaidAmount;
                const totalExpected = Number(invoice.totalAmount) + Number(invoice.gstAmount);
                if (newPaidAmount >= totalExpected) {
                    invoice.status = enums_js_1.InvoiceStatus.PAID;
                    invoice.paidAt = new Date();
                }
                else if (newPaidAmount > 0) {
                    invoice.status = enums_js_1.InvoiceStatus.PARTIAL;
                }
                await manager.save(invoice);
            }
            const payment = manager.create(payment_entity_js_1.Payment, {
                ...dto,
                projectId,
                vendorId,
                createdBy: userId,
            });
            return await manager.save(payment);
        });
    }
    async findAll(query) {
        const { type, projectId, dateFrom, dateTo, page = 1, limit = 20 } = query;
        const qb = this.paymentsRepo.createQueryBuilder('p')
            .leftJoinAndSelect('p.project', 'project')
            .leftJoinAndSelect('p.vendor', 'vendor')
            .leftJoinAndSelect('p.purchaseBill', 'purchaseBill')
            .leftJoinAndSelect('p.expense', 'expense')
            .leftJoinAndSelect('p.salesInvoice', 'salesInvoice')
            .leftJoinAndSelect('salesInvoice.project', 'invoiceProject')
            .where('p.isDeleted = false')
            .andWhere('(expense.isDeleted = false OR expense.isDeleted IS NULL)')
            .andWhere('(expense.status = :approved OR expense.status IS NULL)', { approved: 'approved' });
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
            .leftJoin('p.expense', 'expense')
            .select('p.paymentType', 'paymentType')
            .addSelect('SUM(p.amount)', 'total')
            .where('p.isDeleted = false')
            .andWhere('(expense.isDeleted = false OR expense.isDeleted IS NULL)')
            .andWhere('(expense.status = :approved OR expense.status IS NULL)', { approved: 'approved' })
            .groupBy('p.paymentType')
            .getRawMany();
    }
    async syncExpenses() {
        const expenses = await this.expenseRepo.find({ where: { isDeleted: false, status: enums_js_1.ExpenseStatus.APPROVED } });
        let count = 0;
        for (const exp of expenses) {
            const exists = await this.paymentsRepo.findOne({ where: { expenseId: exp.id, isDeleted: false } });
            if (!exists) {
                let pType = enums_js_1.PaymentType.STAFF_EXPENSE;
                if (exp.category === enums_js_1.ExpenseCategory.OFFICE)
                    pType = enums_js_1.PaymentType.OFFICE_MAINTENANCE;
                if (exp.category === enums_js_1.ExpenseCategory.TRANSPORT)
                    pType = enums_js_1.PaymentType.TRANSPORT;
                if (exp.category === enums_js_1.ExpenseCategory.TRAVEL)
                    pType = enums_js_1.PaymentType.TRAVEL;
                const payment = this.paymentsRepo.create({
                    paymentType: pType,
                    expenseId: exp.id,
                    amount: exp.amount,
                    paymentDate: exp.expenseDate,
                    paymentMode: enums_js_1.PaymentMode.CASH,
                    payeeName: exp.paidBy || 'Staff',
                    projectId: exp.projectId,
                    notes: exp.description,
                });
                await this.paymentsRepo.save(payment);
                count++;
            }
        }
        return { success: true, syncedCount: count };
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(payment_entity_js_1.Payment)),
    __param(1, (0, typeorm_1.InjectRepository)(purchase_bill_entity_js_1.PurchaseBill)),
    __param(2, (0, typeorm_1.InjectRepository)(expense_entity_js_1.Expense)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], PaymentsService);
//# sourceMappingURL=payments.service.js.map