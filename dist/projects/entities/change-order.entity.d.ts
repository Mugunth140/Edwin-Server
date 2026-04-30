import { Project } from './project.entity.js';
export declare class ChangeOrder {
    id: string;
    project: Project;
    projectId: string;
    description: string;
    date: Date;
    costImpact: number;
    createdAt: Date;
}
