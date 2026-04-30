import { PaymentType } from '../common/enums.js';
import { PaymentsService } from './payments.service.js';
import { CreatePaymentDto } from './dto/create-payment.dto.js';
export declare class PaymentsController {
    private readonly paymentsService;
    constructor(paymentsService: PaymentsService);
    create(dto: CreatePaymentDto, req: any): Promise<import("./entities/payment.entity.js").Payment>;
    findAll(type?: PaymentType, projectId?: string, dateFrom?: string, dateTo?: string, page?: number, limit?: number): Promise<{
        data: import("./entities/payment.entity.js").Payment[];
        total: number;
        page: number;
        limit: number;
    }>;
    getSummary(): Promise<any[]>;
}
