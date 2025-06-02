import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { salvarFuncionario } from '../services/salvarFuncionario';
import { Funcionario } from '../entities/Funcionario';
import { Cargo } from '../entities/Cargo';
import { schemaErro, schemaFuncionario } from '../schemas/schemaFuncionario';
import { z } from 'zod';



export const rotaCriarFuncionario: FastifyPluginAsyncZod = async function (app) {

    app.post('/criarFuncionario', {
        schema: { body: schemaFuncionario, response: { 201: z.object({ message: z.string() }), 400: schemaErro } }
    },
        async (request, response) => {
            try {
                await salvarFuncionario(new Funcionario(
                    request.body.nome,
                    request.body.dataDeNascimento,
                    request.body.cpf,
                    request.body.telefone,
                    request.body.dataDeContratacao,
                    new Cargo(
                        request.body.cargo.nome,
                        request.body.cargo.salario
                    ),
                    request.body.entradasESaidas,
                    request.body.recebimentos,
                    true
                ))
                response.status(201).send({ message: 'Funcionario criado com sucesso' })

            } catch (error) {
                response.status(400).send({
                    message: "Erro ao criar funcionário",
                    error: error instanceof Error ? error.message : "Erro desconhecido"
                })
            }
        })
}
