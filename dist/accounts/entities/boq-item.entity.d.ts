import { Project } from '../../projects/entities/project.entity.js';
export declare class BoqItem {
    id: string;
    project: Project;
    projectId: string;
    description: string;
    estimatedQty: number;
    estimatedRate: number;
    estimatedAmount: number;
    actualAmount: number;
    createdAt: Date;
}
