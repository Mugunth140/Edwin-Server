import {
  IsString,
  IsOptional,
  IsArray,
  ValidateNested,
  IsUUID,
  IsDateString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class DailyWorkerDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  tradeId?: string;

  @ApiProperty()
  @IsString()
  trade: string;

  @ApiProperty()
  @IsOptional()
  count: number;

  @ApiProperty()
  @IsString()
  shift: string;

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

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  morningPhoto1Url?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  morningPhoto2Url?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  eveningPhoto1Url?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  eveningPhoto2Url?: string;
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
