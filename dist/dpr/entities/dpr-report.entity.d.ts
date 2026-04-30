import { Project } from '../../projects/entities/project.entity.js';
export declare class DprReport {
    id: string;
    project: Project;
    projectId: string;
    reportDate: Date;
    fileUrl: string;
    fileType: string;
    fileKey: string;
    uploadedBy: string;
    isDeleted: boolean;
    createdAt: Date;
}
