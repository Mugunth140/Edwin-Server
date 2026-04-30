import { Project } from './project.entity.js';
export declare class AttendanceLog {
    id: string;
    project: Project;
    projectId: string;
    logDate: Date;
    headcount: number;
    notes: string;
    createdAt: Date;
}
