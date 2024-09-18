import "express-async-errors";
import express from "express";
import { AppDataSource } from "./data-source";
import routes from "./routes";
import { errorMiddleware } from "./middlewares/errors";
import cors from "cors";
import helmet from 'helmet';

// antes de conectar o express, verifica se o banco inicializa, senao nem executa a app
AppDataSource.initialize().then(() => {
  const app = express();

  // Configurando CORS para um domínio específico
  let corsOptions:any = {
    origin: "https://meusite.com", // Somente este domínio terá acesso
    methods: ["GET", "POST"], // Métodos HTTP permitidos
    allowedHeaders: ["Content-Type", "Authorization"], // Cabeçalhos permitidos
  };

  // Permitir CORS para todos os domínios (não recomendado em produção)
  corsOptions = '' // usei :any so para permitir este recurso com o corsOptions - retirar !!!!
  app.use(cors(corsOptions));
  app.use(helmet());

  app.use(express.json());

  app.use(routes);

  // middleware de tratamento de erros sempre apos o ultimo middleware
  app.use(errorMiddleware);

  app.listen(process.env.PORT, () => {
    console.log(`Servidor ON in port `, process.env.PORT);
  });
});



/* PODE AUTORIZAR UTILIZAR VARIOS DOMINIOS

// Lista de domínios permitidos
const allowedOrigins = ['https://meusite.com', 'https://outrosite.com'];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Não permitido por CORS'));
    }
  },
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
*/