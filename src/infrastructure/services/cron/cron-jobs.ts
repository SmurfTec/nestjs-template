import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class MyCronJob {
  constructor() {}
  private readonly logger = new Logger(MyCronJob.name);

  // Good
  // Schedule the cron job to run every 23 hours (at 00:00)

  // Scheduel for every 2 hours
  // @Cron('0 */2 * * *')
  @Cron('0 0 * * *')
  async handleCron() {}
}
