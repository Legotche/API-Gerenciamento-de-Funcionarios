import { FuncionarioRepository } from "../repositories/funcionarioRepository";

export const baterPonto = async (cpf:string)=>{

    let funcionarioRepository = new FuncionarioRepository();
    funcionarioRepository.inserirEntradaESaida(cpf, new Date());
}