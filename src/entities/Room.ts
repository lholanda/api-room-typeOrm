import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Video } from "./Video";
import { Subject } from "./Subject";

// posso tirar esta configuracao daqui ou informar apenas o
// nome e o database
@Entity({
  name: "rooms",
  database: process.env.DB_NAME,
  orderBy: {
    name: "ASC",
    id: "DESC",
  },
})
export class Room {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: "text" })
  name: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ type: "text", nullable: true })
  code: string;

  // uma Room para varios videos
  // configurar o inverso
  // TypeORM consegue inferir automaticamente a associação inversa
  // se quiser usar para ficar explicito o uso do @OneToMany, pode usar
  // @OneToMany(() => Video, video => video.room )
  videos: Video[];  // aqui o room.videos

  @ManyToMany(() => Subject, (subject) => subject.rooms)
  // tabela associativa ser configurada em qualquer um dos lados
  @JoinTable({
    name: "room_subject", // Nome da tabela intermediária
    joinColumn: {
      name: "room_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "subject_id",
      referencedColumnName: "id",
    },
  })
  subjects: Subject[];
}
