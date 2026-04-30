import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Query,
  UseGuards,
  Request,
  UploadedFile,
  UseInterceptors,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiConsumes, ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard.js';
import { Roles } from '../auth/roles.decorator.js';
import { Role } from '../common/enums.js';
import { DprService } from './dpr.service.js';

@ApiTags('DPR')
@Controller('dpr')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiBearerAuth()
export class DprController {
  constructor(private readonly dprService: DprService) {}

  @Post()
  @Roles(Role.ADMIN, Role.SITE_ENGINEER)
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload a DPR report' })
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { projectId: string; reportDate: string },
    @Request() req: any,
  ) {
    // In production, upload to S3 and get URL/key
    const fileUrl = file ? `/uploads/dpr/${file.originalname}` : '';
    const fileKey = file ? `dpr/${Date.now()}-${file.originalname}` : '';
    const fileType = file ? file.mimetype : '';

    return this.dprService.create({
      projectId: body.projectId,
      reportDate: new Date(body.reportDate),
      fileUrl,
      fileKey,
      fileType,
      uploadedBy: req.user.id,
    });
  }

  @Get()
  @ApiOperation({ summary: 'List DPR reports' })
  @ApiQuery({ name: 'projectId', required: false })
  @ApiQuery({ name: 'dateFrom', required: false })
  @ApiQuery({ name: 'dateTo', required: false })
  findAll(
    @Query('projectId') projectId?: string,
    @Query('dateFrom') dateFrom?: string,
    @Query('dateTo') dateTo?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.dprService.findAll({ projectId, dateFrom, dateTo, page, limit });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get single DPR report' })
  findOne(@Param('id') id: string) {
    return this.dprService.findOne(id);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Soft delete DPR report (admin only)' })
  softDelete(@Param('id') id: string) {
    return this.dprService.softDelete(id);
  }
}
