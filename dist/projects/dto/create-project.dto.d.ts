import { ProjectStatus } from '../../common/enums.js';
export declare class CreateProjectDto {
    name: string;
    description?: string;
    location?: string;
    clientName?: string;
    status?: ProjectStatus;
    estimatedBudget?: number;
    startDate?: string;
    endDate?: string;
}
