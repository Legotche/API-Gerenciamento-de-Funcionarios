import { FuncionarioRepository } from "../repositories/funcionarioRepository";

export const deletarFuncionario = async (cpf: string) => {
    let funcionarioRepository = new FuncionarioRepository();
    await funcionarioRepository.deletarFuncionario(cpf);
}