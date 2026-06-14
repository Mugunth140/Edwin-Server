import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Query,
  UseGuards,
  Request,
  UseInterceptors,
  Body,
  UploadedFiles,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiConsumes, ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as fs from 'fs';
import { RolesGuard } from '../auth/roles.guard.js';
import { Roles } from '../auth/roles.decorator.js';
import { Role } from '../common/enums.js';
import { DailyLabourService } from './daily-labour.service.js';

@ApiTags('Daily Labour Entry (DPW)')
@Controller({ path: 'daily-labour', version: '1' })
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiBearerAuth()
export class DailyLabourController {
  constructor(private readonly dailyLabourService: DailyLabourService) {}

  @Post()
  @Roles(Role.ADMIN, Role.SITE_ENGINEER, Role.ACCOUNTS_MANAGER)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'morningPhoto1', maxCount: 1 },
      { name: 'morningPhoto2', maxCount: 1 },
      { name: 'eveningPhoto1', maxCount: 1 },
      { name: 'eveningPhoto2', maxCount: 1 },
    ], {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const uploadPath = './uploads/dpw';
          if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
          }
          cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `dpw-${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Create Daily Labour Entry' })
  async create(
    @UploadedFiles() files: {
      morningPhoto1?: Express.Multer.File[],
      morningPhoto2?: Express.Multer.File[],
      eveningPhoto1?: Express.Multer.File[],
      eveningPhoto2?: Express.Multer.File[]
    },
    @Body() body: any,
    @Request() req: any,
  ) {
    // Parse workers array since it comes as a stringified JSON in multipart form data
    const workers = body.workers ? JSON.parse(body.workers) : [];

    return this.dailyLabourService.create({
      projectId: body.projectId,
      reportDate: body.reportDate,
      remarks: body.remarks,
      workers: workers,
    }, req.user.id, files);
  }

  @Get()
  @ApiOperation({ summary: 'List all DPW reports' })
  @ApiQuery({ name: 'projectId', required: false })
  findAll(@Query('projectId') projectId?: string) {
    return this.dailyLabourService.findAll(projectId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get single DPW report' })
  findOne(@Param('id') id: string) {
    return this.dailyLabourService.findOne(id);
  }

  @Post(':id')
  @Roles(Role.ADMIN, Role.SITE_ENGINEER, Role.ACCOUNTS_MANAGER)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'morningPhoto1', maxCount: 1 },
      { name: 'morningPhoto2', maxCount: 1 },
      { name: 'eveningPhoto1', maxCount: 1 },
      { name: 'eveningPhoto2', maxCount: 1 },
    ], {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const uploadPath = './uploads/dpw';
          if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
          }
          cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `dpw-${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Update Daily Labour Entry' })
  async update(
    @Param('id') id: string,
    @UploadedFiles() files: {
      morningPhoto1?: Express.Multer.File[],
      morningPhoto2?: Express.Multer.File[],
      eveningPhoto1?: Express.Multer.File[],
      eveningPhoto2?: Express.Multer.File[]
    },
    @Body() body: any,
  ) {
    const workers = body.workers ? JSON.parse(body.workers) : [];

    return this.dailyLabourService.update(id, {
      projectId: body.projectId,
      reportDate: body.reportDate,
      remarks: body.remarks,
      workers: workers,
    }, files);
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.SITE_ENGINEER, Role.ACCOUNTS_MANAGER)
  @ApiOperation({ summary: 'Delete DPW report' })
  remove(@Param('id') id: string) {
    return this.dailyLabourService.remove(id);
  }
}
