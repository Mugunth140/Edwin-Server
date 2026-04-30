import { ExpenseCategory } from '../../common/enums.js';
export declare class CreateExpenseDto {
    category: ExpenseCategory;
    description: string;
    amount: number;
    expenseDate: string;
    paidBy?: string;
    projectId?: string;
}
