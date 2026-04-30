import { SnagStatus } from '../../common/enums.js';
import { Project } from './project.entity.js';
export declare class SnagItem {
    id: string;
    project: Project;
    projectId: string;
    taskDescription: string;
    assignedTo: string;
    status: SnagStatus;
    createdAt: Date;
    updatedAt: Date;
}
