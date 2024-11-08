import { z } from "zod";

export const schemaFuncionario={
    body: z.object({
        nome: z.string(),
        dataDeNascimento: z.string().date(),
        cpf: z.string(),
        telefone: z.string(),
        dataDeContratacao: z.string().date(),
        cargo: z.object({
            nome: z.string(),
            salario: z.number()
        }),
        entradasESaidas: z.array(z.string().date()),
        recebimentos: z.array(z.string().date()),
        ativo: z.boolean()
    })
}