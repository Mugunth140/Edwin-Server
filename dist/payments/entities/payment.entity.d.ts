import { PaymentType } from '../../common/enums.js';
import { Project } from '../../projects/entities/project.entity.js';
export declare class Payment {
    id: string;
    paymentType: PaymentType;
    payeeName: string;
    amount: number;
    paymentDate: Date;
    project: Project;
    projectId: string;
    notes: string;
    isDeleted: boolean;
    createdBy: string;
    createdAt: Date;
}
