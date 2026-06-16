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
exports.DashboardController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const roles_guard_js_1 = require("../auth/roles.guard.js");
const roles_decorator_js_1 = require("../auth/roles.decorator.js");
const enums_js_1 = require("../common/enums.js");
const dashboard_service_js_1 = require("./dashboard.service.js");
let DashboardController = class DashboardController {
    dashboardService;
    constructor(dashboardService) {
        this.dashboardService = dashboardService;
    }
    getMaster() {
        return this.dashboardService.getMasterDashboard();
    }
    getPurchase() {
        return this.dashboardService.getPurchaseDashboard();
    }
    getEngineer(req) {
        return this.dashboardService.getEngineerDashboard(req.user.id);
    }
};
exports.DashboardController = DashboardController;
__decorate([
    (0, common_1.Get)('master'),
    (0, roles_decorator_js_1.Roles)(enums_js_1.Role.ADMIN, enums_js_1.Role.ACCOUNTS_MANAGER),
    (0, swagger_1.ApiOperation)({ summary: 'Get master dashboard KPIs' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DashboardController.prototype, "getMaster", null);
__decorate([
    (0, common_1.Get)('purchase'),
    (0, roles_decorator_js_1.Roles)(enums_js_1.Role.PURCHASE_TEAM),
    (0, swagger_1.ApiOperation)({ summary: 'Get purchase team dashboard KPIs' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DashboardController.prototype, "getPurchase", null);
__decorate([
    (0, common_1.Get)('engineer'),
    (0, roles_decorator_js_1.Roles)(enums_js_1.Role.SITE_ENGINEER),
    (0, swagger_1.ApiOperation)({ summary: 'Get engineer dashboard KPIs' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DashboardController.prototype, "getEngineer", null);
exports.DashboardController = DashboardController = __decorate([
    (0, swagger_1.ApiTags)('Dashboard'),
    (0, common_1.Controller)({ path: 'dashboard', version: '1' }),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_js_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [dashboard_service_js_1.DashboardService])
], DashboardController);
//# sourceMappingURL=dashboard.controller.js.map