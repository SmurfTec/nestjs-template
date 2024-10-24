import { WsResponse } from '@nestjs/websockets';
import { Observable } from 'rxjs';
import { Server } from 'socket.io';
export declare class MenuGateway {
    server: Server;
    sendMenu(): void;
    onEvent(data: unknown): Observable<WsResponse<number>>;
}
