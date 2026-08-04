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
const po_item_entity_js_1 = require("../purchase-orders/entities/po-item.entity.js");
const bill_item_entity_js_1 = require("./entities/bill-item.entity.js");
const enums_js_1 = require("../common/enums.js");
const notifications_service_js_1 = require("../notifications/notifications.service.js");
let AccountsService = class AccountsService {
    invoiceRepo;
    invoiceItemRepo;
    billRepo;
    boqRepo;
    advanceRepo;
    projectRepo;
    poRepo;
    poItemRepo;
    billItemRepo;
    notifications;
    constructor(invoiceRepo, invoiceItemRepo, billRepo, boqRepo, advanceRepo, projectRepo, poRepo, poItemRepo, billItemRepo, notifications) {
        this.invoiceRepo = invoiceRepo;
        this.invoiceItemRepo = invoiceItemRepo;
        this.billRepo = billRepo;
        this.boqRepo = boqRepo;
        this.advanceRepo = advanceRepo;
        this.projectRepo = projectRepo;
        this.poRepo = poRepo;
        this.poItemRepo = poItemRepo;
        this.billItemRepo = billItemRepo;
        this.notifications = notifications;
    }
    async convertPoToBill(poId, userId) {
        const po = await this.poRepo.findOne({
            where: { id: poId },
            relations: ['vendor'],
        });
        if (!po)
            throw new common_1.NotFoundException('Purchase Order not found');
        const billNumber = await this.generateBillNumber();
        const bill = this.billRepo.create({
            vendorId: po.vendorId,
            projectId: po.projectId,
            amount: po.totalWithGst || po.totalAmount,
            gstPercent: po.gstPercent,
            gstAmount: po.gstAmount,
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
        const project = await this.projectRepo.findOne({
            where: { id: dto.projectId },
        });
        if (!project)
            throw new common_1.NotFoundException('Project not found');
        const invoiceNumber = await this.generateInvoiceNumber();
        const items = dto.items.map((item) => {
            const amount = item.quantity * item.rate;
            return this.invoiceItemRepo.create({
                ...item,
                unit: item.unit || 'nos',
                amount,
            });
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
            invoiceNumber,
            projectId: dto.projectId,
            dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
            totalAmount,
            gstAmount,
            cgstAmount,
            sgstAmount,
            igstAmount,
            items,
            createdBy: userId,
        });
        return this.invoiceRepo.save(invoice);
    }
    async findInvoices(query) {
        const qb = this.invoiceRepo
            .createQueryBuilder('inv')
            .leftJoinAndSelect('inv.project', 'project')
            .leftJoinAndSelect('inv.items', 'items')
            .leftJoinAndSelect('inv.payments', 'payments')
            .where('inv.isDeleted = false');
        if (query.status)
            qb.andWhere('inv.status = :status', { status: query.status });
        if (query.projectId)
            qb.andWhere('inv.projectId = :projectId', { projectId: query.projectId });
        return qb.orderBy('inv.createdAt', 'DESC').getMany();
    }
    async findInvoice(id) {
        const invoice = await this.invoiceRepo
            .createQueryBuilder('inv')
            .leftJoinAndSelect('inv.project', 'project')
            .leftJoinAndSelect('inv.items', 'items')
            .leftJoinAndSelect('inv.payments', 'payments')
            .where('inv.id = :id', { id })
            .andWhere('inv.isDeleted = false')
            .getOne();
        if (!invoice)
            throw new common_1.NotFoundException('Invoice not found');
        return invoice;
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
    async createBill(dto, user) {
        const billNumber = await this.generateBillNumber();
        const { items, ...billData } = dto;
        const bill = this.billRepo.create({
            ...billData,
            billNumber,
            createdBy: user?.id,
        });
        const savedBill = await this.billRepo.save(bill);
        if (items && items.length > 0) {
            const billItems = [];
            for (const item of items) {
                const poItem = await this.poItemRepo.findOne({
                    where: { id: item.poItemId },
                });
                if (poItem) {
                    poItem.billedQuantity =
                        Number(poItem.billedQuantity || 0) + Number(item.quantity);
                    await this.poItemRepo.save(poItem);
                }
                billItems.push(this.billItemRepo.create({
                    billId: savedBill.id,
                    poItemId: item.poItemId,
                    description: item.description || '',
                    quantity: item.quantity,
                    unit: item.unit || 'nos',
                    rate: item.rate || 0,
                    orderedQty: item.orderedQty || 0,
                    billedQty: item.billedQty || 0,
                }));
            }
            await this.billItemRepo.save(billItems);
        }
        if (user?.role === enums_js_1.Role.PURCHASE_TEAM) {
            await this.notifications.createForRole(enums_js_1.Role.ACCOUNTS_MANAGER, {
                userId: user.id,
                type: 'bill_created',
                title: 'New Bill Created',
                message: `${savedBill.billNumber} was created`,
                link: '/dashboard/accounts/bills',
                entityId: savedBill.id,
            });
        }
        return this.findOneBill(savedBill.id);
    }
    async findOneBill(id) {
        const bill = await this.billRepo.findOne({
            where: { id },
            relations: [
                'vendor',
                'project',
                'payments',
                'purchaseOrder',
                'purchaseOrder.items',
                'billItems',
            ],
        });
        if (!bill)
            throw new common_1.NotFoundException('Bill not found');
        return bill;
    }
    async findBills() {
        return this.billRepo.find({
            where: { isDeleted: false },
            relations: [
                'vendor',
                'project',
                'payments',
                'purchaseOrder',
                'purchaseOrder.items',
                'billItems',
            ],
            order: { createdAt: 'DESC' },
        });
    }
    async updateBill(id, dto, userId) {
        const bill = await this.findOneBill(id);
        const { items, ...billData } = dto;
        Object.assign(bill, { ...billData, updatedBy: userId ?? '' });
        const savedBill = await this.billRepo.save(bill);
        if (items && items.length > 0) {
            await this.billItemRepo.delete({ billId: id });
            const billItems = items.map((item) => this.billItemRepo.create({
                billId: id,
                poItemId: item.poItemId,
                description: item.description || '',
                quantity: item.quantity,
                unit: item.unit || 'nos',
                rate: item.rate || 0,
                orderedQty: item.orderedQty || 0,
                billedQty: item.billedQty || 0,
            }));
            await this.billItemRepo.save(billItems);
        }
        return this.findOneBill(id);
    }
    async removeBill(id) {
        const bill = await this.billRepo.findOne({ where: { id } });
        if (!bill)
            throw new common_1.NotFoundException('Bill not found');
        bill.isDeleted = true;
        await this.billRepo.save(bill);
    }
    async updateBillStatus(id, status) {
        const bill = await this.billRepo.findOne({ where: { id } });
        if (!bill)
            throw new common_1.NotFoundException('Bill not found');
        bill.status = status;
        if (status === enums_js_1.BillStatus.APPROVED)
            bill.paidAt = new Date();
        return this.billRepo.save(bill);
    }
    async createBoq(dto) {
        const boq = this.boqRepo.create({
            ...dto,
            estimatedAmount: (dto.estimatedQty || 0) * (dto.estimatedRate || 0),
        });
        return this.boqRepo.save(boq);
    }
    async findBoq(projectId) {
        return this.boqRepo.find({
            where: { projectId },
            order: { createdAt: 'ASC' },
        });
    }
    async createAdvance(dto, userId) {
        const advance = this.advanceRepo.create({ ...dto, createdBy: userId });
        return this.advanceRepo.save(advance);
    }
    async findAdvances() {
        return this.advanceRepo.find({ order: { date: 'DESC' } });
    }
    async getLedger() {
        const invoices = await this.invoiceRepo.find({
            where: { isDeleted: false },
            relations: ['project'],
        });
        const bills = await this.billRepo.find({
            where: { isDeleted: false },
            relations: ['vendor'],
        });
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
                status: bill.status,
            })),
        ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        return ledger;
    }
    async getPayables() {
        return this.billRepo.find({
            where: { isDeleted: false, paidAt: undefined },
            relations: ['vendor'],
        });
    }
    async getReceivables() {
        return this.invoiceRepo.find({
            where: [
                { isDeleted: false, status: enums_js_1.InvoiceStatus.DRAFT },
                { isDeleted: false, status: enums_js_1.InvoiceStatus.SENT },
                { isDeleted: false, status: enums_js_1.InvoiceStatus.OVERDUE },
                { isDeleted: false, status: enums_js_1.InvoiceStatus.PARTIAL },
            ],
            relations: ['project'],
        });
    }
    async getBalance() {
        const totalRevenue = await this.invoiceRepo
            .createQueryBuilder('inv')
            .select('SUM(inv.totalAmount + inv.gstAmount)', 'total')
            .where('inv.isDeleted = false AND inv.status = :status', {
            status: enums_js_1.InvoiceStatus.PAID,
        })
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
    __param(7, (0, typeorm_1.InjectRepository)(po_item_entity_js_1.PoItem)),
    __param(8, (0, typeorm_1.InjectRepository)(bill_item_entity_js_1.BillItem)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        notifications_service_js_1.NotificationsService])
], AccountsService);
//# sourceMappingURL=accounts.service.js.map