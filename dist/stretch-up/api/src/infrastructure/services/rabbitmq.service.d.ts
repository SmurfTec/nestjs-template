import { ClientProxy } from '@nestjs/microservices';
export declare class RabbitMQService {
    private rabbitMQClient;
    constructor(rabbitMQClient: ClientProxy);
    onApplicationBootstrap(): Promise<void>;
    send(pattern: any, data: any): import("rxjs").Observable<any>;
    emit(pattern: any, data: any): import("rxjs").Observable<any>;
}
