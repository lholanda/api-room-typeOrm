import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Room } from "./Room";

// onde terá a chave estrangeiras

@Entity("videos")
export class Video {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: "text", nullable: false })
  title: string;
  @Column({ type: "text", nullable: false })
  url: string;

  @ManyToOne(() => Room, (room) => room.videos)  // configurar o relacionamento e o inverso  uma room terá varios videos room.videos
  @JoinColumn({ name: "room_fk" }) // foreign key
  room: Room;

  // quando chamar o room trará um objeto inteiro de Room

  // usar decorators para criar o relacionamento
  // muitos videos para a outra entid
  // ()=> Room - callback que retorna a entidade que eu vou me relacionar
  // room => room.videos - retorno do relacionamento
}
