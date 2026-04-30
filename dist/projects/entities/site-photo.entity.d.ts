import { Project } from './project.entity.js';
export declare class SitePhoto {
    id: string;
    project: Project;
    projectId: string;
    weekDate: Date;
    photoUrl: string;
    photoKey: string;
    caption: string;
    createdAt: Date;
}
