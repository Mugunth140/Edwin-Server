import { Repository, DataSource } from 'typeorm';
import { Payment } from './entities/payment.entity.js';
import { CreatePaymentDto } from './dto/create-payment.dto.js';
import { PaymentType } from '../common/enums.js';
import { PurchaseBill } from '../accounts/entities/purchase-bill.entity.js';
import { Expense } from '../expenses/entities/expense.entity.js';
export declare class PaymentsService {
    private paymentsRepo;
    private billRepo;
    private expenseRepo;
    private dataSource;
    constructor(paymentsRepo: Repository<Payment>, billRepo: Repository<PurchaseBill>, expenseRepo: Repository<Expense>, dataSource: DataSource);
    create(dto: CreatePaymentDto, userId?: string): Promise<Payment>;
    findAll(query: {
        type?: PaymentType;
        projectId?: string;
        dateFrom?: string;
        dateTo?: string;
        page?: number;
        limit?: number;
    }): Promise<{
        data: Payment[];
        total: number;
        page: number;
        limit: number;
    }>;
    getSummary(): Promise<any[]>;
    syncExpenses(): Promise<{
        success: boolean;
        syncedCount: number;
    }>;
}
