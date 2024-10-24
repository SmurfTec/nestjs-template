import { UseGuards } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Socket } from 'net';
import { from, map, Observable } from 'rxjs';
import { Server } from 'socket.io';
import { JwtAuthGuard } from 'src/infrastructure/common/guards/jwtAuth.guard';
import { UserData } from 'src/infrastructure/common/user.data';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class NotifcationGateway {
  @WebSocketServer()
  server: Server;

  sendMenu() {
    this.server.emit('menus', { item: 'item2' });
  }

  @SubscribeMessage('notifications')
  onEvent(
    @MessageBody() data: unknown,
    @ConnectedSocket() client: Socket,
  ): any {
    // const user = UserData.getUserData();
    // if (user) {
    //   client.emit('notifications', {
    //     statusCode: 200,
    //     message: 'Authorized',
    //   });
    // } else {
    //   client.emit('notifications', {
    //     statusCode: 401,
    //     message: 'UnAuthorized',
    //   });
    // }
    // if (user === undefined) {
    //   client.emit('notifications', {
    //     statusCode: 401,
    //     message: 'UnAuthorized',
    //   });
    // } else {
    //   const event = 'notifications';
    //   const response = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    //   return from(response).pipe(map((data) => ({ event, data })));
    // }
  }
}
