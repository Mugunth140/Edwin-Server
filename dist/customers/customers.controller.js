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
exports.CustomersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const roles_guard_js_1 = require("../auth/roles.guard.js");
const roles_decorator_js_1 = require("../auth/roles.decorator.js");
const enums_js_1 = require("../common/enums.js");
const customers_service_js_1 = require("./customers.service.js");
const create_customer_dto_js_1 = require("./dto/create-customer.dto.js");
let CustomersController = class CustomersController {
    customersService;
    constructor(customersService) {
        this.customersService = customersService;
    }
    create(dto) {
        return this.customersService.create(dto);
    }
    findAll() {
        return this.customersService.findAll();
    }
    update(id, dto) {
        return this.customersService.update(id, dto);
    }
    remove(id) {
        return this.customersService.softDelete(id);
    }
};
exports.CustomersController = CustomersController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_js_1.Roles)(enums_js_1.Role.ADMIN, enums_js_1.Role.ACCOUNTS_MANAGER),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new customer' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_customer_dto_js_1.CreateCustomerDto]),
    __metadata("design:returntype", void 0)
], CustomersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'List all customers' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CustomersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_js_1.Roles)(enums_js_1.Role.ADMIN, enums_js_1.Role.ACCOUNTS_MANAGER),
    (0, swagger_1.ApiOperation)({ summary: 'Update customer' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], CustomersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_js_1.Roles)(enums_js_1.Role.ADMIN, enums_js_1.Role.ACCOUNTS_MANAGER),
    (0, swagger_1.ApiOperation)({ summary: 'Delete customer' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CustomersController.prototype, "remove", null);
exports.CustomersController = CustomersController = __decorate([
    (0, swagger_1.ApiTags)('Customers'),
    (0, common_1.Controller)({ path: 'customers', version: '1' }),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_js_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [customers_service_js_1.CustomersService])
], CustomersController);
//# sourceMappingURL=customers.controller.js.map