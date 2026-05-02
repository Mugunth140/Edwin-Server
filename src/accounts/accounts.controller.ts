import { Controller, Get, Post, Patch, Body, Param, Query, UseGuards, Request, Version } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard.js';
import { Roles } from '../auth/roles.decorator.js';
import { Role, InvoiceStatus } from '../common/enums.js';
import { AccountsService } from './accounts.service.js';
import { CreateInvoiceDto, CreateBillDto, CreateAdvanceDto, CreateBoqDto } from './dto/accounts.dto.js';

@ApiTags('Accounts')
@Version('1')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiBearerAuth()
@Controller()
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  // --- Ledger / Summary ---
  @Get('accounts/ledger')
  @Roles(Role.ADMIN, Role.ACCOUNTS_MANAGER)
  @ApiOperation({ summary: 'Derived transaction log' })
  getLedger() { return this.accountsService.getLedger(); }

  @Get('accounts/payables')
  @Roles(Role.ADMIN, Role.ACCOUNTS_MANAGER)
  @ApiOperation({ summary: 'Outstanding payables' })
  getPayables() { return this.accountsService.getPayables(); }

  @Get('accounts/receivables')
  @Roles(Role.ADMIN, Role.ACCOUNTS_MANAGER)
  @ApiOperation({ summary: 'Outstanding receivables' })
  getReceivables() { return this.accountsService.getReceivables(); }

  @Get('accounts/balance')
  @Roles(Role.ADMIN, Role.ACCOUNTS_MANAGER)
  @ApiOperation({ summary: 'Revenue vs cost summary' })
  getBalance() { return this.accountsService.getBalance(); }

  // --- Invoices ---
  @Post('invoices')
  @Roles(Role.ADMIN, Role.ACCOUNTS_MANAGER)
  @ApiOperation({ summary: 'Create sales invoice' })
  createInvoice(@Body() dto: CreateInvoiceDto, @Request() req: any) {
    return this.accountsService.createInvoice(dto, req.user.id);
  }

  @Get('invoices')
  @Roles(Role.ADMIN, Role.ACCOUNTS_MANAGER)
  @ApiOperation({ summary: 'List invoices' })
  @ApiQuery({ name: 'status', required: false, enum: InvoiceStatus })
  @ApiQuery({ name: 'customerId', required: false })
  @ApiQuery({ name: 'projectId', required: false })
  findInvoices(
    @Query('status') status?: InvoiceStatus,
    @Query('customerId') customerId?: string,
    @Query('projectId') projectId?: string,
  ) {
    return this.accountsService.findInvoices({ status, customerId, projectId });
  }

  @Patch('invoices/:id/status')
  @Roles(Role.ADMIN, Role.ACCOUNTS_MANAGER)
  @ApiOperation({ summary: 'Update invoice status' })
  updateInvoiceStatus(@Param('id') id: string, @Body('status') status: InvoiceStatus) {
    return this.accountsService.updateInvoiceStatus(id, status);
  }

  // --- Bills ---
  @Post('bills')
  @Roles(Role.ADMIN, Role.ACCOUNTS_MANAGER)
  @ApiOperation({ summary: 'Create purchase bill' })
  createBill(@Body() dto: CreateBillDto, @Request() req: any) {
    return this.accountsService.createBill(dto, req.user.id);
  }

  @Get('bills')
  @Roles(Role.ADMIN, Role.ACCOUNTS_MANAGER)
  @ApiOperation({ summary: 'List bills' })
  findBills() { return this.accountsService.findBills(); }

  // --- BOQ ---
  @Post('boq')
  @Roles(Role.ADMIN, Role.ACCOUNTS_MANAGER)
  @ApiOperation({ summary: 'Add BOQ item' })
  createBoq(@Body() dto: CreateBoqDto) { return this.accountsService.createBoq(dto); }

  @Get('boq/:projectId')
  @ApiOperation({ summary: 'BOQ items for project' })
  findBoq(@Param('projectId') projectId: string) { return this.accountsService.findBoq(projectId); }

  // --- Advances ---
  @Post('advances')
  @Roles(Role.ADMIN, Role.ACCOUNTS_MANAGER)
  @ApiOperation({ summary: 'Create advance payment' })
  createAdvance(@Body() dto: CreateAdvanceDto, @Request() req: any) {
    return this.accountsService.createAdvance(dto, req.user.id);
  }

  @Get('advances')
  @Roles(Role.ADMIN, Role.ACCOUNTS_MANAGER)
  @ApiOperation({ summary: 'List advances' })
  findAdvances() { return this.accountsService.findAdvances(); }
}
