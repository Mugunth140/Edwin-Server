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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payment = void 0;
const typeorm_1 = require("typeorm");
const enums_js_1 = require("../../common/enums.js");
const project_entity_js_1 = require("../../projects/entities/project.entity.js");
const purchase_bill_entity_js_1 = require("../../accounts/entities/purchase-bill.entity.js");
const vendor_entity_js_1 = require("../../vendors/entities/vendor.entity.js");
const expense_entity_js_1 = require("../../expenses/entities/expense.entity.js");
const sales_invoice_entity_js_1 = require("../../accounts/entities/sales-invoice.entity.js");
let Payment = class Payment {
    id;
    paymentType;
    purchaseBill;
    purchaseBillId;
    salesInvoice;
    salesInvoiceId;
    expense;
    expenseId;
    vendor;
    vendorId;
    payeeName;
    amount;
    paymentDate;
    paymentMode;
    referenceNumber;
    project;
    projectId;
    notes;
    isDeleted;
    createdBy;
    timesheetId;
    createdAt;
};
exports.Payment = Payment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Payment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: enums_js_1.PaymentType, default: enums_js_1.PaymentType.MATERIAL }),
    __metadata("design:type", String)
], Payment.prototype, "paymentType", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => purchase_bill_entity_js_1.PurchaseBill, (bill) => bill.payments, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'purchaseBillId' }),
    __metadata("design:type", purchase_bill_entity_js_1.PurchaseBill)
], Payment.prototype, "purchaseBill", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Payment.prototype, "purchaseBillId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => sales_invoice_entity_js_1.SalesInvoice, (invoice) => invoice.payments, {
        nullable: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'salesInvoiceId' }),
    __metadata("design:type", sales_invoice_entity_js_1.SalesInvoice)
], Payment.prototype, "salesInvoice", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Payment.prototype, "salesInvoiceId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => expense_entity_js_1.Expense, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'expenseId' }),
    __metadata("design:type", expense_entity_js_1.Expense)
], Payment.prototype, "expense", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Payment.prototype, "expenseId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => vendor_entity_js_1.Vendor, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'vendorId' }),
    __metadata("design:type", vendor_entity_js_1.Vendor)
], Payment.prototype, "vendor", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Payment.prototype, "vendorId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Payment.prototype, "payeeName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 12, scale: 2 }),
    __metadata("design:type", Number)
], Payment.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], Payment.prototype, "paymentDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, default: enums_js_1.PaymentMode.CASH }),
    __metadata("design:type", String)
], Payment.prototype, "paymentMode", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Payment.prototype, "referenceNumber", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => project_entity_js_1.Project, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'projectId' }),
    __metadata("design:type", project_entity_js_1.Project)
], Payment.prototype, "project", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Payment.prototype, "projectId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Payment.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Payment.prototype, "isDeleted", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Payment.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Payment.prototype, "timesheetId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Payment.prototype, "createdAt", void 0);
exports.Payment = Payment = __decorate([
    (0, typeorm_1.Entity)('payments')
], Payment);
//# sourceMappingURL=payment.entity.js.map