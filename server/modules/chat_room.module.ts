import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatRoom } from 'server/entities/chat_room.entity';
import { ChatRoomController } from 'server/controllers/api/chat_room.controller';
import { ChatRoomService } from 'server/providers/services/chat_room.service';
import { ChatMessagesGateway } from "server/providers/gateways/chat_messages.gateway";
import { JwtService } from "server/providers/services/jwt.service";
import { GuardUtil } from "server/providers/util/guard.util";
import { UsersService } from "server/providers/services/users.service";
import { UsersModule } from "./users.module";

@Module({
  imports : [TypeOrmModule.forFeature([ChatRoom]), UsersModule],
  controllers : [ChatRoomController],
  providers : [ChatRoomService, UsersService, ChatMessagesGateway, JwtService, GuardUtil],
  exports : [TypeOrmModule],
})
export class ChatRoomModule {}