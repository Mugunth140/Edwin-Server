import { IsEnum, IsString, IsNumber, IsDateString, IsOptional, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ExpenseCategory } from '../../common/enums.js';

export class CreateExpenseDto {
  @ApiProperty({ enum: ExpenseCategory }) @IsEnum(ExpenseCategory) category: ExpenseCategory;
  @ApiProperty() @IsString() description: string;
  @ApiProperty() @IsNumber() amount: number;
  @ApiProperty() @IsDateString() expenseDate: string;
  @ApiPropertyOptional() @IsString() @IsOptional() paidBy?: string;
  @ApiPropertyOptional() @IsUUID() @IsOptional() projectId?: string;
}
