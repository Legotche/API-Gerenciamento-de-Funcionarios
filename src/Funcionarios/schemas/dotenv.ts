import dotenv from 'dotenv';
dotenv.config();
import z from 'zod'
import {parseEnv} from 'znv'


export const {
    URL_BANCO_DE_DADOS,
    MYSQL_DATABASE,
    MYSQL_ROOT_PASSWORD,
    JWT_SECRET
    } = parseEnv(process.env,{
        URL_BANCO_DE_DADOS: z.string().url(),
        MYSQL_DATABASE: z.string(),
        MYSQL_ROOT_PASSWORD: z.string(),
        JWT_SECRET: z.string().min(1, "JWT_SECRET é obrigatório")
        }
    )
