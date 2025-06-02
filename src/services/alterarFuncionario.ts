import { FuncionarioRepository } from "../repositories/funcionarioRepository"
import { Funcionario } from "../entities/Funcionario"


export const alterarFuncionario = async (cpf:string,alvo:{[key:string]:any})=>{
    
    let funcionarioRepository = new FuncionarioRepository();
    let original = await funcionarioRepository.buscarFuncionario(cpf)

    const chave = Object.keys(alvo)[0]
    
    if (original[0] && Object.prototype.hasOwnProperty.call(original[0], chave)) {
        (original[0] as any)[chave] = alvo[chave];
    }
    
    await funcionarioRepository.alterarFuncionario(original[0])
}