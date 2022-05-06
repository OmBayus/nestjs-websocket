import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';

import { Socket, Server } from 'socket.io';

@WebSocketGateway({ namespace: 'chat2' })
export class Chat2Gateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  clients = [];

  handleConnection(client: Socket): void {
    console.log(2);
    this.clients.push(client.id);
    this.server.emit('connection', this.clients);
  }

  handleDisconnect(client: Socket) {
    this.clients = this.clients.filter((id) => id !== client.id);
    this.server.emit('connection', this.clients);
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: string): void {
    this.server.emit('message', message);
  }
}
