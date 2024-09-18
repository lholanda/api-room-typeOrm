"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const data_source_1 = require("./data-source");
const routes_1 = __importDefault(require("./routes"));
const errors_1 = require("./middlewares/errors");
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
// antes de conectar o express, verifica se o banco inicializa, senao nem chama o express
data_source_1.AppDataSource.initialize().then(() => {
    const app = (0, express_1.default)();
    // Configurando CORS para um domínio específico
    let corsOptions = {
        origin: "https://meusite.com", // Somente este domínio terá acesso
        methods: ["GET", "POST"], // Métodos HTTP permitidos
        allowedHeaders: ["Content-Type", "Authorization"], // Cabeçalhos permitidos
    };
    // Permitir CORS para todos os domínios (não recomendado em produção)
    corsOptions = ''; // usei :any so para permitir este recurso com o corsOptions - retirar !!!!
    app.use((0, cors_1.default)(corsOptions));
    app.use((0, helmet_1.default)());
    app.use(express_1.default.json());
    app.use(routes_1.default);
    // middleware de tratamento de erros sempre apos o ultimo middleware
    app.use(errors_1.errorMiddleware);
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
