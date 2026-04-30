import { ExpenseCategory } from '../common/enums.js';
import { ExpensesService } from './expenses.service.js';
import { CreateExpenseDto } from './dto/create-expense.dto.js';
export declare class ExpensesController {
    private readonly expensesService;
    constructor(expensesService: ExpensesService);
    create(dto: CreateExpenseDto, req: any): Promise<import("./entities/expense.entity.js").Expense>;
    findAll(category?: ExpenseCategory, projectId?: string, dateFrom?: string, dateTo?: string, page?: number, limit?: number): Promise<{
        data: import("./entities/expense.entity.js").Expense[];
        total: number;
        page: number;
        limit: number;
    }>;
    getSummary(): Promise<any[]>;
}
