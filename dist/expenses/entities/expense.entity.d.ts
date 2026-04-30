import { ExpenseCategory } from '../../common/enums.js';
import { Project } from '../../projects/entities/project.entity.js';
export declare class Expense {
    id: string;
    category: ExpenseCategory;
    description: string;
    amount: number;
    expenseDate: Date;
    paidBy: string;
    project: Project;
    projectId: string;
    receiptUrl: string;
    receiptKey: string;
    isDeleted: boolean;
    createdBy: string;
    createdAt: Date;
}
