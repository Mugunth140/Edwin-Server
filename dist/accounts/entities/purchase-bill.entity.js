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
exports.PurchaseBill = void 0;
const typeorm_1 = require("typeorm");
const enums_js_1 = require("../../common/enums.js");
const vendor_entity_js_1 = require("../../vendors/entities/vendor.entity.js");
const purchase_order_entity_js_1 = require("../../purchase-orders/entities/purchase-order.entity.js");
const project_entity_js_1 = require("../../projects/entities/project.entity.js");
const payment_entity_js_1 = require("../../payments/entities/payment.entity.js");
let PurchaseBill = class PurchaseBill {
    id;
    billNumber;
    vendor;
    vendorId;
    purchaseOrder;
    purchaseOrderId;
    project;
    projectId;
    amount;
    status;
    paidAmount;
    billDate;
    dueDate;
    billFileUrl;
    billFileKey;
    paidAt;
    payments;
    isDeleted;
    createdBy;
    createdAt;
};
exports.PurchaseBill = PurchaseBill;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], PurchaseBill.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], PurchaseBill.prototype, "billNumber", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => vendor_entity_js_1.Vendor, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'vendorId' }),
    __metadata("design:type", vendor_entity_js_1.Vendor)
], PurchaseBill.prototype, "vendor", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PurchaseBill.prototype, "vendorId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => purchase_order_entity_js_1.PurchaseOrder, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'purchaseOrderId' }),
    __metadata("design:type", purchase_order_entity_js_1.PurchaseOrder)
], PurchaseBill.prototype, "purchaseOrder", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PurchaseBill.prototype, "purchaseOrderId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => project_entity_js_1.Project),
    (0, typeorm_1.JoinColumn)({ name: 'projectId' }),
    __metadata("design:type", project_entity_js_1.Project)
], PurchaseBill.prototype, "project", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PurchaseBill.prototype, "projectId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], PurchaseBill.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, default: enums_js_1.BillStatus.PENDING }),
    __metadata("design:type", String)
], PurchaseBill.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], PurchaseBill.prototype, "paidAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], PurchaseBill.prototype, "billDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], PurchaseBill.prototype, "dueDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], PurchaseBill.prototype, "billFileUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], PurchaseBill.prototype, "billFileKey", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], PurchaseBill.prototype, "paidAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => payment_entity_js_1.Payment, (payment) => payment.purchaseBill),
    __metadata("design:type", Array)
], PurchaseBill.prototype, "payments", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], PurchaseBill.prototype, "isDeleted", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PurchaseBill.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], PurchaseBill.prototype, "createdAt", void 0);
exports.PurchaseBill = PurchaseBill = __decorate([
    (0, typeorm_1.Entity)('purchase_bills')
], PurchaseBill);
//# sourceMappingURL=purchase-bill.entity.js.map