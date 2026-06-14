"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const accounts_controller_js_1 = require("./accounts.controller.js");
const invoices_controller_js_1 = require("./invoices.controller.js");
const bills_controller_js_1 = require("./bills.controller.js");
const other_controller_js_1 = require("./other.controller.js");
const accounts_service_js_1 = require("./accounts.service.js");
const sales_invoice_entity_js_1 = require("./entities/sales-invoice.entity.js");
const invoice_item_entity_js_1 = require("./entities/invoice-item.entity.js");
const purchase_bill_entity_js_1 = require("./entities/purchase-bill.entity.js");
const boq_item_entity_js_1 = require("./entities/boq-item.entity.js");
const advance_entity_js_1 = require("./entities/advance.entity.js");
const project_entity_js_1 = require("../projects/entities/project.entity.js");
const purchase_order_entity_js_1 = require("../purchase-orders/entities/purchase-order.entity.js");
let AccountsModule = class AccountsModule {
};
exports.AccountsModule = AccountsModule;
exports.AccountsModule = AccountsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                sales_invoice_entity_js_1.SalesInvoice,
                invoice_item_entity_js_1.InvoiceItem,
                purchase_bill_entity_js_1.PurchaseBill,
                boq_item_entity_js_1.BoqItem,
                advance_entity_js_1.Advance,
                project_entity_js_1.Project,
                purchase_order_entity_js_1.PurchaseOrder,
            ]),
        ],
        controllers: [
            accounts_controller_js_1.AccountsController,
            invoices_controller_js_1.InvoicesController,
            bills_controller_js_1.BillsController,
            other_controller_js_1.OtherAccountsController,
        ],
        providers: [accounts_service_js_1.AccountsService],
        exports: [accounts_service_js_1.AccountsService],
    })
], AccountsModule);
//# sourceMappingURL=accounts.module.js.map