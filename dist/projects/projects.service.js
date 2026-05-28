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
exports.ProjectsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
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
let ProjectsService = class ProjectsService {
    projectsRepo;
    progressRepo;
    milestonesRepo;
    changeOrdersRepo;
    attendanceRepo;
    machineryRepo;
    snagsRepo;
    incidentsRepo;
    rfisRepo;
    photosRepo;
    constructor(projectsRepo, progressRepo, milestonesRepo, changeOrdersRepo, attendanceRepo, machineryRepo, snagsRepo, incidentsRepo, rfisRepo, photosRepo) {
        this.projectsRepo = projectsRepo;
        this.progressRepo = progressRepo;
        this.milestonesRepo = milestonesRepo;
        this.changeOrdersRepo = changeOrdersRepo;
        this.attendanceRepo = attendanceRepo;
        this.machineryRepo = machineryRepo;
        this.snagsRepo = snagsRepo;
        this.incidentsRepo = incidentsRepo;
        this.rfisRepo = rfisRepo;
        this.photosRepo = photosRepo;
    }
    async create(dto, userId) {
        const project = this.projectsRepo.create({ ...dto, createdBy: userId });
        return this.projectsRepo.save(project);
    }
    async findAll() {
        return this.projectsRepo.find({
            where: { isDeleted: false },
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id) {
        const project = await this.projectsRepo.findOne({ where: { id, isDeleted: false } });
        if (!project)
            throw new common_1.NotFoundException('Project not found');
        return project;
    }
    async update(id, dto, userId) {
        const project = await this.findOne(id);
        Object.assign(project, { ...dto, updatedBy: userId });
        return this.projectsRepo.save(project);
    }
    async remove(id) {
        const project = await this.findOne(id);
        project.isDeleted = true;
        await this.projectsRepo.save(project);
    }
    async getDashboard(id) {
        const project = await this.findOne(id);
        const [progress, milestones, changeOrders, attendance, machinery, snags, incidents, rfis, photos] = await Promise.all([
            this.progressRepo.find({ where: { projectId: id }, order: { weekStartDate: 'DESC' } }),
            this.milestonesRepo.find({ where: { projectId: id }, order: { plannedDate: 'ASC' } }),
            this.changeOrdersRepo.find({ where: { projectId: id }, order: { date: 'DESC' } }),
            this.attendanceRepo.find({ where: { projectId: id }, order: { logDate: 'DESC' }, take: 30 }),
            this.machineryRepo.find({ where: { projectId: id }, order: { logDate: 'DESC' }, take: 30 }),
            this.snagsRepo.find({ where: { projectId: id }, order: { createdAt: 'DESC' } }),
            this.incidentsRepo.find({ where: { projectId: id }, order: { incidentDate: 'DESC' } }),
            this.rfisRepo.find({ where: { projectId: id }, order: { raisedDate: 'DESC' } }),
            this.photosRepo.find({ where: { projectId: id }, order: { weekDate: 'DESC' }, take: 20 }),
        ]);
        return {
            project,
            progress,
            milestones,
            changeOrders,
            attendance,
            machinery,
            snags,
            incidents,
            rfis,
            photos,
        };
    }
    async addProgress(projectId, data) {
        await this.findOne(projectId);
        const entry = this.progressRepo.create({ ...data, projectId });
        return this.progressRepo.save(entry);
    }
    async addMilestone(projectId, data) {
        await this.findOne(projectId);
        const entry = this.milestonesRepo.create({ ...data, projectId });
        return this.milestonesRepo.save(entry);
    }
    async updateMilestone(projectId, milestoneId, data) {
        await this.findOne(projectId);
        await this.milestonesRepo.update(milestoneId, data);
        return this.milestonesRepo.findOne({ where: { id: milestoneId } });
    }
    async addAttendance(projectId, data) {
        await this.findOne(projectId);
        const entry = this.attendanceRepo.create({ ...data, projectId });
        return this.attendanceRepo.save(entry);
    }
    async addSnag(projectId, data) {
        await this.findOne(projectId);
        const entry = this.snagsRepo.create({ ...data, projectId });
        return this.snagsRepo.save(entry);
    }
    async updateSnag(projectId, snagId, data) {
        await this.findOne(projectId);
        await this.snagsRepo.update(snagId, data);
        return this.snagsRepo.findOne({ where: { id: snagId } });
    }
    async addRfi(projectId, data) {
        await this.findOne(projectId);
        const entry = this.rfisRepo.create({ ...data, projectId });
        return this.rfisRepo.save(entry);
    }
    async updateRfi(projectId, rfiId, data) {
        await this.findOne(projectId);
        await this.rfisRepo.update(rfiId, data);
        return this.rfisRepo.findOne({ where: { id: rfiId } });
    }
    async addIncident(projectId, data) {
        await this.findOne(projectId);
        const entry = this.incidentsRepo.create({ ...data, projectId });
        return this.incidentsRepo.save(entry);
    }
    async addMachinery(projectId, data) {
        await this.findOne(projectId);
        const entry = this.machineryRepo.create({ ...data, projectId });
        return this.machineryRepo.save(entry);
    }
    async addChangeOrder(projectId, data) {
        await this.findOne(projectId);
        const entry = this.changeOrdersRepo.create({ ...data, projectId });
        return this.changeOrdersRepo.save(entry);
    }
};
exports.ProjectsService = ProjectsService;
exports.ProjectsService = ProjectsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(project_entity_js_1.Project)),
    __param(1, (0, typeorm_1.InjectRepository)(project_progress_entity_js_1.ProjectProgress)),
    __param(2, (0, typeorm_1.InjectRepository)(project_milestone_entity_js_1.ProjectMilestone)),
    __param(3, (0, typeorm_1.InjectRepository)(change_order_entity_js_1.ChangeOrder)),
    __param(4, (0, typeorm_1.InjectRepository)(attendance_log_entity_js_1.AttendanceLog)),
    __param(5, (0, typeorm_1.InjectRepository)(machinery_log_entity_js_1.MachineryLog)),
    __param(6, (0, typeorm_1.InjectRepository)(snag_item_entity_js_1.SnagItem)),
    __param(7, (0, typeorm_1.InjectRepository)(safety_incident_entity_js_1.SafetyIncident)),
    __param(8, (0, typeorm_1.InjectRepository)(rfi_entity_js_1.Rfi)),
    __param(9, (0, typeorm_1.InjectRepository)(site_photo_entity_js_1.SitePhoto)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ProjectsService);
//# sourceMappingURL=projects.service.js.map