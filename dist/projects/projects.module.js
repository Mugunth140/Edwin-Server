"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const projects_controller_js_1 = require("./projects.controller.js");
const projects_service_js_1 = require("./projects.service.js");
const project_entity_js_1 = require("./entities/project.entity.js");
const project_progress_entity_js_1 = require("./entities/project-progress.entity.js");
const project_milestone_entity_js_1 = require("./entities/project-milestone.entity.js");
const change_order_entity_js_1 = require("./entities/change-order.entity.js");
const attendance_log_entity_js_1 = require("./entities/attendance-log.entity.js");
const machinery_log_entity_js_1 = require("./entities/machinery-log.entity.js");
const snag_item_entity_js_1 = require("./entities/snag-item.entity.js");
const safety_incident_entity_js_1 = require("./entities/safety-incident.entity.js");
const rfi_entity_js_1 = require("./entities/rfi.entity.js");
const site_photo_entity_js_1 = require("./entities/site-photo.entity.js");
let ProjectsModule = class ProjectsModule {
};
exports.ProjectsModule = ProjectsModule;
exports.ProjectsModule = ProjectsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                project_entity_js_1.Project,
                project_progress_entity_js_1.ProjectProgress,
                project_milestone_entity_js_1.ProjectMilestone,
                change_order_entity_js_1.ChangeOrder,
                attendance_log_entity_js_1.AttendanceLog,
                machinery_log_entity_js_1.MachineryLog,
                snag_item_entity_js_1.SnagItem,
                safety_incident_entity_js_1.SafetyIncident,
                rfi_entity_js_1.Rfi,
                site_photo_entity_js_1.SitePhoto,
            ]),
        ],
        controllers: [projects_controller_js_1.ProjectsController],
        providers: [projects_service_js_1.ProjectsService],
        exports: [projects_service_js_1.ProjectsService],
    })
], ProjectsModule);
//# sourceMappingURL=projects.module.js.map