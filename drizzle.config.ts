import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
import {} from 'dotenv'
import { HOSPEDEIRO_BANCO_DE_DADOS, NOME_BANCO_DE_DADOS, PORTA_BANCO_DE_DADOS, SENHA_BANCO_DE_DADOS, USUARIO_BANCO_DE_DADOS } from './src/middlewares/dotenv';

export default defineConfig({
  out: './drizzle',
  schema: './src/database/tables.ts',
  dialect: 'mysql',
  dbCredentials: {
    port: PORTA_BANCO_DE_DADOS,
    host: HOSPEDEIRO_BANCO_DE_DADOS,
    user: USUARIO_BANCO_DE_DADOS,
    password: SENHA_BANCO_DE_DADOS,
    database: NOME_BANCO_DE_DADOS
  },
});