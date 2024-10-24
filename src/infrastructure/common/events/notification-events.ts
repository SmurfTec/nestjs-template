import { EventEmitter } from 'stream';

export class NotificationEvents {
  static notificationEvent = new EventEmitter();
  static createNotificationEmitter(data) {
    this.notificationEvent.emit('notify', data);
  }

  static onCreateNotificationHandler(cb) {
    this.notificationEvent.on('notify', cb);
  }
}
