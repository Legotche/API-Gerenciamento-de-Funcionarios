import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
import {} from 'dotenv'
import { URL_BANCO_DE_DADOS} from './src/schemas/dotenv';

export default defineConfig({
  out: './drizzle',
  schema: './src/database/tables.ts',
  dialect: 'mysql',
  dbCredentials: {
    url: URL_BANCO_DE_DADOS,
  },
});