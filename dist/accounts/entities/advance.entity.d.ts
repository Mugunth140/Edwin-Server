import { AdvanceEntityType } from '../../common/enums.js';
export declare class Advance {
    id: string;
    entityType: AdvanceEntityType;
    entityId: string;
    amount: number;
    date: Date;
    notes: string;
    createdBy: string;
    createdAt: Date;
}
