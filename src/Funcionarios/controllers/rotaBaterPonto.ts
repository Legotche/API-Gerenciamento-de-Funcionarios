import { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { schemaCpf } from "../schemas/schemaCpf"
import { baterPonto } from "../services/baterPonto"
import fastify from "fastify"

export const rotaBaterPonto: FastifyPluginAsyncZod = async function (app) {

    app.post('/baterPonto', { schema: { body: schemaCpf }, }, async (request, reply) => {
        
        try {
            await baterPonto(request.body.cpf);
            reply.status(200).send({ message: "Ponto batido com sucesso" });
        } catch (error) {
            reply.status(400).send({ message: "Erro ao bater ponto", error: error instanceof Error ? error.message : "Erro desconhecido" });

        }
    })

}