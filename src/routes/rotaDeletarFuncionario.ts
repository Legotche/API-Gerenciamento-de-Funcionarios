import { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { deletarFuncionario } from "../functions/deletarFuncionario"
import { schemaCpf } from "../middlewares/schemaCpf"

export const rotaDeletarFuncionario:FastifyPluginAsyncZod = async function(app){
    
    app.delete('/deletarFuncionario',{schema:schemaCpf},async (request)=>{
        
        try{
            await deletarFuncionario(request.body.cpf)
            console.log(`${request.body.cpf} deletado`)
        }catch(error){
            throw new Error("Não foi possível deletar o funcionário");
        }
        

    })

}