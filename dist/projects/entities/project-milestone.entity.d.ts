import { MilestoneStatus } from '../../common/enums.js';
import { Project } from './project.entity.js';
export declare class ProjectMilestone {
    id: string;
    project: Project;
    projectId: string;
    title: string;
    plannedDate: Date;
    actualDate: Date;
    status: MilestoneStatus;
    createdAt: Date;
    updatedAt: Date;
}
