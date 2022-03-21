import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ConsoleLogger, UseGuards } from '@nestjs/common';
import { GatewayAuthGuard } from '../guards/gatewayauth.guard';
import { JwtService } from '../services/jwt.service';

class ChatMessagePayload {
  contents : string;
  userName : string;
}

@WebSocketGateway()
@UseGuards(GatewayAuthGuard)
export class ChatMessagesGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private jwtService : JwtService) {}

  handleConnection(client: any, ...args: any[]) {
    try {
      const jwt = client.handshake.auth.token;
      const body = this.jwtService.parseToken(jwt);
      client.join(client.handshake.query.chatRoomId as unknown as string);
      console.log('Client Connected');
    }
    catch (e) {
      throw new WsException('Invalid Token');
    }
  }

  handleDisconnect(client: any) {
      console.log('Client Disconnected');
  }

  @SubscribeMessage('message')
  async handleMessage(client : Socket, payload : ChatMessagePayload) {
    const chatRoomId = parseInt(client.handshake.query.chatRoomId as unknown as string, 10);
    const chatMessage = payload.contents;
    const userName = payload.userName;

    let message = {contents : payload.contents, userName : payload.userName, chatRoomId : chatRoomId}
    this.server.to(`${message.chatRoomId}`).emit('message', message);
  }

}