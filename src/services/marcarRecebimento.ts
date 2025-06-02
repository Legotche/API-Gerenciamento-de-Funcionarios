import { FuncionarioRepository } from "../repositories/funcionarioRepository";



export const marcarRecebimento = async (cpf:string)=>{

    let funcionarioRepository = new FuncionarioRepository();
    funcionarioRepository.inserirPagamento(cpf, new Date());
}