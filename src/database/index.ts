import { drizzle } from 'drizzle-orm/mysql2'
import { URL_BANCO_DE_DADOS } from '../Funcionarios/schemas/dotenv'

export const db = drizzle(URL_BANCO_DE_DADOS)