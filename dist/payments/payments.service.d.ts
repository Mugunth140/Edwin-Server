import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity.js';
import { CreatePaymentDto } from './dto/create-payment.dto.js';
import { PaymentType } from '../common/enums.js';
export declare class PaymentsService {
    private paymentsRepo;
    constructor(paymentsRepo: Repository<Payment>);
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
}
