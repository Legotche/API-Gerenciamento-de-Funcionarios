import { z } from "zod";

export const schemaTrocarTelefone={
    body: z.object({
        cpf: z.string(),
        telefone: z.string()
    })
}