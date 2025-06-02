import { FuncionarioRepository } from "../repositories/funcionarioRepository";

export const deletarFuncionario = async (cpf: string) => {
    let funcionarioRepository = new FuncionarioRepository();
    funcionarioRepository.deletarFuncionario(cpf);
}