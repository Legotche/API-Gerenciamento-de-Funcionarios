import { z } from "zod";

export const schemaCpf=z.object({
    cpf:z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF inválido')
})
