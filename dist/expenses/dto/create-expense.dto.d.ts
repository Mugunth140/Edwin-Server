import { ExpenseCategory, ExpenseStatus } from '../../common/enums.js';
export declare class CreateExpenseDto {
    category?: ExpenseCategory;
    expenseTypeId?: string;
    description: string;
    amount: number;
    expenseDate: string;
    paidBy?: string;
    projectId?: string;
    tradeId?: string;
    remarks?: string;
    status?: ExpenseStatus;
}
