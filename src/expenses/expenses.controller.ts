import { Controller, Get, Post, Patch, Delete, Body, Query, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard.js';
import { Roles } from '../auth/roles.decorator.js';
import { Role, ExpenseCategory } from '../common/enums.js';
import { ExpensesService } from './expenses.service.js';
import { CreateExpenseDto } from './dto/create-expense.dto.js';

@ApiTags('Expenses')
@Controller({ path: 'expenses', version: '1' })
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiBearerAuth()
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  @Roles(Role.ADMIN, Role.ACCOUNTS_MANAGER)
  @ApiOperation({ summary: 'Create expense' })
  create(@Body() dto: CreateExpenseDto, @Request() req: any) {
    return this.expensesService.create(dto, req.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'List expenses' })
  @ApiQuery({ name: 'category', required: false, enum: ExpenseCategory })
  @ApiQuery({ name: 'projectId', required: false })
  @ApiQuery({ name: 'dateFrom', required: false })
  @ApiQuery({ name: 'dateTo', required: false })
  findAll(
    @Query('category') category?: ExpenseCategory,
    @Query('projectId') projectId?: string,
    @Query('dateFrom') dateFrom?: string,
    @Query('dateTo') dateTo?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.expensesService.findAll({ category, projectId, dateFrom, dateTo, page, limit });
  }

  @Get('summary')
  @ApiOperation({ summary: 'Category-wise expense totals' })
  getSummary() { return this.expensesService.getSummary(); }

  @Get(':id')
  @ApiOperation({ summary: 'Get expense by id' })
  findOne(@Param('id') id: string) {
    return this.expensesService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.ACCOUNTS_MANAGER)
  @ApiOperation({ summary: 'Update expense' })
  update(@Param('id') id: string, @Body() dto: Partial<CreateExpenseDto>) {
    return this.expensesService.update(id, dto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.ACCOUNTS_MANAGER)
  @ApiOperation({ summary: 'Delete expense' })
  remove(@Param('id') id: string) {
    return this.expensesService.softDelete(id);
  }
}
