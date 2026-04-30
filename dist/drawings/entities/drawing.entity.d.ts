import { DrawingCategory } from '../../common/enums.js';
import { Project } from '../../projects/entities/project.entity.js';
export declare class Drawing {
    id: string;
    project: Project;
    projectId: string;
    title: string;
    category: DrawingCategory;
    revision: string;
    fileUrl: string;
    fileKey: string;
    uploadedBy: string;
    isDeleted: boolean;
    createdAt: Date;
}
