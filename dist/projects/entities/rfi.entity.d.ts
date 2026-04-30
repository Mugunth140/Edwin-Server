import { RfiStatus } from '../../common/enums.js';
import { Project } from './project.entity.js';
export declare class Rfi {
    id: string;
    project: Project;
    projectId: string;
    title: string;
    raisedBy: string;
    raisedDate: Date;
    status: RfiStatus;
    responseDate: Date;
    createdAt: Date;
    updatedAt: Date;
}
