import { db } from "../database";
import { recebimentos } from "../database/tables";
import { obterFuncionario } from "./obterFuncionario";


export const marcarRecebimento = async (cpf:string)=>{
    
    const f = await obterFuncionario(cpf)

    if(!f[0].ativo){
        throw new Error("Funcionario inativo")
    }

    await db.insert(recebimentos).values({funcionario_cpf: cpf, data: new Date().toISOString()})
    

}