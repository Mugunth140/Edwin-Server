import { ProjectStatus } from '../../common/enums.js';
export declare class Project {
    id: string;
    name: string;
    description: string;
    location: string;
    clientName: string;
    status: ProjectStatus;
    completionPct: number;
    estimatedBudget: number;
    startDate: Date;
    endDate: Date;
    isDeleted: boolean;
    createdBy: string;
    updatedBy: string;
    createdAt: Date;
    updatedAt: Date;
}
