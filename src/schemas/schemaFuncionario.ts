import { z } from "zod";

export const schemaFuncionario = z.object({
    nome: z.string(),
    dataDeNascimento: z.date(),
    cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF inválido'),
    telefone: z.string().regex(/^\+55 \d{2} \d{4,5}-\d{4}$/, 'Telefone inválido'),
    dataDeContratacao: z.date(),
    cargo: z.object({
        nome: z.string(),
        salario: z.number()
    }),
    entradasESaidas: z.array(z.date()),
    recebimentos: z.array(z.date()),
    ativo: z.boolean().default(true)
})

export const schemaErro = z.object({
    message: z.string(),
    error: z.string().optional()
})

export const schemaAlterarFuncionario = z.object({
    cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF inválido'),
    alvo: z.record(z.any())
})

