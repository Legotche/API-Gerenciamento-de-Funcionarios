import { Funcionario } from "../entities/Funcionario"
import { FuncionarioRepository } from "../repositories/funcionarioRepository";


export const salvarFuncionario = async (f: Funcionario) => {

    let funcionarioRepository = new FuncionarioRepository();
    await funcionarioRepository.salvarFuncionario(f)


}