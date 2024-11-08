import { eq } from "drizzle-orm"
import { db } from "../database"
import { funcionarios } from "../database/tables"


export const desativarFuncionario = async (cpf:string)=>{
    await db.update(funcionarios).set({ativo: false}).where(eq(funcionarios.cpf, cpf))
}