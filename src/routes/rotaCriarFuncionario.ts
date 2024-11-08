import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { salvarFuncionario } from '../functions/salvarFuncionario';
import { Funcionario } from '../entities/Funcionario';
import { Cargo } from '../entities/Cargo';
import { schemaFuncionario } from '../middlewares/schemaFuncionario';



export const rotaCriarFuncionario:FastifyPluginAsyncZod = async function(app){

    app.post('/criarFuncionario',{schema:schemaFuncionario},async (request)=>{
        try{
            const entradasESaidas = request.body.entradasESaidas.map(data => new Date(data))
            const recebimentos = request.body.recebimentos.map(data => new Date(data))
            const cargo = new Cargo(request.body.cargo.nome, request.body.cargo.salario)
            const funcionario = new Funcionario(request.body.nome, new Date(request.body.dataDeNascimento), request.body.cpf, request.body.telefone, new Date(request.body.dataDeContratacao), cargo, entradasESaidas, recebimentos, request.body.ativo)

            await salvarFuncionario(funcionario)
            console.log(`Cadastro do funcionario ${request.body.nome} foi criado`);

        }catch(error){
        throw new Error("Não foi possível criar o funcionário");
        }
    })
    
}
