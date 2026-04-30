import { Project } from './project.entity.js';
export declare class MachineryLog {
    id: string;
    project: Project;
    projectId: string;
    machineName: string;
    logDate: Date;
    usageHours: number;
    createdAt: Date;
}
