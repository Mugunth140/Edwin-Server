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
exports.Project = void 0;
const typeorm_1 = require("typeorm");
const enums_js_1 = require("../../common/enums.js");
const project_category_entity_js_1 = require("../../project-categories/entities/project-category.entity.js");
const user_entity_js_1 = require("../../users/entities/user.entity.js");
let Project = class Project {
    id;
    name;
    projectCode;
    description;
    location;
    email;
    phone1;
    phone2;
    clientName;
    status;
    projectCategoryId;
    projectCategory;
    projectNature;
    jobType;
    jobStatus;
    financialYear;
    dateOfCreation;
    resources;
    completionPct;
    estimatedBudget;
    startDate;
    endDate;
    isDeleted;
    createdBy;
    updatedBy;
    createdAt;
    updatedAt;
};
exports.Project = Project;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Project.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Project.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, nullable: true }),
    __metadata("design:type", String)
], Project.prototype, "projectCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Project.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Project.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Project.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Project.prototype, "phone1", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Project.prototype, "phone2", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Project.prototype, "clientName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enums_js_1.ProjectStatus,
        default: enums_js_1.ProjectStatus.PLANNING,
    }),
    __metadata("design:type", String)
], Project.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Project.prototype, "projectCategoryId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => project_category_entity_js_1.ProjectCategory, { eager: true, nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'projectCategoryId' }),
    __metadata("design:type", project_category_entity_js_1.ProjectCategory)
], Project.prototype, "projectCategory", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: enums_js_1.ProjectNature, nullable: true }),
    __metadata("design:type", String)
], Project.prototype, "projectNature", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: enums_js_1.JobType, nullable: true }),
    __metadata("design:type", String)
], Project.prototype, "jobType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: enums_js_1.JobStatus, default: enums_js_1.JobStatus.BIDDING }),
    __metadata("design:type", String)
], Project.prototype, "jobStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Project.prototype, "financialYear", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], Project.prototype, "dateOfCreation", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => user_entity_js_1.User),
    (0, typeorm_1.JoinTable)({ name: 'project_resources' }),
    __metadata("design:type", Array)
], Project.prototype, "resources", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Project.prototype, "completionPct", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 14, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Project.prototype, "estimatedBudget", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], Project.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], Project.prototype, "endDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Project.prototype, "isDeleted", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Project.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Project.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Project.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Project.prototype, "updatedAt", void 0);
exports.Project = Project = __decorate([
    (0, typeorm_1.Entity)('projects')
], Project);
//# sourceMappingURL=project.entity.js.map