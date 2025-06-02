import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { schemaCpf } from '../schemas/schemaCpf';
import { desativarFuncionario } from '../services/desativarFuncionario';
import { z } from 'zod';
import { schemaErro } from '../schemas/schemaFuncionario';



export const rotaDesativarFuncionario:FastifyPluginAsyncZod = async function(app){

    app.put('/desativarFuncionario',
        {
            schema:{body:schemaCpf,
            response: {
                200:z.object({message: z.string()}),
                500:schemaErro
            }
        }},
        async (request,reply)=>{
        try{
            await desativarFuncionario(request.body.cpf)
            reply.status(200).send({message:`Funcionário ${request.body.cpf} desativado com sucesso`});
            
        }catch(error){
            reply.status(500).send({
                message: 'Erro ao desativar funcionário',
                error: error instanceof Error ? error.message : 'Erro desconhecido'
            })
        }
    })
    
}
