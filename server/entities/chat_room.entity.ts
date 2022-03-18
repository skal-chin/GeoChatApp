import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ChatRoom{
  @PrimaryGeneratedColumn()
  id : number;

  @Column({unique : false, nullable : false})
  name : string;

  @Column({unique : true, nullable : false})
  key : string;

  @Column({unique : false, nullable : false})
  longitude : number;

  @Column({unique : false, nullable : false})
  latitude : number;

  @Column({unique : false, nullable : false})
  owner : string;

}