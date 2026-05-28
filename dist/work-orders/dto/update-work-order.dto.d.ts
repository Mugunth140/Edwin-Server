import { CreateWorkOrderDto } from './create-work-order.dto.js';
import { WorkOrderStatus } from '../../common/enums.js';
declare const UpdateWorkOrderDto_base: import("@nestjs/common").Type<Partial<CreateWorkOrderDto>>;
export declare class UpdateWorkOrderDto extends UpdateWorkOrderDto_base {
}
export declare class UpdateWorkOrderStatusDto {
    status: WorkOrderStatus;
}
export {};
