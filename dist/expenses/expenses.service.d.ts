import { Repository, DataSource } from 'typeorm';
import { Expense } from './entities/expense.entity.js';
import { CreateExpenseDto } from './dto/create-expense.dto.js';
import { ExpenseCategory } from '../common/enums.js';
import { Payment } from '../payments/entities/payment.entity.js';
export declare class ExpensesService {
    private expensesRepo;
    private paymentsRepo;
    private dataSource;
    constructor(expensesRepo: Repository<Expense>, paymentsRepo: Repository<Payment>, dataSource: DataSource);
    create(dto: CreateExpenseDto, userId?: string, files?: Express.Multer.File[]): Promise<Expense>;
    findAll(query: {
        category?: ExpenseCategory;
        projectId?: string;
        dateFrom?: string;
        dateTo?: string;
        page?: number;
        limit?: number;
    }, user?: any): Promise<{
        data: Expense[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string): Promise<Expense>;
    update(id: string, dto: Partial<CreateExpenseDto>, files?: Express.Multer.File[]): Promise<Expense>;
    softDelete(id: string): Promise<void>;
    getSummary(): Promise<any[]>;
}
