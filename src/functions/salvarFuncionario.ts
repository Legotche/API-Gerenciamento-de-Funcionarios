import { db } from "../database"
import { funcionarios, cargos, recebimentos, entradasESaidas} from "../database/tables"
import { Funcionario } from "../entities/Funcionario"


export const salvarFuncionario = async (f:Funcionario)=>{
    
    await db.transaction(async (tx) => {
        await tx.insert(funcionarios).values({
            nome: f.nome,
            dataDeNascimento: f.dataDeNascimento.toISOString(),
            cpf: f.cpf,
            telefone: f.telefone,
            dataDeContratacao: f.dataDeContratacao.toISOString(),
            ativo: f.ativo
        });

        await tx.insert(cargos).values({
            nome: f.cargo.nome,
            funcionario_cpf: f.cpf, 
            salario: f.cargo.salario,
        });

        for (const e of f.entradasESaidas) {
            await tx.insert(entradasESaidas).values({
                funcionario_cpf: f.cpf, 
                data: e.toISOString(),
            });
        }

        for (const r of f.recebimentos) {
            await tx.insert(recebimentos).values({
                funcionario_cpf: f.cpf, 
                data: r.toISOString(),
            });
        }
    });

    

}