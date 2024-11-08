import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { schemaTrocarTelefone } from "../middlewares/schemaTrocarTelefone";
import { trocarTelefone } from "../functions/trocarTelefone";


export const rotaTrocarTelefone:FastifyPluginAsyncZod= async (app)=>{
    app.put('/trocarTelefone',{schema:schemaTrocarTelefone},async (request)=>{
        try {
            await trocarTelefone(request.body.cpf, request.body.telefone)
            console.log("Telefone trocado");
        } catch (error) {
            throw new Error("Não foi possível trocar o telefone");
        }
    })
}