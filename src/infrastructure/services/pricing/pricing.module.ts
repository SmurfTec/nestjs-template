import { Module } from '@nestjs/common';
import { PricingConfigService } from './pricing-config.service';

@Module({
  providers: [PricingConfigService],
  exports: [PricingConfigService],
})
export class PricingModule {}

