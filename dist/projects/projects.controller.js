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
exports.ProjectsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const passport_1 = require("@nestjs/passport");
const roles_guard_js_1 = require("../auth/roles.guard.js");
const roles_decorator_js_1 = require("../auth/roles.decorator.js");
const enums_js_1 = require("../common/enums.js");
const projects_service_js_1 = require("./projects.service.js");
const create_project_dto_js_1 = require("./dto/create-project.dto.js");
const update_project_dto_js_1 = require("./dto/update-project.dto.js");
let ProjectsController = class ProjectsController {
    projectsService;
    constructor(projectsService) {
        this.projectsService = projectsService;
    }
    create(dto, req) {
        return this.projectsService.create(dto, req.user.id);
    }
    findAll() {
        return this.projectsService.findAll();
    }
    update(id, dto, req) {
        return this.projectsService.update(id, dto, req.user.id);
    }
    remove(id) {
        return this.projectsService.remove(id);
    }
    getDashboard(id) {
        return this.projectsService.getDashboard(id);
    }
    getDetails(id) {
        return this.projectsService.getProjectDetails(id);
    }
    addProgress(id, body) {
        return this.projectsService.addProgress(id, body);
    }
    addMilestone(id, body) {
        return this.projectsService.addMilestone(id, body);
    }
    updateMilestone(id, mid, body) {
        return this.projectsService.updateMilestone(id, mid, body);
    }
    addAttendance(id, body) {
        return this.projectsService.addAttendance(id, body);
    }
    addSnag(id, body) {
        return this.projectsService.addSnag(id, body);
    }
    updateSnag(id, snagId, body) {
        return this.projectsService.updateSnag(id, snagId, body);
    }
    addRfi(id, body) {
        return this.projectsService.addRfi(id, body);
    }
    updateRfi(id, rfiId, body) {
        return this.projectsService.updateRfi(id, rfiId, body);
    }
    addIncident(id, body) {
        return this.projectsService.addIncident(id, body);
    }
    addMachinery(id, body) {
        return this.projectsService.addMachinery(id, body);
    }
    addChangeOrder(id, body) {
        return this.projectsService.addChangeOrder(id, body);
    }
};
exports.ProjectsController = ProjectsController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_js_1.Roles)(enums_js_1.Role.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new project' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_project_dto_js_1.CreateProjectDto, Object]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'List all projects' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_js_1.Roles)(enums_js_1.Role.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Update a project' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_project_dto_js_1.UpdateProjectDto, Object]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_js_1.Roles)(enums_js_1.Role.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a project' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)(':id/dashboard'),
    (0, swagger_1.ApiOperation)({ summary: 'Get full project dashboard data' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "getDashboard", null);
__decorate([
    (0, common_1.Get)(':id/details'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get project financial details (expenses, SWOs, bills, invoices, payments)',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "getDetails", null);
__decorate([
    (0, common_1.Post)(':id/progress'),
    (0, roles_decorator_js_1.Roles)(enums_js_1.Role.ADMIN, enums_js_1.Role.SITE_ENGINEER),
    (0, swagger_1.ApiOperation)({ summary: 'Add weekly progress entry' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "addProgress", null);
__decorate([
    (0, common_1.Post)(':id/milestones'),
    (0, roles_decorator_js_1.Roles)(enums_js_1.Role.ADMIN, enums_js_1.Role.SITE_ENGINEER),
    (0, swagger_1.ApiOperation)({ summary: 'Add milestone' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "addMilestone", null);
__decorate([
    (0, common_1.Patch)(':id/milestones/:mid'),
    (0, roles_decorator_js_1.Roles)(enums_js_1.Role.ADMIN, enums_js_1.Role.SITE_ENGINEER),
    (0, swagger_1.ApiOperation)({ summary: 'Update milestone status' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('mid')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "updateMilestone", null);
__decorate([
    (0, common_1.Post)(':id/attendance'),
    (0, roles_decorator_js_1.Roles)(enums_js_1.Role.ADMIN, enums_js_1.Role.SITE_ENGINEER),
    (0, swagger_1.ApiOperation)({ summary: 'Log attendance' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "addAttendance", null);
__decorate([
    (0, common_1.Post)(':id/snag'),
    (0, roles_decorator_js_1.Roles)(enums_js_1.Role.ADMIN, enums_js_1.Role.SITE_ENGINEER),
    (0, swagger_1.ApiOperation)({ summary: 'Add snag item' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "addSnag", null);
__decorate([
    (0, common_1.Patch)(':id/snag/:snagId'),
    (0, roles_decorator_js_1.Roles)(enums_js_1.Role.ADMIN, enums_js_1.Role.SITE_ENGINEER),
    (0, swagger_1.ApiOperation)({ summary: 'Update snag status' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('snagId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "updateSnag", null);
__decorate([
    (0, common_1.Post)(':id/rfi'),
    (0, roles_decorator_js_1.Roles)(enums_js_1.Role.ADMIN, enums_js_1.Role.SITE_ENGINEER),
    (0, swagger_1.ApiOperation)({ summary: 'Raise RFI' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "addRfi", null);
__decorate([
    (0, common_1.Patch)(':id/rfi/:rfiId'),
    (0, roles_decorator_js_1.Roles)(enums_js_1.Role.ADMIN, enums_js_1.Role.SITE_ENGINEER),
    (0, swagger_1.ApiOperation)({ summary: 'Update RFI status' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('rfiId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "updateRfi", null);
__decorate([
    (0, common_1.Post)(':id/incidents'),
    (0, roles_decorator_js_1.Roles)(enums_js_1.Role.ADMIN, enums_js_1.Role.SITE_ENGINEER),
    (0, swagger_1.ApiOperation)({ summary: 'Record safety incident' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "addIncident", null);
__decorate([
    (0, common_1.Post)(':id/machinery'),
    (0, roles_decorator_js_1.Roles)(enums_js_1.Role.ADMIN, enums_js_1.Role.SITE_ENGINEER),
    (0, swagger_1.ApiOperation)({ summary: 'Log machinery usage' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "addMachinery", null);
__decorate([
    (0, common_1.Post)(':id/change-orders'),
    (0, roles_decorator_js_1.Roles)(enums_js_1.Role.ADMIN),
    (0, swagger_1.ApiOperation)({ summary: 'Add change order' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ProjectsController.prototype, "addChangeOrder", null);
exports.ProjectsController = ProjectsController = __decorate([
    (0, swagger_1.ApiTags)('Projects'),
    (0, common_1.Controller)({ path: 'projects', version: '1' }),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_js_1.RolesGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [projects_service_js_1.ProjectsService])
], ProjectsController);
//# sourceMappingURL=projects.controller.js.map