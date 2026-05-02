import {
  Controller, Get, Post, Delete, Param, Query, UseGuards, Request,
  UploadedFile, UseInterceptors, Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiConsumes, ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard.js';
import { Roles } from '../auth/roles.decorator.js';
import { Role, DrawingCategory } from '../common/enums.js';
import { DrawingsService } from './drawings.service.js';

@ApiTags('Drawings')
@Controller({ path: 'drawings', version: '1' })
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiBearerAuth()
export class DrawingsController {
  constructor(private readonly drawingsService: DrawingsService) {}

  @Post()
  @Roles(Role.ADMIN, Role.SITE_ENGINEER)
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Upload a drawing' })
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { projectId: string; title: string; category: DrawingCategory; revision?: string },
    @Request() req: any,
  ) {
    const fileUrl = file ? `/uploads/drawings/${file.originalname}` : '';
    const fileKey = file ? `drawings/${Date.now()}-${file.originalname}` : '';

    return this.drawingsService.create({
      projectId: body.projectId,
      title: body.title,
      category: body.category,
      revision: body.revision || 'Rev A',
      fileUrl,
      fileKey,
      uploadedBy: req.user.id,
    });
  }

  @Get()
  @ApiOperation({ summary: 'List drawings' })
  @ApiQuery({ name: 'projectId', required: false })
  @ApiQuery({ name: 'category', required: false, enum: DrawingCategory })
  @ApiQuery({ name: 'revision', required: false })
  findAll(
    @Query('projectId') projectId?: string,
    @Query('category') category?: DrawingCategory,
    @Query('revision') revision?: string,
  ) {
    return this.drawingsService.findAll({ projectId, category, revision });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get drawing metadata + download URL' })
  findOne(@Param('id') id: string) {
    return this.drawingsService.findOne(id);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Soft delete drawing (admin only)' })
  softDelete(@Param('id') id: string) {
    return this.drawingsService.softDelete(id);
  }
}
