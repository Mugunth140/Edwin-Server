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
exports.PurchaseOrder = void 0;
const typeorm_1 = require("typeorm");
const enums_js_1 = require("../../common/enums.js");
const vendor_entity_js_1 = require("../../vendors/entities/vendor.entity.js");
const project_entity_js_1 = require("../../projects/entities/project.entity.js");
const po_item_entity_js_1 = require("./po-item.entity.js");
let PurchaseOrder = class PurchaseOrder {
    id;
    poNumber;
    vendor;
    vendorId;
    project;
    projectId;
    paymentTerms;
    status;
    totalAmount;
    billFileUrl;
    billFileKey;
    items;
    isDeleted;
    createdBy;
    updatedBy;
    createdAt;
    updatedAt;
};
exports.PurchaseOrder = PurchaseOrder;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], PurchaseOrder.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], PurchaseOrder.prototype, "poNumber", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => vendor_entity_js_1.Vendor, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'vendorId' }),
    __metadata("design:type", vendor_entity_js_1.Vendor)
], PurchaseOrder.prototype, "vendor", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PurchaseOrder.prototype, "vendorId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => project_entity_js_1.Project),
    (0, typeorm_1.JoinColumn)({ name: 'projectId' }),
    __metadata("design:type", project_entity_js_1.Project)
], PurchaseOrder.prototype, "project", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PurchaseOrder.prototype, "projectId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], PurchaseOrder.prototype, "paymentTerms", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, default: enums_js_1.PurchaseOrderStatus.PENDING }),
    __metadata("design:type", String)
], PurchaseOrder.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], PurchaseOrder.prototype, "totalAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PurchaseOrder.prototype, "billFileUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PurchaseOrder.prototype, "billFileKey", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => po_item_entity_js_1.PoItem, (item) => item.purchaseOrder, {
        cascade: true,
        eager: true,
    }),
    __metadata("design:type", Array)
], PurchaseOrder.prototype, "items", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], PurchaseOrder.prototype, "isDeleted", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PurchaseOrder.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PurchaseOrder.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], PurchaseOrder.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], PurchaseOrder.prototype, "updatedAt", void 0);
exports.PurchaseOrder = PurchaseOrder = __decorate([
    (0, typeorm_1.Entity)('purchase_orders')
], PurchaseOrder);
//# sourceMappingURL=purchase-order.entity.js.map