import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class QueueService {
  constructor(@InjectQueue('emails') private readonly emailQueue: Queue) {}

  async addEmail(name: string, email: string, token: string) {
    await this.emailQueue.add('email-password-set-job', {
      name,
      email,
      token,
    });
  }
}
