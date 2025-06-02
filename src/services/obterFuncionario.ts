import { FuncionarioRepository } from "../repositories/funcionarioRepository";


export const obterFuncionario = async (cpf: string) => {

    let functionarioRepository = new FuncionarioRepository();
    return await functionarioRepository.buscarFuncionario(cpf)

}