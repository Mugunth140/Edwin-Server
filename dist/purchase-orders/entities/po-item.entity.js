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
exports.PoItem = void 0;
const typeorm_1 = require("typeorm");
const purchase_order_entity_js_1 = require("./purchase-order.entity.js");
let PoItem = class PoItem {
    id;
    purchaseOrder;
    purchaseOrderId;
    description;
    quantity;
    unit;
    rate;
    amount;
};
exports.PoItem = PoItem;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], PoItem.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => purchase_order_entity_js_1.PurchaseOrder, (po) => po.items, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'purchaseOrderId' }),
    __metadata("design:type", purchase_order_entity_js_1.PurchaseOrder)
], PoItem.prototype, "purchaseOrder", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PoItem.prototype, "purchaseOrderId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PoItem.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 12, scale: 3 }),
    __metadata("design:type", Number)
], PoItem.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'nos' }),
    __metadata("design:type", String)
], PoItem.prototype, "unit", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 12, scale: 2 }),
    __metadata("design:type", Number)
], PoItem.prototype, "rate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 12, scale: 2 }),
    __metadata("design:type", Number)
], PoItem.prototype, "amount", void 0);
exports.PoItem = PoItem = __decorate([
    (0, typeorm_1.Entity)('po_items')
], PoItem);
//# sourceMappingURL=po-item.entity.js.map