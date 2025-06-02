import { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { schemaCpf } from "../schemas/schemaCpf"
import { marcarRecebimento } from "../services/marcarRecebimento"
import { z } from "zod"
import { schemaErro } from "../schemas/schemaFuncionario"

export const rotaMarcarRecebimento: FastifyPluginAsyncZod = async function (app) {

    app.post('/marcarRecebimento',
        {
            schema: {
                body: schemaCpf,
                response: {
                    200: z.object({ message: z.string() }),
                    500: schemaErro
                }
            }
        },
        async (request, reply) => {
            try {
                await marcarRecebimento(request.body.cpf)
                reply.status(200).send({ message: `Pagamento marcado com sucesso para o funcionário ${request.body.cpf}` })
            } catch (error) {

                reply.status(500).send({
                    message: 'Erro ao marcar recebimento',
                    error: error instanceof Error ? error.message : 'Erro desconhecido'
                })

            }

        })

}