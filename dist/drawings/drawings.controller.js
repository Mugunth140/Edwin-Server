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
exports.DrawingsController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const roles_guard_js_1 = require("../auth/roles.guard.js");
const roles_decorator_js_1 = require("../auth/roles.decorator.js");
const enums_js_1 = require("../common/enums.js");
const drawings_service_js_1 = require("./drawings.service.js");
let DrawingsController = class DrawingsController {
    drawingsService;
    constructor(drawingsService) {
        this.drawingsService = drawingsService;
    }
    async create(file, body, req) {
        const fileUrl = file ? `/uploads/drawings/${file.originalname}` : '';
        const fileKey = file ? `drawings/${Date.now()}-${file.originalname}` : '';
        return this.drawingsService.create({
            projectId: body.projectId,
            title: body.title,
            category: body.category,
            revision: body.revision || 'Rev A',
            fileUrl,
            fileKey,
            uploadedBy: req.user.id,
        });
    }
    findAll(projectId, category, revision) {
        return this.drawingsService.findAll({ projectId, category, revision });
    }
    findOne(id) {
        return this.drawingsService.findOne(id);
    }
    softDelete(id) {
        return this.drawingsService.softDelete(id);
    }
};
exports.DrawingsController = DrawingsController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_js_1.Roles)(enums_js_1.Role.ADMIN, enums_js_1.Role.SITE_ENGINEER),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiOperation)({ summary: 'Upload a drawing' }),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], DrawingsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'List drawings' }),
    (0, swagger_1.ApiQuery)({ name: 'projectId', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'category', required: false, enum: enums_js_1.DrawingCategory }),
    (0, swagger_1.ApiQuery)({ name: 'revision', required: false }),
    __param(0, (0, common_1.Query)('projectId')),
    __param(1, (0, common_1.Query)('category')),
    __param(2, (0, common_1.Query)('revision')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], DrawingsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get drawing metadata + download URL' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DrawingsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_js_1.Roles)(enums_js_1.Role.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Soft delete drawing (admin only)' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DrawingsController.prototype, "softDelete", null);
exports.DrawingsController = DrawingsController = __decorate([
    (0, swagger_1.ApiTags)('Drawings'),
    (0, common_1.Controller)('drawings'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_js_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [drawings_service_js_1.DrawingsService])
], DrawingsController);
//# sourceMappingURL=drawings.controller.js.map