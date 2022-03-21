import { Body, Controller, Delete, Get, Param, Post, HttpException} from '@nestjs/common'
import { JwtBody } from 'server/decorators/jwt_body.decorator';
import { JwtBodyDto } from 'server/dto/jwt_body.dto';
import { ChatRoom } from 'server/entities/chat_room.entity';
import { User } from 'server/entities/user.entity';
import { ChatRoomService } from 'server/providers/services/chat_room.service';
import { UsersService} from 'server/providers/services/users.service';

class ChatRoomPostBody {
  name : string;
  longitude : number;
  latitude : number;
}

@Controller()
export class ChatRoomController {
  constructor(
    private chatRoomService : ChatRoomService,
    private userService : UsersService,
    ) {}

  @Get('chat_rooms/')
  public async index() {
    const chatRooms = await this.chatRoomService.findAll()
    return { chatRooms };
  }

  @Get('chat_rooms/:id')
  public async show(@Param('id') id : string) {
    const chatRoom = await this.chatRoomService.find(parseInt(id, 10));
    return { chatRoom };
  }

  @Post('chat_rooms/')
  public async create(@JwtBody() jwtBody : JwtBodyDto, @Body() body : ChatRoomPostBody ) {
    const user = await this.userService.find(jwtBody.userId);
    let chatRoom = new ChatRoom();

    chatRoom.name = body.name;
    // generate key
    chatRoom.longitude = body.longitude;
    chatRoom.latitude = body.latitude;
    chatRoom.owner = user.email;
    
    const newChatRoom = await this.chatRoomService.createChatRoom(chatRoom);

    return { newChatRoom };
  }

  @Delete('chat_rooms/:id')
  public async delete(@Param('id') id : string, @JwtBody() jwtBody : JwtBodyDto) {
    const chatRoom = await this.chatRoomService.find(parseInt(id, 10));
    const user = this.userService.find(jwtBody.userId);

    if (user.email !== chatRoom.owner) {
      throw new HttpException('Unauthorized', 401);
    }

    this.chatRoomService.removeChatRoom(chatRoom);

    return { success : true };
  }
}