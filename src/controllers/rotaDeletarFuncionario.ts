import { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { deletarFuncionario } from "../services/deletarFuncionario"
import { schemaCpf } from "../schemas/schemaCpf"
import { z } from "zod"
import { schemaErro } from "../schemas/schemaFuncionario"

export const rotaDeletarFuncionario: FastifyPluginAsyncZod = async function (app) {

    app.delete('/deletarFuncionario', {
        schema: { body: schemaCpf, response: {204:z.object({ message: z.string() }), 500: schemaErro} }
    },
        async (request, reply) => {
            try {
                await deletarFuncionario(request.body.cpf)
                reply.status(204).send({ message: 'Funcionário deletado com sucesso' })
            } catch (error) {
                reply.status(500).send({
                    message: 'Erro ao deletar funcionário',
                    error: error instanceof Error ? error.message : 'Erro desconhecido'
                })
            }
        })
}