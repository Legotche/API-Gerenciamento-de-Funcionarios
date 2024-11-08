import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { schemaCpf } from '../middlewares/schemaCpf';
import { desativarFuncionario } from '../functions/desativarFuncionario';



export const rotaDesativarFuncionario:FastifyPluginAsyncZod = async function(app){

    app.put('/desativarFuncionario',{schema:schemaCpf},async (request)=>{
        try{
            await desativarFuncionario(request.body.cpf)
            console.log(`${request.body.cpf} foi desativado`);
        }catch(error){
            throw new Error("Nao foi possivel desativar o funcionario");
        }
    })
    
}
