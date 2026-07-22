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
exports.WorkOrder = void 0;
const typeorm_1 = require("typeorm");
const enums_js_1 = require("../../common/enums.js");
const vendor_entity_js_1 = require("../../vendors/entities/vendor.entity.js");
const project_entity_js_1 = require("../../projects/entities/project.entity.js");
const work_order_item_entity_js_1 = require("./work-order-item.entity.js");
let WorkOrder = class WorkOrder {
    id;
    woNumber;
    vendor;
    vendorId;
    project;
    projectId;
    status;
    terms;
    totalAmount;
    cgstAmount;
    sgstAmount;
    igstAmount;
    gstAmount;
    items;
    isDeleted;
    createdBy;
    updatedBy;
    createdAt;
    updatedAt;
};
exports.WorkOrder = WorkOrder;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], WorkOrder.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], WorkOrder.prototype, "woNumber", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => vendor_entity_js_1.Vendor, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'vendorId' }),
    __metadata("design:type", vendor_entity_js_1.Vendor)
], WorkOrder.prototype, "vendor", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], WorkOrder.prototype, "vendorId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => project_entity_js_1.Project, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: 'projectId' }),
    __metadata("design:type", project_entity_js_1.Project)
], WorkOrder.prototype, "project", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], WorkOrder.prototype, "projectId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enums_js_1.WorkOrderStatus,
        default: enums_js_1.WorkOrderStatus.DRAFT,
    }),
    __metadata("design:type", String)
], WorkOrder.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], WorkOrder.prototype, "terms", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], WorkOrder.prototype, "totalAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], WorkOrder.prototype, "cgstAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], WorkOrder.prototype, "sgstAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], WorkOrder.prototype, "igstAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], WorkOrder.prototype, "gstAmount", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => work_order_item_entity_js_1.WorkOrderItem, (item) => item.workOrder, {
        cascade: true,
        eager: true,
    }),
    __metadata("design:type", Array)
], WorkOrder.prototype, "items", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], WorkOrder.prototype, "isDeleted", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], WorkOrder.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], WorkOrder.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], WorkOrder.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], WorkOrder.prototype, "updatedAt", void 0);
exports.WorkOrder = WorkOrder = __decorate([
    (0, typeorm_1.Entity)('work_orders')
], WorkOrder);
//# sourceMappingURL=work-order.entity.js.map