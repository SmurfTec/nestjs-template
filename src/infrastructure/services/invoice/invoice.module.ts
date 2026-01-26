import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from '../../entities/invoice.entity';
import { InvoiceRepository } from '../../repository/invoice.repository';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from '../../controllers/invoice/invoice.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Invoice])],
  providers: [InvoiceRepository, InvoiceService],
  controllers: [InvoiceController],
  exports: [InvoiceService, InvoiceRepository],
})
export class InvoiceModule {}

