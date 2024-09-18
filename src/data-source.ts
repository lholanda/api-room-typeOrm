import 'dotenv/config'
import 'reflect-metadata'  // typeOrm pede para importar - Doc
import { DataSource } from 'typeorm'

const port = process.env.DB_PORT as number | undefined
const port_mysql = process.env.DB_PORT_MYSQL as number | undefined

const PostgresDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: port,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [`${__dirname}/**/entities/*.{ts,js}`], // mapear todas as entidades ` ` template string
    migrations: [`${__dirname}/**/migrations/*.{ts,js}`], // mapear todas as migrations
    
    // synchronize: true,
    // logging: true,
    // entities: [Post, Category],
    // subscribers: [],
})

export const AppDataSource = PostgresDataSource ;