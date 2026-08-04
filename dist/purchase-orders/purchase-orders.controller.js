"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseOrdersController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const multer_1 = require("multer");
const path_1 = require("path");
const fs = __importStar(require("fs"));
const passport_1 = require("@nestjs/passport");
const roles_guard_js_1 = require("../auth/roles.guard.js");
const roles_decorator_js_1 = require("../auth/roles.decorator.js");
const enums_js_1 = require("../common/enums.js");
const purchase_orders_service_js_1 = require("./purchase-orders.service.js");
const create_purchase_order_dto_js_1 = require("./dto/create-purchase-order.dto.js");
const update_purchase_order_status_dto_js_1 = require("./dto/update-purchase-order-status.dto.js");
let PurchaseOrdersController = class PurchaseOrdersController {
    poService;
    constructor(poService) {
        this.poService = poService;
    }
    create(dto, req) {
        return this.poService.create(dto, req.user.id);
    }
    findAll() {
        return this.poService.findAll();
    }
    findOne(id) {
        return this.poService.findOne(id);
    }
    updateStatus(id, dto, req) {
        return this.poService.updateStatus(id, dto.status, req.user);
    }
    update(id, dto, req) {
        return this.poService.update(id, dto, req.user.id);
    }
    async uploadFile(file) {
        if (!file)
            throw new Error('File is required');
        return {
            fileUrl: `/uploads/quotation-bill/${file.filename}`,
            fileKey: file.filename,
        };
    }
    remove(id) {
        return this.poService.remove(id);
    }
};
exports.PurchaseOrdersController = PurchaseOrdersController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_js_1.Roles)(enums_js_1.Role.ADMIN, enums_js_1.Role.ACCOUNTS_MANAGER, enums_js_1.Role.PURCHASE_TEAM),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new purchase order' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_purchase_order_dto_js_1.CreatePurchaseOrderDto, Object]),
    __metadata("design:returntype", void 0)
], PurchaseOrdersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_js_1.Roles)(enums_js_1.Role.ADMIN, enums_js_1.Role.ACCOUNTS_MANAGER, enums_js_1.Role.PURCHASE_TEAM, enums_js_1.Role.SITE_ENGINEER),
    (0, swagger_1.ApiOperation)({ summary: 'List purchase orders' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PurchaseOrdersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_js_1.Roles)(enums_js_1.Role.ADMIN, enums_js_1.Role.ACCOUNTS_MANAGER, enums_js_1.Role.PURCHASE_TEAM),
    (0, swagger_1.ApiOperation)({ summary: 'Get single purchase order' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PurchaseOrdersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    (0, roles_decorator_js_1.Roles)(enums_js_1.Role.ADMIN, enums_js_1.Role.ACCOUNTS_MANAGER, enums_js_1.Role.PURCHASE_TEAM),
    (0, swagger_1.ApiOperation)({ summary: 'Update purchase order status' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_purchase_order_status_dto_js_1.UpdatePurchaseOrderStatusDto, Object]),
    __metadata("design:returntype", void 0)
], PurchaseOrdersController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, roles_decorator_js_1.Roles)(enums_js_1.Role.ADMIN, enums_js_1.Role.ACCOUNTS_MANAGER, enums_js_1.Role.PURCHASE_TEAM),
    (0, swagger_1.ApiOperation)({ summary: 'Update purchase order' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], PurchaseOrdersController.prototype, "update", null);
__decorate([
    (0, common_1.Post)('upload'),
    (0, roles_decorator_js_1.Roles)(enums_js_1.Role.ADMIN, enums_js_1.Role.ACCOUNTS_MANAGER, enums_js_1.Role.PURCHASE_TEAM),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: (req, file, cb) => {
                const uploadPath = './uploads/quotation-bill';
                if (!fs.existsSync(uploadPath)) {
                    fs.mkdirSync(uploadPath, { recursive: true });
                }
                cb(null, uploadPath);
            },
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                cb(null, `${file.fieldname}-${uniqueSuffix}${(0, path_1.extname)(file.originalname)}`);
            },
        }),
    })),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiOperation)({ summary: 'Upload a quotation bill file' }),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PurchaseOrdersController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_js_1.Roles)(enums_js_1.Role.ADMIN, enums_js_1.Role.ACCOUNTS_MANAGER, enums_js_1.Role.PURCHASE_TEAM),
    (0, swagger_1.ApiOperation)({ summary: 'Delete purchase order' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PurchaseOrdersController.prototype, "remove", null);
exports.PurchaseOrdersController = PurchaseOrdersController = __decorate([
    (0, swagger_1.ApiTags)('Purchase Orders'),
    (0, common_1.Controller)({ path: 'purchase-orders', version: '1' }),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_js_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [purchase_orders_service_js_1.PurchaseOrdersService])
], PurchaseOrdersController);
//# sourceMappingURL=purchase-orders.controller.js.map