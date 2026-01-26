import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invoice, InvoiceStatus } from '../entities/invoice.entity';

@Injectable()
export class InvoiceRepository {
  constructor(
    @InjectRepository(Invoice)
    private readonly repo: Repository<Invoice>,
  ) {}

  async create(invoice: Partial<Invoice>): Promise<Invoice> {
    return await this.repo.save(this.repo.create(invoice));
  }

  async findById(id: number): Promise<Invoice | null> {
    return await this.repo.findOne({ where: { id } });
  }

  async findByInvoiceNumber(invoiceNumber: string): Promise<Invoice | null> {
    return await this.repo.findOne({ where: { invoice_number: invoiceNumber } });
  }

  async findByStripeInvoiceId(stripeInvoiceId: string): Promise<Invoice | null> {
    return await this.repo.findOne({ where: { stripe_invoice_id: stripeInvoiceId } });
  }

  async findByOwner(ownerId: number): Promise<Invoice[]> {
    return await this.repo.find({
      where: { owner_id: ownerId },
      order: { created_at: 'DESC' },
    });
  }

  async updateStatus(id: number, status: InvoiceStatus, paidAt?: Date): Promise<void> {
    await this.repo.update(id, {
      status,
      ...(paidAt && { paid_at: paidAt }),
    });
  }

  async updatePdfPath(id: number, pdfPath: string): Promise<void> {
    await this.repo.update(id, { pdf_path: pdfPath });
  }

  async update(id: number, updateData: Partial<Invoice>): Promise<Invoice> {
    await this.repo.update(id, updateData);
    return this.findById(id);
  }
}

