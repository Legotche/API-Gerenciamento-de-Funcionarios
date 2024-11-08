import { db } from "../database";
import { entradasESaidas, funcionarios } from "../database/tables";
import { obterFuncionario } from "./obterFuncionario";

export const baterPonto = async (cpf:string)=>{

    const f = await obterFuncionario(cpf)

    if(!f[0].ativo){
        throw new Error("Funcionario inativo")
    }

    await db.insert(entradasESaidas).values({funcionario_cpf: cpf, data: new Date().toISOString()})
}