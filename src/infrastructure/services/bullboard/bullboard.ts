import { ExpressAdapter } from '@bull-board/express';
import { createBullBoard } from '@bull-board/api';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { Queue } from 'bullmq';

export function setupBullBoard(app: any) {
  const serverAdapter = new ExpressAdapter();
  serverAdapter.setBasePath('/bullboard');

  const queues = [
    new Queue('notifications-inapp'),
    new Queue('notifications-email'),
    new Queue('notifications-push'),
    new Queue('notifications-sms'),
  ];

  createBullBoard({
    queues: queues.map(q => new BullMQAdapter(q)),
    serverAdapter,
  });

  app.use('/bullboard', serverAdapter.getRouter());
}