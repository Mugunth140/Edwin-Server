import { PaymentType, PaymentMode } from '../../common/enums.js';
export declare class CreatePaymentDto {
    paymentType: PaymentType;
    purchaseBillId?: string;
    vendorId?: string;
    payeeName?: string;
    amount: number;
    paymentDate: string;
    paymentMode?: PaymentMode;
    referenceNumber?: string;
    projectId?: string;
    notes?: string;
}
