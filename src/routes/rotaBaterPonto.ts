import { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { schemaCpf } from "../middlewares/schemaCpf"
import { baterPonto } from "../functions/baterPonto"

export const rotaBaterPonto:FastifyPluginAsyncZod = async function(app){
    
    app.post('/baterPonto',{schema: schemaCpf},async (request)=>{
        try{
            await baterPonto(request.body.cpf)
            console.log(`${request.body.cpf} bateu o ponto`);
            
        }catch(error){
            throw new Error("Não foi possível bater o ponto");
            
        }
    })

}