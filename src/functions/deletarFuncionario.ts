import { eq } from "drizzle-orm";
import { db } from "../database";
import { entradasESaidas, funcionarios, cargos, recebimentos} from "../database/tables";


export const deletarFuncionario = async (cpf:string)=>{
    await db.delete(entradasESaidas).where(eq(entradasESaidas.funcionario_cpf,cpf))
    await db.delete(recebimentos).where(eq(recebimentos.funcionario_cpf,cpf))
    await db.delete(cargos).where(eq(cargos.funcionario_cpf,cpf))
    await db.delete(funcionarios).where(eq(funcionarios.cpf,cpf))
}