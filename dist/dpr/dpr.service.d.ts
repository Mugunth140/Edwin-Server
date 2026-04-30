import { Repository } from 'typeorm';
import { DprReport } from './entities/dpr-report.entity.js';
export declare class DprService {
    private dprRepo;
    constructor(dprRepo: Repository<DprReport>);
    create(data: Partial<DprReport>): Promise<DprReport>;
    findAll(query: {
        projectId?: string;
        dateFrom?: string;
        dateTo?: string;
        page?: number;
        limit?: number;
    }): Promise<{
        data: DprReport[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string): Promise<DprReport>;
    softDelete(id: string): Promise<void>;
}
