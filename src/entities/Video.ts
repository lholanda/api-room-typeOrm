import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Room } from "./Room";

@Entity("videos")
export class Video {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: "text", nullable: false })
  title: string;
  @Column({ type: "text", nullable: false })
  url: string;

  @ManyToOne(() => Room, (room) => room.videos)
  @JoinColumn({ name: "room_fk" }) // foreign key
  room: Room;

  // usar decorators para criar o relacionamento
  // muitos videos para a outra entid
  // ()=> Room - callback que retorna a entidade que eu vou me relacionar
  // room => room.videos - retorno do relacionamento
}
