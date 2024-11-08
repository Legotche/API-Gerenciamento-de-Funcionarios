import { z } from "zod";

export const schemaCpf={
    body: z.object({
        cpf: z.string(),
    })
}

export const schemaCpf2={
    querystring: z.object({
        cpf: z.string(),
    })
}