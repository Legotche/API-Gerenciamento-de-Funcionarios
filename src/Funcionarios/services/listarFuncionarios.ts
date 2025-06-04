import { FuncionarioRepository } from "../repositories/funcionarioRepository";


export const listarFuncionarios = async ()=>{
    const funcionarioRepository = new FuncionarioRepository();
    return await funcionarioRepository.buscarFuncionario();

}