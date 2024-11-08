import dotenv from 'dotenv';
dotenv.config();
import z from 'zod'
import {parseEnv} from 'znv'


export const {
    URL_BANCO_DE_DADOS,
    SENHA_BANCO_DE_DADOS,
    PORTA_BANCO_DE_DADOS,
    HOSPEDEIRO_BANCO_DE_DADOS,
    USUARIO_BANCO_DE_DADOS,
    NOME_BANCO_DE_DADOS
    } = parseEnv(process.env,{
        URL_BANCO_DE_DADOS: z.string().url(),
        SENHA_BANCO_DE_DADOS: z.string(),
        PORTA_BANCO_DE_DADOS: z.number(),
        HOSPEDEIRO_BANCO_DE_DADOS: z.string(),
        USUARIO_BANCO_DE_DADOS:z.string(),
        NOME_BANCO_DE_DADOS: z.string(),
        }
    )
