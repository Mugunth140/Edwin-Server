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
exports.AccountsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const roles_guard_js_1 = require("../auth/roles.guard.js");
const roles_decorator_js_1 = require("../auth/roles.decorator.js");
const enums_js_1 = require("../common/enums.js");
const accounts_service_js_1 = require("./accounts.service.js");
const accounts_dto_js_1 = require("./dto/accounts.dto.js");
let AccountsController = class AccountsController {
    accountsService;
    constructor(accountsService) {
        this.accountsService = accountsService;
    }
    getLedger() { return this.accountsService.getLedger(); }
    getPayables() { return this.accountsService.getPayables(); }
    getReceivables() { return this.accountsService.getReceivables(); }
    getBalance() { return this.accountsService.getBalance(); }
    createInvoice(dto, req) {
        return this.accountsService.createInvoice(dto, req.user.id);
    }
    findInvoices(status, customerId, projectId) {
        return this.accountsService.findInvoices({ status, customerId, projectId });
    }
    updateInvoiceStatus(id, status) {
        return this.accountsService.updateInvoiceStatus(id, status);
    }
    createBill(dto, req) {
        return this.accountsService.createBill(dto, req.user.id);
    }
    findBills() { return this.accountsService.findBills(); }
    createBoq(dto) { return this.accountsService.createBoq(dto); }
    findBoq(projectId) { return this.accountsService.findBoq(projectId); }
    createAdvance(dto, req) {
        return this.accountsService.createAdvance(dto, req.user.id);
    }
    findAdvances() { return this.accountsService.findAdvances(); }
};
exports.AccountsController = AccountsController;
__decorate([
    (0, common_1.Get)('accounts/ledger'),
    (0, roles_decorator_js_1.Roles)(enums_js_1.Role.ADMIN, enums_js_1.Role.ACCOUNTS_MANAGER),
    (0, swagger_1.ApiOperation)({ summary: 'Derived transaction log' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AccountsController.prototype, "getLedger", null);
__decorate([
    (0, common_1.Get)('accounts/payables'),
    (0, roles_decorator_js_1.Roles)(enums_js_1.Role.ADMIN, enums_js_1.Role.ACCOUNTS_MANAGER),
    (0, swagger_1.ApiOperation)({ summary: 'Outstanding payables' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AccountsController.prototype, "getPayables", null);
__decorate([
    (0, common_1.Get)('accounts/receivables'),
    (0, roles_decorator_js_1.Roles)(enums_js_1.Role.ADMIN, enums_js_1.Role.ACCOUNTS_MANAGER),
    (0, swagger_1.ApiOperation)({ summary: 'Outstanding receivables' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AccountsController.prototype, "getReceivables", null);
__decorate([
    (0, common_1.Get)('accounts/balance'),
    (0, roles_decorator_js_1.Roles)(enums_js_1.Role.ADMIN, enums_js_1.Role.ACCOUNTS_MANAGER),
    (0, swagger_1.ApiOperation)({ summary: 'Revenue vs cost summary' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AccountsController.prototype, "getBalance", null);
__decorate([
    (0, common_1.Post)('invoices'),
    (0, roles_decorator_js_1.Roles)(enums_js_1.Role.ADMIN, enums_js_1.Role.ACCOUNTS_MANAGER),
    (0, swagger_1.ApiOperation)({ summary: 'Create sales invoice' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [accounts_dto_js_1.CreateInvoiceDto, Object]),
    __metadata("design:returntype", void 0)
], AccountsController.prototype, "createInvoice", null);
__decorate([
    (0, common_1.Get)('invoices'),
    (0, roles_decorator_js_1.Roles)(enums_js_1.Role.ADMIN, enums_js_1.Role.ACCOUNTS_MANAGER),
    (0, swagger_1.ApiOperation)({ summary: 'List invoices' }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false, enum: enums_js_1.InvoiceStatus }),
    (0, swagger_1.ApiQuery)({ name: 'customerId', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'projectId', required: false }),
    __param(0, (0, common_1.Query)('status')),
    __param(1, (0, common_1.Query)('customerId')),
    __param(2, (0, common_1.Query)('projectId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], AccountsController.prototype, "findInvoices", null);
__decorate([
    (0, common_1.Patch)('invoices/:id/status'),
    (0, roles_decorator_js_1.Roles)(enums_js_1.Role.ADMIN, enums_js_1.Role.ACCOUNTS_MANAGER),
    (0, swagger_1.ApiOperation)({ summary: 'Update invoice status' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], AccountsController.prototype, "updateInvoiceStatus", null);
__decorate([
    (0, common_1.Post)('bills'),
    (0, roles_decorator_js_1.Roles)(enums_js_1.Role.ADMIN, enums_js_1.Role.ACCOUNTS_MANAGER),
    (0, swagger_1.ApiOperation)({ summary: 'Create purchase bill' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [accounts_dto_js_1.CreateBillDto, Object]),
    __metadata("design:returntype", void 0)
], AccountsController.prototype, "createBill", null);
__decorate([
    (0, common_1.Get)('bills'),
    (0, roles_decorator_js_1.Roles)(enums_js_1.Role.ADMIN, enums_js_1.Role.ACCOUNTS_MANAGER),
    (0, swagger_1.ApiOperation)({ summary: 'List bills' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AccountsController.prototype, "findBills", null);
__decorate([
    (0, common_1.Post)('boq'),
    (0, roles_decorator_js_1.Roles)(enums_js_1.Role.ADMIN, enums_js_1.Role.ACCOUNTS_MANAGER),
    (0, swagger_1.ApiOperation)({ summary: 'Add BOQ item' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [accounts_dto_js_1.CreateBoqDto]),
    __metadata("design:returntype", void 0)
], AccountsController.prototype, "createBoq", null);
__decorate([
    (0, common_1.Get)('boq/:projectId'),
    (0, swagger_1.ApiOperation)({ summary: 'BOQ items for project' }),
    __param(0, (0, common_1.Param)('projectId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AccountsController.prototype, "findBoq", null);
__decorate([
    (0, common_1.Post)('advances'),
    (0, roles_decorator_js_1.Roles)(enums_js_1.Role.ADMIN, enums_js_1.Role.ACCOUNTS_MANAGER),
    (0, swagger_1.ApiOperation)({ summary: 'Create advance payment' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [accounts_dto_js_1.CreateAdvanceDto, Object]),
    __metadata("design:returntype", void 0)
], AccountsController.prototype, "createAdvance", null);
__decorate([
    (0, common_1.Get)('advances'),
    (0, roles_decorator_js_1.Roles)(enums_js_1.Role.ADMIN, enums_js_1.Role.ACCOUNTS_MANAGER),
    (0, swagger_1.ApiOperation)({ summary: 'List advances' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AccountsController.prototype, "findAdvances", null);
exports.AccountsController = AccountsController = __decorate([
    (0, swagger_1.ApiTags)('Accounts'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_js_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [accounts_service_js_1.AccountsService])
], AccountsController);
//# sourceMappingURL=accounts.controller.js.map