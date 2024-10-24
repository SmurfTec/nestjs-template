/// <reference types="node" />
import { Socket } from 'net';
import { Server } from 'socket.io';
export declare class NotifcationGateway {
    server: Server;
    sendMenu(): void;
    onEvent(data: unknown, client: Socket): any;
}
