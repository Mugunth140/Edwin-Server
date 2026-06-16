import { ExpenseCategory, ExpenseStatus } from '../../common/enums.js';
import { Project } from '../../projects/entities/project.entity.js';
import { Trade } from '../../trades/entities/trade.entity.js';
import { User } from '../../users/entities/user.entity.js';
import { ExpenseType } from '../../expense-types/entities/expense-type.entity.js';
export declare class Expense {
    id: string;
    category: ExpenseCategory;
    expenseType: ExpenseType;
    expenseTypeId: string;
    description: string;
    amount: number;
    expenseDate: Date;
    status: ExpenseStatus;
    paidBy: string;
    project: Project;
    projectId: string;
    trade: Trade;
    tradeId: string;
    remarks: string;
    receiptUrl: string;
    receiptKey: string;
    receiptUrls: string[];
    receiptKeys: string[];
    isDeleted: boolean;
    creator: User;
    createdBy: string;
    createdAt: Date;
}
