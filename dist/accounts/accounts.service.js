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
exports.AccountsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const sales_invoice_entity_js_1 = require("./entities/sales-invoice.entity.js");
const invoice_item_entity_js_1 = require("./entities/invoice-item.entity.js");
const purchase_bill_entity_js_1 = require("./entities/purchase-bill.entity.js");
const boq_item_entity_js_1 = require("./entities/boq-item.entity.js");
const advance_entity_js_1 = require("./entities/advance.entity.js");
const project_entity_js_1 = require("../projects/entities/project.entity.js");
const purchase_order_entity_js_1 = require("../purchase-orders/entities/purchase-order.entity.js");
const enums_js_1 = require("../common/enums.js");
let AccountsService = class AccountsService {
    invoiceRepo;
    invoiceItemRepo;
    billRepo;
    boqRepo;
    advanceRepo;
    projectRepo;
    poRepo;
    constructor(invoiceRepo, invoiceItemRepo, billRepo, boqRepo, advanceRepo, projectRepo, poRepo) {
        this.invoiceRepo = invoiceRepo;
        this.invoiceItemRepo = invoiceItemRepo;
        this.billRepo = billRepo;
        this.boqRepo = boqRepo;
        this.advanceRepo = advanceRepo;
        this.projectRepo = projectRepo;
        this.poRepo = poRepo;
    }
    async convertPoToBill(poId, userId) {
        const po = await this.poRepo.findOne({ where: { id: poId }, relations: ['vendor'] });
        if (!po)
            throw new common_1.NotFoundException('Purchase Order not found');
        const billNumber = await this.generateBillNumber();
        const bill = this.billRepo.create({
            vendorId: po.vendorId,
            projectId: po.projectId,
            amount: po.totalAmount,
            billDate: new Date(),
            billNumber,
            createdBy: userId,
        });
        return this.billRepo.save(bill);
    }
    async generateInvoiceNumber() {
        const year = new Date().getFullYear();
        const last = await this.invoiceRepo
            .createQueryBuilder('inv')
            .where('inv.invoiceNumber LIKE :prefix', { prefix: `INV-${year}-%` })
            .orderBy('inv.invoiceNumber', 'DESC')
            .getOne();
        let seq = 1;
        if (last) {
            seq = parseInt(last.invoiceNumber.split('-')[2], 10) + 1;
        }
        return `INV-${year}-${String(seq).padStart(3, '0')}`;
    }
    async createInvoice(dto, userId) {
        const project = await this.projectRepo.findOne({ where: { id: dto.projectId } });
        if (!project)
            throw new common_1.NotFoundException('Project not found');
        const invoiceNumber = await this.generateInvoiceNumber();
        const items = dto.items.map((item) => {
            const amount = item.quantity * item.rate;
            return this.invoiceItemRepo.create({ ...item, unit: item.unit || 'nos', amount });
        });
        const totalAmount = items.reduce((sum, item) => sum + Number(item.amount), 0);
        const gstRate = 0.18;
        const gstAmount = totalAmount * gstRate;
        const companyState = 'Tamil Nadu';
        let cgstAmount = 0, sgstAmount = 0, igstAmount = 0;
        const clientState = project.location || '';
        if (clientState.toLowerCase().includes(companyState.toLowerCase())) {
            cgstAmount = gstAmount / 2;
            sgstAmount = gstAmount / 2;
        }
        else {
            igstAmount = gstAmount;
        }
        const invoice = this.invoiceRepo.create({
            invoiceNumber, projectId: dto.projectId,
            dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
            totalAmount, gstAmount, cgstAmount, sgstAmount, igstAmount,
            items, createdBy: userId,
        });
        return this.invoiceRepo.save(invoice);
    }
    async findInvoices(query) {
        const qb = this.invoiceRepo.createQueryBuilder('inv')
            .leftJoinAndSelect('inv.project', 'project')
            .leftJoinAndSelect('inv.items', 'items')
            .where('inv.isDeleted = false');
        if (query.status)
            qb.andWhere('inv.status = :status', { status: query.status });
        if (query.projectId)
            qb.andWhere('inv.projectId = :projectId', { projectId: query.projectId });
        return qb.orderBy('inv.createdAt', 'DESC').getMany();
    }
    async updateInvoiceStatus(id, status) {
        const invoice = await this.invoiceRepo.findOne({ where: { id } });
        if (!invoice)
            throw new common_1.NotFoundException('Invoice not found');
        invoice.status = status;
        if (status === enums_js_1.InvoiceStatus.PAID)
            invoice.paidAt = new Date();
        return this.invoiceRepo.save(invoice);
    }
    async removeInvoice(id) {
        const invoice = await this.invoiceRepo.findOne({ where: { id } });
        if (!invoice)
            throw new common_1.NotFoundException('Invoice not found');
        invoice.isDeleted = true;
        await this.invoiceRepo.save(invoice);
    }
    async generateBillNumber() {
        const year = new Date().getFullYear();
        const last = await this.billRepo
            .createQueryBuilder('bill')
            .where('bill.billNumber LIKE :prefix', { prefix: `BILL-${year}-%` })
            .orderBy('bill.billNumber', 'DESC')
            .getOne();
        let seq = 1;
        if (last) {
            seq = parseInt(last.billNumber.split('-')[2], 10) + 1;
        }
        return `BILL-${year}-${String(seq).padStart(3, '0')}`;
    }
    async createBill(dto, userId) {
        const billNumber = await this.generateBillNumber();
        const bill = this.billRepo.create({ ...dto, billNumber, createdBy: userId });
        return this.billRepo.save(bill);
    }
    async findBills() {
        return this.billRepo.find({ where: { isDeleted: false }, relations: ['vendor', 'payments'], order: { createdAt: 'DESC' } });
    }
    async createBoq(dto) {
        const boq = this.boqRepo.create({
            ...dto,
            estimatedAmount: (dto.estimatedQty || 0) * (dto.estimatedRate || 0),
        });
        return this.boqRepo.save(boq);
    }
    async findBoq(projectId) {
        return this.boqRepo.find({ where: { projectId }, order: { createdAt: 'ASC' } });
    }
    async createAdvance(dto, userId) {
        const advance = this.advanceRepo.create({ ...dto, createdBy: userId });
        return this.advanceRepo.save(advance);
    }
    async findAdvances() {
        return this.advanceRepo.find({ order: { date: 'DESC' } });
    }
    async getLedger() {
        const invoices = await this.invoiceRepo.find({ where: { isDeleted: false }, relations: ['project'] });
        const bills = await this.billRepo.find({ where: { isDeleted: false }, relations: ['vendor'] });
        const ledger = [
            ...invoices.map((inv) => ({
                type: 'RECEIVABLE',
                refNumber: inv.invoiceNumber,
                party: inv.project?.clientName,
                amount: Number(inv.totalAmount) + Number(inv.gstAmount),
                date: inv.createdAt,
                status: inv.status,
            })),
            ...bills.map((bill) => ({
                type: 'PAYABLE',
                refNumber: bill.billNumber,
                party: bill.vendor?.name,
                amount: Number(bill.amount),
                date: bill.createdAt,
                status: bill.paidAt ? 'paid' : 'unpaid',
            })),
        ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        return ledger;
    }
    async getPayables() {
        return this.billRepo.find({ where: { isDeleted: false, paidAt: undefined }, relations: ['vendor'] });
    }
    async getReceivables() {
        return this.invoiceRepo.find({
            where: [
                { isDeleted: false, status: enums_js_1.InvoiceStatus.SENT },
                { isDeleted: false, status: enums_js_1.InvoiceStatus.OVERDUE },
            ],
            relations: ['project'],
        });
    }
    async getBalance() {
        const totalRevenue = await this.invoiceRepo
            .createQueryBuilder('inv')
            .select('SUM(inv.totalAmount + inv.gstAmount)', 'total')
            .where('inv.isDeleted = false AND inv.status = :status', { status: enums_js_1.InvoiceStatus.PAID })
            .getRawOne();
        const totalCost = await this.billRepo
            .createQueryBuilder('bill')
            .select('SUM(bill.amount)', 'total')
            .where('bill.isDeleted = false')
            .getRawOne();
        return {
            totalRevenue: Number(totalRevenue?.total || 0),
            totalCost: Number(totalCost?.total || 0),
        };
    }
};
exports.AccountsService = AccountsService;
exports.AccountsService = AccountsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(sales_invoice_entity_js_1.SalesInvoice)),
    __param(1, (0, typeorm_1.InjectRepository)(invoice_item_entity_js_1.InvoiceItem)),
    __param(2, (0, typeorm_1.InjectRepository)(purchase_bill_entity_js_1.PurchaseBill)),
    __param(3, (0, typeorm_1.InjectRepository)(boq_item_entity_js_1.BoqItem)),
    __param(4, (0, typeorm_1.InjectRepository)(advance_entity_js_1.Advance)),
    __param(5, (0, typeorm_1.InjectRepository)(project_entity_js_1.Project)),
    __param(6, (0, typeorm_1.InjectRepository)(purchase_order_entity_js_1.PurchaseOrder)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AccountsService);
//# sourceMappingURL=accounts.service.js.map