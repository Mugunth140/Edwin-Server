import { IsString, IsUUID, IsOptional, IsNumber, IsDateString, IsArray, ValidateNested, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AdvanceEntityType } from '../../common/enums.js';

export class InvoiceItemDto {
  @ApiProperty() @IsString() description: string;
  @ApiProperty() @IsNumber() quantity: number;
  @ApiPropertyOptional({ default: 'nos' }) @IsString() @IsOptional() unit?: string;
  @ApiProperty() @IsNumber() rate: number;
}

export class CreateInvoiceDto {
  @ApiProperty() @IsUUID() customerId: string;
  @ApiPropertyOptional() @IsUUID() @IsOptional() projectId?: string;
  @ApiPropertyOptional() @IsDateString() @IsOptional() dueDate?: string;
  @ApiProperty({ type: [InvoiceItemDto] })
  @IsArray() @ValidateNested({ each: true }) @Type(() => InvoiceItemDto) items: InvoiceItemDto[];
}

export class CreateBillDto {
  @ApiProperty() @IsUUID() vendorId: string;
  @ApiPropertyOptional() @IsUUID() @IsOptional() purchaseOrderId?: string;
  @ApiPropertyOptional() @IsUUID() @IsOptional() projectId?: string;
  @ApiProperty() @IsNumber() amount: number;
  @ApiPropertyOptional() @IsDateString() @IsOptional() billDate?: string;
  @ApiPropertyOptional() @IsDateString() @IsOptional() dueDate?: string;
}

export class CreateAdvanceDto {
  @ApiProperty({ enum: AdvanceEntityType }) @IsEnum(AdvanceEntityType) entityType: AdvanceEntityType;
  @ApiProperty() @IsUUID() entityId: string;
  @ApiProperty() @IsNumber() amount: number;
  @ApiProperty() @IsDateString() date: string;
  @ApiPropertyOptional() @IsString() @IsOptional() notes?: string;
}

export class CreateBoqDto {
  @ApiProperty() @IsUUID() projectId: string;
  @ApiProperty() @IsString() description: string;
  @ApiPropertyOptional() @IsNumber() @IsOptional() estimatedQty?: number;
  @ApiPropertyOptional() @IsNumber() @IsOptional() estimatedRate?: number;
  @ApiPropertyOptional() @IsNumber() @IsOptional() estimatedAmount?: number;
}
