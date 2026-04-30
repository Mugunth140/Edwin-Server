import { Project } from './project.entity.js';
export declare class ProjectProgress {
    id: string;
    project: Project;
    projectId: string;
    weekStartDate: Date;
    plannedPct: number;
    actualPct: number;
    notes: string;
    createdAt: Date;
}
