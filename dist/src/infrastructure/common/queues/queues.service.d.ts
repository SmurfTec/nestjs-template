import { Queue } from 'bull';
export declare class QueueService {
    private readonly emailQueue;
    constructor(emailQueue: Queue);
    addEmail(name: string, email: string, token: string): Promise<void>;
}
