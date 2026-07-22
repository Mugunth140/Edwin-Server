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
exports.ProjectMilestone = void 0;
const typeorm_1 = require("typeorm");
const enums_js_1 = require("../../common/enums.js");
const project_entity_js_1 = require("./project.entity.js");
let ProjectMilestone = class ProjectMilestone {
    id;
    project;
    projectId;
    title;
    plannedDate;
    actualDate;
    status;
    createdAt;
    updatedAt;
};
exports.ProjectMilestone = ProjectMilestone;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ProjectMilestone.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => project_entity_js_1.Project),
    (0, typeorm_1.JoinColumn)({ name: 'projectId' }),
    __metadata("design:type", project_entity_js_1.Project)
], ProjectMilestone.prototype, "project", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProjectMilestone.prototype, "projectId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProjectMilestone.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], ProjectMilestone.prototype, "plannedDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], ProjectMilestone.prototype, "actualDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enums_js_1.MilestoneStatus,
        default: enums_js_1.MilestoneStatus.PENDING,
    }),
    __metadata("design:type", String)
], ProjectMilestone.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ProjectMilestone.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ProjectMilestone.prototype, "updatedAt", void 0);
exports.ProjectMilestone = ProjectMilestone = __decorate([
    (0, typeorm_1.Entity)('project_milestones')
], ProjectMilestone);
//# sourceMappingURL=project-milestone.entity.js.map