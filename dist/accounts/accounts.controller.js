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
exports.AccountsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const roles_guard_js_1 = require("../auth/roles.guard.js");
const roles_decorator_js_1 = require("../auth/roles.decorator.js");
const enums_js_1 = require("../common/enums.js");
const accounts_service_js_1 = require("./accounts.service.js");
let AccountsController = class AccountsController {
    accountsService;
    constructor(accountsService) {
        this.accountsService = accountsService;
    }
    getLedger() {
        return this.accountsService.getLedger();
    }
    getPayables() {
        return this.accountsService.getPayables();
    }
    getReceivables() {
        return this.accountsService.getReceivables();
    }
    getBalance() {
        return this.accountsService.getBalance();
    }
};
exports.AccountsController = AccountsController;
__decorate([
    (0, common_1.Get)('ledger'),
    (0, roles_decorator_js_1.Roles)(enums_js_1.Role.ADMIN, enums_js_1.Role.ACCOUNTS_MANAGER),
    (0, swagger_1.ApiOperation)({ summary: 'Derived transaction log' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AccountsController.prototype, "getLedger", null);
__decorate([
    (0, common_1.Get)('payables'),
    (0, roles_decorator_js_1.Roles)(enums_js_1.Role.ADMIN, enums_js_1.Role.ACCOUNTS_MANAGER),
    (0, swagger_1.ApiOperation)({ summary: 'Outstanding payables' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AccountsController.prototype, "getPayables", null);
__decorate([
    (0, common_1.Get)('receivables'),
    (0, roles_decorator_js_1.Roles)(enums_js_1.Role.ADMIN, enums_js_1.Role.ACCOUNTS_MANAGER),
    (0, swagger_1.ApiOperation)({ summary: 'Outstanding receivables' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AccountsController.prototype, "getReceivables", null);
__decorate([
    (0, common_1.Get)('balance'),
    (0, roles_decorator_js_1.Roles)(enums_js_1.Role.ADMIN, enums_js_1.Role.ACCOUNTS_MANAGER),
    (0, swagger_1.ApiOperation)({ summary: 'Revenue vs cost summary' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AccountsController.prototype, "getBalance", null);
exports.AccountsController = AccountsController = __decorate([
    (0, swagger_1.ApiTags)('Accounts'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_js_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)({ path: 'accounts', version: '1' }),
    __metadata("design:paramtypes", [accounts_service_js_1.AccountsService])
], AccountsController);
//# sourceMappingURL=accounts.controller.js.map