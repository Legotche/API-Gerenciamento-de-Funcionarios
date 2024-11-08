import { FastifyPluginAsyncZod } from "fastify-type-provider-zod"
import { schemaCpf } from "../middlewares/schemaCpf"
import { marcarRecebimento } from "../functions/marcarRecebimento"

export const rotaMarcarRecebimento:FastifyPluginAsyncZod = async function(app){
    
    app.post('/marcarRecebimento',{schema:schemaCpf},async (request)=>{
        try{
            await marcarRecebimento(request.body.cpf)
            console.log(`${request.body.cpf} recebeu seu pagamento!`)    
        } catch(error){
            throw new Error("Não foi possível marcar o pagamento")
        }
        
    })

}