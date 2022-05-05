import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';

import { Socket, Server } from 'socket.io';

// @WebSocketGateway(80, { namespace: 'chat' })
@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  clients = [];

  handleConnection(client: Socket): void {
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
