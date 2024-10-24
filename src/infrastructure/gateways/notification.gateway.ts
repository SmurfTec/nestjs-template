import {
  HttpException,
  InternalServerErrorException,
  UseFilters,
} from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import axios from 'axios';
import { Server, Socket } from 'socket.io';
import { AllExceptionsSocketFilter } from '../common/filters/websocket-exception-filters';
// import { UserUseCases } from 'src/usecases/user/user.usecases';
import { NotificationEvents } from '../common/events/notification-events';
// import { NotificationsUseCases } from 'src/usecases/notification/notifications.usecases';
// import { UserNotificationsUseCases } from 'src/usecases/usernotification/usernotifications.usecases';
import { notificationEnums } from '../common/enums/notifications.enums';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
// @UseFilters(new AllExceptionsSocketFilter())
export class NotificationGateway {
  @WebSocketServer()
  server: Server;
  constructor() // private userUseCases: UserUseCases,
  // private notificationsUseCases: NotificationsUseCases,
  // private userNotificationsUseCases: UserNotificationsUseCases,
  {
    // this.server = new Server();
    // this.server.setMaxListeners(0);
  }

  // @SubscribeMessage('notifications')
  // async onPermissionChange(
  //   @MessageBody() data: unknown,
  //   @ConnectedSocket() client: Socket,
  // ): Promise<any> {
  //   try {
  //     const user = await this.userUseCases.getUser(data['userId']);
  //     const notfications =
  //       await this.notificationsUseCases.getTypeAllNotifications();
  //     const updateUserNotifications = [];
  //     for (let i = 0; i < notfications.length; i++) {
  //       updateUserNotifications.push({
  //         user: user.id,
  //         notification: notfications[i].id,
  //       });
  //     }
  //     await this.userNotificationsUseCases.upsertUserNotification(
  //       updateUserNotifications,
  //     );
  //     NotificationEvents.onCreateNotificationHandler(async (emittedData) => {
  //       if (emittedData.notificationID) {
  //         const notification = await this.notificationsUseCases.getNotification(
  //           emittedData.notificationID,
  //         );
  //         if (notification.data.type === notificationEnums.ALL) {
  //           client.emit('notifications', notification);
  //           await this.userNotificationsUseCases.createUserNotification({
  //             notification: notification.data.id,
  //             user: user.id,
  //           });
  //         } else {
  //           if (
  //             await this.userNotificationsUseCases.checkUserNotifications(
  //               user.id,
  //               notification.data.id,
  //             )
  //           ) {
  //             client.emit('notifications', notification);
  //           }
  //         }
  //       }
  //     });
  //   } catch (e) {
  //     // throw new HttpException(e.message, e.status);
  //   }
  // }
}
