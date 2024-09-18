### api-room-typeOrm

### inicializar o typescript
npx tsc --init
    tsconfig.json - usar configuracao padrão

### banco de dados Postgre
usar ->  compose.yml
rodar com -> docker compose up -d --build


### .env file
DB_HOST=localhost
DB_PORT=5432  
DB_USER=postgres
DB_PASS=postgres
DB_NAME=api_rest_typescript

### datasource para trabalhar com typeOrm
import { DataSource } from "typeorm"

-- MYSQL
// const MysqlDataSource = new DataSource({
//     type: "mysql",
//     host: process.env.DB_HOST,
//     port: port_mysql,
//     username: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     database: process.env.DB_NAME,
// //    entities: [`${__dirname}/**/entities/*.{ts,js}`], // mapear todas as entidades
// //    migrations: [`${__dirname}/**/migrations/*.{ts,js}`], // mapear todas as migrations
    
//     synchronize: true,
//     logging: true,
//     // entities: [Post, Category],
//     subscribers: [],
// })

// neste app = postgres database

-- Postgre
// recurso a ser efetuado. variavel port.
const port = process.env.DB_PORT as number | undefined


const PostgresDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: port,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [`${__dirname}/**/entities/*.{ts,js}`], // mapear todas as entidades
    migrations: [`${__dirname}/**/migrations/*.{ts,js}`], // mapear todas as migrations
    
    synchronize: true,
    logging: true,
    // entities: [Post, Category],
    subscribers: [],
})



### auxilia na manipulacao de erros assincronos
yarn add express-async-errors

### rodar aplicacao

labs-up sobe banco e aplicacao

ou 

ydev
