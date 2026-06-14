import { ProjectStatus } from '../../common/enums.js';
export declare class CreateProjectDto {
    name: string;
    description?: string;
    location?: string;
    email?: string;
    phone1?: string;
    phone2?: string;
    clientName?: string;
    customerId?: string;
    status?: ProjectStatus;
    completionPct?: number;
    estimatedBudget?: number;
    startDate?: string;
    endDate?: string;
}
