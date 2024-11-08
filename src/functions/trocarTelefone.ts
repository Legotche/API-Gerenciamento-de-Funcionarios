import { eq } from "drizzle-orm"
import { funcionarios } from "../database/tables"
import { db } from "../database"


export const trocarTelefone = async (cpf:string, telefone:string)=>{

    await db.update(funcionarios).set({ telefone: telefone }).where(eq(funcionarios.cpf, cpf))
}