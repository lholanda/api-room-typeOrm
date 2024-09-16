import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Video } from "./Video";
import { Subject } from "./Subject";

@Entity({
    name: 'rooms',
    database: process.env.DB_NAME,
    orderBy: {
        name: "ASC",
        id: "DESC"
    }
})

export class Room {
    @PrimaryGeneratedColumn()
    id: number
    @Column({ type: 'text'})
    name: string

    @Column({ type: 'text', nullable: true})
    description: string

    @Column({type: 'text',  nullable: true})
    code: string

    // uma Room para varios videos
    // configurar o inverso 
    @OneToMany(() => Video, video => video.room )
    videos: Video[]

    @ManyToMany(()=>Subject, subject => subject.rooms)
    // criei a joinTable em subjects
    subjects: Subject
}