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

### Login e autenticação com JWT

yarn add bcrypt

yarn -D add @types/bcrypt


### auxilia na manipulacao de erros assincronos
yarn add express-async-errors

### rodar aplicacao

labs-up sobe banco e aplicacao

ou 

ydev

### autenticação com JWT

yarn add jsonwebtoken
yarn -D add @types/jsonwebtoken

jwt.io


### JEST - teste unitarios
yarn add --dev jest ts-jest @types/jest

yarn test

yarn test LoginController.test.ts

