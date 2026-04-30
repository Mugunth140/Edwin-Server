import { SeverityLevel } from '../../common/enums.js';
import { Project } from './project.entity.js';
export declare class SafetyIncident {
    id: string;
    project: Project;
    projectId: string;
    incidentDate: Date;
    description: string;
    severity: SeverityLevel;
    createdAt: Date;
}
