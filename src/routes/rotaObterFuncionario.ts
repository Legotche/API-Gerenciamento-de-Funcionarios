import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { schemaCpf, schemaCpf2 } from "../middlewares/schemaCpf";
import { obterFuncionario } from "../functions/obterFuncionario";

export const rotaObterFuncionario:FastifyPluginAsyncZod= async (app)=>{
    app.get('/obterFuncionario',{schema:schemaCpf2},async (request)=>{
       try{
            const f= await obterFuncionario(request.query.cpf)
            console.log("Funcionario obtido");
            return f
            
       } catch(error){
            throw new Error("Nao foi possivel obter o funcionario");
       }
    })
}