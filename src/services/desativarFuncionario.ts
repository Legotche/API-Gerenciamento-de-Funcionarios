import { FuncionarioRepository } from "../repositories/funcionarioRepository";


export const desativarFuncionario = async (cpf: string) => {
    let funcionarioRepository = new FuncionarioRepository();
    let f = await funcionarioRepository.buscarFuncionario(cpf);
    f[0].ativo = !f[0].ativo
    funcionarioRepository.alterarFuncionario(f[0]);
}