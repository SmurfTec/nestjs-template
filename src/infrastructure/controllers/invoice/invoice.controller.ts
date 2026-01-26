import {
  Controller,
  Get,
  Param,
  Res,
  UseGuards,
  Request,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Response } from 'express';
import { InvoiceService } from '../../services/invoice/invoice.service';
import { InvoiceRepository } from '../../repository/invoice.repository';
import { JwtAuthGuard } from 'src/infrastructure/common/guards/jwtAuth.guard';

@Controller('invoices')
@ApiTags('Invoices')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('authorization')
export class InvoiceController {
  constructor(
    private readonly invoiceService: InvoiceService,
    private readonly invoiceRepository: InvoiceRepository,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all invoices for the current user' })
  async getInvoices(@Request() req: any) {
    const userId = req.user.id || req.user.userId;
    const ownerType = 'user';
    const ownerId = userId;

    const invoices = await this.invoiceRepository.findByOwner(ownerId);
    return invoices;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get invoice by ID' })
  async getInvoice(@Param('id') id: string, @Request() req: any) {
    const userId = req.user.id || req.user.userId;
    const ownerType = 'user';
    const ownerId = userId;

    const invoice = await this.invoiceRepository.findById(parseInt(id));

    if (!invoice) {
      throw new HttpException('Invoice not found', HttpStatus.NOT_FOUND);
    }

    // Verify ownership
    if (invoice.owner_id !== ownerId) {
      throw new HttpException('Unauthorized', HttpStatus.FORBIDDEN);
    }

    return invoice;
  }

  @Get(':id/pdf')
  @ApiOperation({ summary: 'Download invoice PDF' })
  async getInvoicePdf(
    @Param('id') id: string,
    @Request() req: any,
    @Res() res: Response,
  ) {
    const userId = req.user.id || req.user.userId;
    const ownerType = 'user';
    const ownerId = userId;

    const invoice = await this.invoiceRepository.findById(parseInt(id));

    if (!invoice) {
      throw new HttpException('Invoice not found', HttpStatus.NOT_FOUND);
    }

    // Verify ownership
    if (invoice.owner_id !== ownerId) {
      throw new HttpException('Unauthorized', HttpStatus.FORBIDDEN);
    }

    const pdfBuffer = await this.invoiceService.getInvoicePdf(invoice.id);

    if (!pdfBuffer) {
      throw new HttpException('PDF not found', HttpStatus.NOT_FOUND);
    }

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="invoice-${invoice.invoice_number}.pdf"`,
    );
    res.send(pdfBuffer);
  }
}

