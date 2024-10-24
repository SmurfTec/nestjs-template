/// <reference types="node" />
import { EventEmitter } from 'stream';
export declare class NotificationEvents {
    static notificationEvent: EventEmitter;
    static createNotificationEmitter(data: any): void;
    static onCreateNotificationHandler(cb: any): void;
}
