import { ProjectsService } from './projects.service.js';
import { CreateProjectDto } from './dto/create-project.dto.js';
import { UpdateProjectDto } from './dto/update-project.dto.js';
export declare class ProjectsController {
    private readonly projectsService;
    constructor(projectsService: ProjectsService);
    create(dto: CreateProjectDto, req: any): Promise<import("./entities/project.entity.js").Project>;
    findAll(): Promise<import("./entities/project.entity.js").Project[]>;
    update(id: string, dto: UpdateProjectDto, req: any): Promise<import("./entities/project.entity.js").Project>;
    remove(id: string): Promise<void>;
    getDashboard(id: string): Promise<{
        project: import("./entities/project.entity.js").Project;
        progress: import("./entities/project-progress.entity.js").ProjectProgress[];
        milestones: import("./entities/project-milestone.entity.js").ProjectMilestone[];
        changeOrders: import("./entities/change-order.entity.js").ChangeOrder[];
        attendance: import("./entities/attendance-log.entity.js").AttendanceLog[];
        machinery: import("./entities/machinery-log.entity.js").MachineryLog[];
        snags: import("./entities/snag-item.entity.js").SnagItem[];
        incidents: import("./entities/safety-incident.entity.js").SafetyIncident[];
        rfis: import("./entities/rfi.entity.js").Rfi[];
        photos: import("./entities/site-photo.entity.js").SitePhoto[];
    }>;
    getDetails(id: string): Promise<{
        project: import("./entities/project.entity.js").Project;
        expenses: import("../expenses/entities/expense.entity.js").Expense[];
        subcontractWorkOrders: import("../subcontract-work-orders/entities/subcontract-work-order.entity.js").SubcontractWorkOrder[];
        purchaseBills: import("../accounts/entities/purchase-bill.entity.js").PurchaseBill[];
        invoices: import("../accounts/entities/sales-invoice.entity.js").SalesInvoice[];
        payments: import("../payments/entities/payment.entity.js").Payment[];
    }>;
    addProgress(id: string, body: any): Promise<import("./entities/project-progress.entity.js").ProjectProgress>;
    addMilestone(id: string, body: any): Promise<import("./entities/project-milestone.entity.js").ProjectMilestone>;
    updateMilestone(id: string, mid: string, body: any): Promise<import("./entities/project-milestone.entity.js").ProjectMilestone | null>;
    addAttendance(id: string, body: any): Promise<import("./entities/attendance-log.entity.js").AttendanceLog>;
    addSnag(id: string, body: any): Promise<import("./entities/snag-item.entity.js").SnagItem>;
    updateSnag(id: string, snagId: string, body: any): Promise<import("./entities/snag-item.entity.js").SnagItem | null>;
    addRfi(id: string, body: any): Promise<import("./entities/rfi.entity.js").Rfi>;
    updateRfi(id: string, rfiId: string, body: any): Promise<import("./entities/rfi.entity.js").Rfi | null>;
    addIncident(id: string, body: any): Promise<import("./entities/safety-incident.entity.js").SafetyIncident>;
    addMachinery(id: string, body: any): Promise<import("./entities/machinery-log.entity.js").MachineryLog>;
    addChangeOrder(id: string, body: any): Promise<import("./entities/change-order.entity.js").ChangeOrder>;
}
