import { PaymentType } from '../../common/enums.js';
export declare class CreatePaymentDto {
    paymentType: PaymentType;
    payeeName: string;
    amount: number;
    paymentDate: string;
    projectId?: string;
    notes?: string;
}
