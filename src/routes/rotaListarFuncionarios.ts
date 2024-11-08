import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { listarFuncionarios } from "../functions/listarFuncionarios";
import { schemaCpf, schemaCpf2 } from "../middlewares/schemaCpf";


export const rotaListarFuncionarios:FastifyPluginAsyncZod= async(app)=>{
        
    app.get('/listarFuncionarios',async ()=>{
        try{
            
            const f= await listarFuncionarios()
            console.log("Funcionarios listados");
            return f

        }catch(error){
            throw new Error("Nao foi possivel listar os funcionarios");
        }
        
    })
    
}