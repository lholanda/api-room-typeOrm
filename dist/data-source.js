"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("dotenv/config");
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const port = process.env.DB_PORT;
const port_mysql = process.env.DB_PORT_MYSQL;
const PostgresDataSource = new typeorm_1.DataSource({
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
});
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
exports.AppDataSource = PostgresDataSource;
