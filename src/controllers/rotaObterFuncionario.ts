import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { schemaCpf } from "../schemas/schemaCpf";
import { obterFuncionario } from "../services/obterFuncionario";
import { any, z } from "zod";
import { schemaErro, schemaFuncionario } from "../schemas/schemaFuncionario";

export const rotaObterFuncionario: FastifyPluginAsyncZod = async (app) => {
    app.get('/obterFuncionario', {
        schema:{querystring:schemaCpf,response:{200:schemaFuncionario,400:schemaErro}},
    },
    async (request, reply) => {
        try {
            const f = await obterFuncionario(request.query.cpf)
            reply.status(200).send(f[0].toJSON())

        } catch (error) {
            reply.status(400).send({ message: "Erro ao obter funcionário", error: error instanceof Error ? error.message : "Erro desconhecido" });
        }
    })
}