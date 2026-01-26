import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InvoiceRepository } from '../../repository/invoice.repository';
import { Invoice, InvoiceStatus } from '../../entities/invoice.entity';
import * as puppeteer from 'puppeteer';
import * as path from 'path';
import * as fs from 'fs';
import * as handlebars from 'handlebars';

export interface InvoiceData {
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  companyName: string;
  companyInitials: string;
  companyAddress: string;
  companyPhone: string;
  companyEmail: string;
  billingName: string;
  billingEmail?: string;
  billingAddress?: string;
  shippingName: string;
  shippingAddress?: string;
  lineItems: {
    description: string;
    quantity: number;
    unitPrice: string;
    amount: string;
    period?: {
      start: string;
      end: string;
    };
  }[];
  subtotal: string;
  tax: string;
  taxRate: string;
  total: string;
  currency: string;
  payOnlineUrl?: string;
  notes?: string;
}

@Injectable()
export class InvoiceService {
  private readonly logger = new Logger(InvoiceService.name);

  constructor(
    private readonly invoiceRepository: InvoiceRepository,
    private readonly configService: ConfigService,
  ) {}

  async createInvoiceFromStripe(
    stripeInvoice: any,
    ownerId: number,
  ): Promise<Invoice> {
    const invoiceNumber = this.generateInvoiceNumber();
    const issueDate = new Date(stripeInvoice.created * 1000);
    const dueDate = stripeInvoice.due_date
      ? new Date(stripeInvoice.due_date * 1000)
      : issueDate;

    const lineItems = stripeInvoice.lines.data.map((line: any) => ({
      description: line.description || 'Subscription',
      quantity: line.quantity || 1,
      unit_price: (line.amount / 100).toFixed(2),
      amount: (line.amount / 100).toFixed(2),
      period: line.period
        ? {
            start: new Date(line.period.start * 1000).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            }),
            end: new Date(line.period.end * 1000).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            }),
          }
        : undefined,
    }));

    const subtotal = stripeInvoice.subtotal / 100;
    const tax = (stripeInvoice.tax || 0) / 100;
    const total = stripeInvoice.total / 100;

    const invoice = await this.invoiceRepository.create({
      invoice_number: invoiceNumber,
      stripe_invoice_id: stripeInvoice.id,
      owner_id: ownerId,
      status:
        stripeInvoice.paid === true
          ? InvoiceStatus.PAID
          : stripeInvoice.status === 'open'
            ? InvoiceStatus.PENDING
            : InvoiceStatus.DRAFT,
      subtotal,
      tax,
      total,
      currency: stripeInvoice.currency.toUpperCase(),
      issue_date: issueDate,
      due_date: dueDate,
      paid_at: stripeInvoice.paid ? new Date(stripeInvoice.status_transitions.paid_at * 1000) : null,
      line_items: lineItems,
      billing_address: stripeInvoice.customer_address
        ? {
            name: stripeInvoice.customer_name || '',
            email: stripeInvoice.customer_email || '',
            address: stripeInvoice.customer_address.line1 || '',
            city: stripeInvoice.customer_address.city || '',
            state: stripeInvoice.customer_address.state || '',
            postal_code: stripeInvoice.customer_address.postal_code || '',
            country: stripeInvoice.customer_address.country || '',
          }
        : null,
      shipping_address: stripeInvoice.customer_address
        ? {
            name: stripeInvoice.customer_name || '',
            address: stripeInvoice.customer_address.line1 || '',
            city: stripeInvoice.customer_address.city || '',
            state: stripeInvoice.customer_address.state || '',
            postal_code: stripeInvoice.customer_address.postal_code || '',
            country: stripeInvoice.customer_address.country || '',
          }
        : null,
    });

    // Generate PDF
    const pdfPath = await this.generatePdf(invoice);
    await this.invoiceRepository.updatePdfPath(invoice.id, pdfPath);

    return invoice;
  }

  async generatePdf(invoice: Invoice): Promise<string> {
    try {
      const templatePath = path.resolve(
        process.cwd(),
        'src/infrastructure/templates/invoice-template.html',
      );
      const templateContent = fs.readFileSync(templatePath, 'utf-8');
      const template = handlebars.compile(templateContent);

      // Get company info from config or use defaults
      const companyName =
        this.configService.get<string>('COMPANY_NAME') || 'Seller Analytics';
      const companyAddress =
        this.configService.get<string>('COMPANY_ADDRESS') ||
        '760 Market Street, Floor 10, San Francisco, California 94102, United States';
      const companyPhone =
        this.configService.get<string>('COMPANY_PHONE') || '+1 415-890-5404';
      const companyEmail =
        this.configService.get<string>('COMPANY_EMAIL') || 'support@selleranalytics.com';

      const companyInitials = companyName
        .split(' ')
        .map((word) => word[0])
        .join('')
        .toUpperCase()
        .substring(0, 2);

      const billingName =
        invoice.billing_address?.name || 'Customer';
      const billingEmail = invoice.billing_address?.email;
      const billingAddress = invoice.billing_address
        ? [
            invoice.billing_address.address,
            invoice.billing_address.city,
            invoice.billing_address.state,
            invoice.billing_address.postal_code,
            invoice.billing_address.country,
          ]
            .filter(Boolean)
            .join(', ')
        : '';

      const shippingName =
        invoice.shipping_address?.name || billingName;
      const shippingAddress = invoice.shipping_address
        ? [
            invoice.shipping_address.address,
            invoice.shipping_address.city,
            invoice.shipping_address.state,
            invoice.shipping_address.postal_code,
            invoice.shipping_address.country,
          ]
            .filter(Boolean)
            .join(', ')
        : billingAddress;

      const invoiceData: InvoiceData = {
        invoiceNumber: invoice.invoice_number,
        issueDate: invoice.issue_date.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
        dueDate: invoice.due_date.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
        companyName,
        companyInitials,
        companyAddress,
        companyPhone,
        companyEmail,
        billingName,
        billingEmail,
        billingAddress: billingAddress || undefined,
        shippingName,
        shippingAddress: shippingAddress || undefined,
        lineItems: (invoice.line_items || []).map((item) => ({
          description: item.description,
          quantity: item.quantity,
          unitPrice: item.unit_price.toFixed(2),
          amount: item.amount.toFixed(2),
          period: item.period,
        })),
        subtotal: invoice.subtotal.toFixed(2),
        tax: invoice.tax.toFixed(2),
        taxRate: invoice.tax > 0 ? ((invoice.tax / invoice.subtotal) * 100).toFixed(0) : '0',
        total: invoice.total.toFixed(2),
        currency: invoice.currency,
        payOnlineUrl: invoice.stripe_invoice_id
          ? `https://invoice.stripe.com/i/${invoice.stripe_invoice_id}`
          : undefined,
        notes: invoice.notes || undefined,
      };

      const html = template(invoiceData);

      // Launch Puppeteer
      const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });

      const page = await browser.newPage();
      await page.setContent(html, { waitUntil: 'networkidle0' });

      // Generate PDF
      const pdfDir = path.resolve(process.cwd(), 'invoices');
      if (!fs.existsSync(pdfDir)) {
        fs.mkdirSync(pdfDir, { recursive: true });
      }

      const pdfPath = path.join(pdfDir, `invoice-${invoice.invoice_number}.pdf`);

      await page.pdf({
        path: pdfPath,
        format: 'A4',
        printBackground: true,
        margin: {
          top: '0',
          right: '0',
          bottom: '0',
          left: '0',
        },
      });

      await browser.close();

      this.logger.log(`PDF generated: ${pdfPath}`);

      return pdfPath;
    } catch (error) {
      this.logger.error(`Error generating PDF: ${error.message}`, error.stack);
      throw error;
    }
  }

  async getInvoicePdf(invoiceId: number): Promise<Buffer | null> {
    const invoice = await this.invoiceRepository.findById(invoiceId);
    if (!invoice || !invoice.pdf_path) {
      return null;
    }

    if (!fs.existsSync(invoice.pdf_path)) {
      // Regenerate PDF if it doesn't exist
      await this.generatePdf(invoice);
      return this.getInvoicePdf(invoiceId);
    }

    return fs.readFileSync(invoice.pdf_path);
  }

  private generateInvoiceNumber(): string {
    const prefix = 'INV';
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `${prefix}-${timestamp}-${random}`;
  }
}

