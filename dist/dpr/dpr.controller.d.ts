import { DprService } from './dpr.service.js';
export declare class DprController {
    private readonly dprService;
    constructor(dprService: DprService);
    create(file: Express.Multer.File, body: {
        projectId: string;
        reportDate: string;
    }, req: any): Promise<import("./entities/dpr-report.entity.js").DprReport>;
    findAll(projectId?: string, dateFrom?: string, dateTo?: string, page?: number, limit?: number): Promise<{
        data: import("./entities/dpr-report.entity.js").DprReport[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string): Promise<import("./entities/dpr-report.entity.js").DprReport>;
    softDelete(id: string): Promise<void>;
}
