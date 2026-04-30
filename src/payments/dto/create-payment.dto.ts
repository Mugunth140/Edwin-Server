import { IsEnum, IsString, IsNumber, IsDateString, IsOptional, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PaymentType } from '../../common/enums.js';

export class CreatePaymentDto {
  @ApiProperty({ enum: PaymentType }) @IsEnum(PaymentType) paymentType: PaymentType;
  @ApiProperty() @IsString() payeeName: string;
  @ApiProperty() @IsNumber() amount: number;
  @ApiProperty() @IsDateString() paymentDate: string;
  @ApiPropertyOptional() @IsUUID() @IsOptional() projectId?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() notes?: string;
}
