import { IsString, IsOptional, IsArray, ValidateNested, IsUUID, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class DailyWorkerDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  tradeId?: string;

  @ApiProperty()
  @IsString()
  trade: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  inTime?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  outTime?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  remarks?: string;
}

export class CreateDailyLabourReportDto {
  @ApiProperty()
  @IsUUID()
  projectId: string;

  @ApiProperty()
  @IsDateString()
  reportDate: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  remarks?: string;

  @ApiProperty({ type: [DailyWorkerDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DailyWorkerDto)
  workers: DailyWorkerDto[];
}
