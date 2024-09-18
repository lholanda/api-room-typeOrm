import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Room } from "./Room";

@Entity('subjects')                                // subjects = disciplinas room = aulas
export class Subject{
    @PrimaryGeneratedColumn()
    id: number
    @Column({ type: 'text'})
    name: string

    // aqui usado em ambos os lados para indicar que há uma relação bidirecional.
    @ManyToMany(()=>Room, (room) => room.subjects)
    rooms: Room[]
}