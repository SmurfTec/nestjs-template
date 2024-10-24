import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { from, map, Observable } from 'rxjs';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MenuGateway {
  @WebSocketServer()
  server: Server;

  sendMenu() {
    this.server.emit('menus', { item: 'item2' });
  }

  @SubscribeMessage('events')
  onEvent(@MessageBody() data: unknown): Observable<WsResponse<number>> {
    const event = 'events';
    const response = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    return from(response).pipe(map((data) => ({ event, data })));
  }
}
