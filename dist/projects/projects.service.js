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
const user_entity_js_1 = require("../users/entities/user.entity.js");
const project_progress_entity_js_1 = require("./entities/project-progress.entity.js");
const project_milestone_entity_js_1 = require("./entities/project-milestone.entity.js");
const change_order_entity_js_1 = require("./entities/change-order.entity.js");
const attendance_log_entity_js_1 = require("./entities/attendance-log.entity.js");
const machinery_log_entity_js_1 = require("./entities/machinery-log.entity.js");
const snag_item_entity_js_1 = require("./entities/snag-item.entity.js");
const safety_incident_entity_js_1 = require("./entities/safety-incident.entity.js");
const rfi_entity_js_1 = require("./entities/rfi.entity.js");
const site_photo_entity_js_1 = require("./entities/site-photo.entity.js");
const expense_entity_js_1 = require("../expenses/entities/expense.entity.js");
const subcontract_work_order_entity_js_1 = require("../subcontract-work-orders/entities/subcontract-work-order.entity.js");
const purchase_bill_entity_js_1 = require("../accounts/entities/purchase-bill.entity.js");
const sales_invoice_entity_js_1 = require("../accounts/entities/sales-invoice.entity.js");
const payment_entity_js_1 = require("../payments/entities/payment.entity.js");
const enums_js_1 = require("../common/enums.js");
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
    expensesRepo;
    swoRepo;
    billsRepo;
    invoicesRepo;
    paymentsRepo;
    usersRepo;
    constructor(projectsRepo, progressRepo, milestonesRepo, changeOrdersRepo, attendanceRepo, machineryRepo, snagsRepo, incidentsRepo, rfisRepo, photosRepo, expensesRepo, swoRepo, billsRepo, invoicesRepo, paymentsRepo, usersRepo) {
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
        this.expensesRepo = expensesRepo;
        this.swoRepo = swoRepo;
        this.billsRepo = billsRepo;
        this.invoicesRepo = invoicesRepo;
        this.paymentsRepo = paymentsRepo;
        this.usersRepo = usersRepo;
    }
    async create(dto, userId) {
        const existingCode = await this.projectsRepo.findOne({
            where: { projectCode: dto.projectCode },
        });
        if (existingCode)
            throw new common_1.ConflictException('Project code already in use');
        const { resourceIds, ...rest } = dto;
        const project = this.projectsRepo.create({ ...rest, createdBy: userId });
        if (resourceIds && resourceIds.length > 0) {
            project.resources = await this.usersRepo.findBy({ id: (0, typeorm_2.In)(resourceIds) });
        }
        return this.projectsRepo.save(project);
    }
    async findAll() {
        return this.projectsRepo.find({
            where: { isDeleted: false },
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id) {
        const project = await this.projectsRepo.findOne({
            where: { id, isDeleted: false },
        });
        if (!project)
            throw new common_1.NotFoundException('Project not found');
        return project;
    }
    async update(id, dto, userId) {
        const project = await this.findOne(id);
        if (dto.projectCode && dto.projectCode !== project.projectCode) {
            const existingCode = await this.projectsRepo.findOne({
                where: { projectCode: dto.projectCode },
            });
            if (existingCode)
                throw new common_1.ConflictException('Project code already in use');
        }
        const { resourceIds, ...rest } = dto;
        if (resourceIds !== undefined) {
            project.resources =
                resourceIds.length > 0
                    ? await this.usersRepo.findBy({ id: (0, typeorm_2.In)(resourceIds) })
                    : [];
        }
        Object.assign(project, { ...rest, updatedBy: userId });
        return this.projectsRepo.save(project);
    }
    async remove(id) {
        const project = await this.findOne(id);
        project.isDeleted = true;
        await this.projectsRepo.save(project);
    }
    async getDashboard(id) {
        const project = await this.findOne(id);
        const [progress, milestones, changeOrders, attendance, machinery, snags, incidents, rfis, photos,] = await Promise.all([
            this.progressRepo.find({
                where: { projectId: id },
                order: { weekStartDate: 'DESC' },
            }),
            this.milestonesRepo.find({
                where: { projectId: id },
                order: { plannedDate: 'ASC' },
            }),
            this.changeOrdersRepo.find({
                where: { projectId: id },
                order: { date: 'DESC' },
            }),
            this.attendanceRepo.find({
                where: { projectId: id },
                order: { logDate: 'DESC' },
                take: 30,
            }),
            this.machineryRepo.find({
                where: { projectId: id },
                order: { logDate: 'DESC' },
                take: 30,
            }),
            this.snagsRepo.find({
                where: { projectId: id },
                order: { createdAt: 'DESC' },
            }),
            this.incidentsRepo.find({
                where: { projectId: id },
                order: { incidentDate: 'DESC' },
            }),
            this.rfisRepo.find({
                where: { projectId: id },
                order: { raisedDate: 'DESC' },
            }),
            this.photosRepo.find({
                where: { projectId: id },
                order: { weekDate: 'DESC' },
                take: 20,
            }),
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
    async getProjectDetails(id) {
        const project = await this.findOne(id);
        const [expenses, subcontractWorkOrders, purchaseBills, invoices, payments] = await Promise.all([
            this.expensesRepo.find({
                where: {
                    projectId: id,
                    isDeleted: false,
                    status: enums_js_1.ExpenseStatus.ADMIN_APPROVED,
                },
                relations: ['project', 'trade', 'expenseType', 'creator'],
                order: { expenseDate: 'DESC' },
            }),
            this.swoRepo.find({
                where: {
                    projectId: id,
                    isDeleted: false,
                    status: enums_js_1.SubcontractWorkOrderStatus.ADMIN_APPROVED,
                },
                relations: ['project', 'subcontractor', 'workCategory'],
                order: { createdAt: 'DESC' },
            }),
            this.billsRepo.find({
                where: {
                    projectId: id,
                    isDeleted: false,
                    status: enums_js_1.BillStatus.ADMIN_APPROVED,
                },
                relations: ['vendor', 'project'],
                order: { createdAt: 'DESC' },
            }),
            this.invoicesRepo.find({
                where: { projectId: id, isDeleted: false },
                relations: ['project', 'items', 'payments'],
                order: { createdAt: 'DESC' },
            }),
            this.paymentsRepo.find({
                where: { projectId: id, isDeleted: false },
                relations: [
                    'project',
                    'vendor',
                    'purchaseBill',
                    'expense',
                    'salesInvoice',
                ],
                order: { paymentDate: 'DESC' },
            }),
        ]);
        return {
            project,
            expenses,
            subcontractWorkOrders,
            purchaseBills,
            invoices,
            payments,
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
    __param(10, (0, typeorm_1.InjectRepository)(expense_entity_js_1.Expense)),
    __param(11, (0, typeorm_1.InjectRepository)(subcontract_work_order_entity_js_1.SubcontractWorkOrder)),
    __param(12, (0, typeorm_1.InjectRepository)(purchase_bill_entity_js_1.PurchaseBill)),
    __param(13, (0, typeorm_1.InjectRepository)(sales_invoice_entity_js_1.SalesInvoice)),
    __param(14, (0, typeorm_1.InjectRepository)(payment_entity_js_1.Payment)),
    __param(15, (0, typeorm_1.InjectRepository)(user_entity_js_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
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