import { ProjectStatus, ProjectNature, JobType, JobStatus } from '../../common/enums.js';
export declare class CreateProjectDto {
    name: string;
    projectCode: string;
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
    projectCategoryId?: string;
    projectNature?: ProjectNature;
    jobType?: JobType;
    jobStatus?: JobStatus;
    financialYear?: string;
    dateOfCreation?: string;
    resourceIds?: string[];
}
