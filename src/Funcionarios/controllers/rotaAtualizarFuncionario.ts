import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { alterarFuncionario } from "../services/alterarFuncionario";
import { schemaAlterarFuncionario } from "../schemas/schemaFuncionario";


export const rotaAlterarFuncionario: FastifyPluginAsyncZod = async (app) => {
    app.put('/alterarFuncionario', { schema: { body: schemaAlterarFuncionario } }, async (request, reply) => {
        try {
            await alterarFuncionario(request.body.cpf, request.body.alvo);
            reply.status(200).send({ message: "Funcionário alterado com sucesso" });
        } catch (error) {
            reply.status(400).send({ message: "Erro ao alterar funcionário", error: error instanceof Error ? error.message : "Erro desconhecido" });
        }
    })
}