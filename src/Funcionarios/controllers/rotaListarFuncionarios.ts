import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { listarFuncionarios } from "../services/listarFuncionarios";
import { schemaCpf } from "../schemas/schemaCpf";
import { z } from "zod";
import { schemaErro, schemaFuncionario } from "../schemas/schemaFuncionario";


export const rotaListarFuncionarios: FastifyPluginAsyncZod = async (app) => {

    app.get('/listarFuncionarios', {
        schema: {
            response:{ 200: z.array(schemaFuncionario), 500: schemaErro }
            
        }
    },
        async (request, reply) => {
            try {
                const f = await listarFuncionarios()
                if (f.length == 0) {
                    throw new Error("Funcionarios nao encontrados");
                }
                reply.status(200).send(f);

            } catch (error) {
                reply.status(500).send({
                    message: 'Erro ao listar funcionários',
                    error: error instanceof Error ? error.message : 'Erro desconhecido'
                })
            }
        })

}