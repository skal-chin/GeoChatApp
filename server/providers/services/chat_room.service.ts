import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typrorm';
import { ChatRoom } from 'server/entities/chat_room.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ChatRoomService {
  constructor(
    @InjectRepository(ChatRoom)
    private chatRoomRepository : Repository<ChatRoom>,

  ) {}

  findAll() {
    return this.chatRoomRepository.find();
  }

  find(id : number) {
    return this.chatRoomRepository.findOne(id);
  }

  removeChatRoom(chatRoom : ChatRoom) {
    return this.chatRoomRepository.delete(chatRoom);
  }

  createChatRoom(chatRoom : ChatRoom) {
    return this.chatRoomRepository.save(chatRoom);
  }
}
