import { eq } from "drizzle-orm";
import { db } from "../database";
import { cargos, entradasESaidas, funcionarios, recebimentos } from "../database/tables";
import { Funcionario } from "../entities/Funcionario";
import { Cargo } from "../entities/Cargo";

export const obterFuncionario = async (cpf:string)=>{
    let dados= await db.select().from(funcionarios).where(eq(funcionarios.cpf,cpf))
    .innerJoin(cargos, eq(cargos.funcionario_cpf, funcionarios.cpf))
    
    let dados2= await db.select().from(entradasESaidas).where(eq(entradasESaidas.funcionario_cpf,cpf))
    let dados3= await db.select().from(recebimentos).where(eq(recebimentos.funcionario_cpf,cpf))

    let funcionariosFormatados:Funcionario[]=[];
    
    dados.forEach((f)=>{
        let recebimentos: Date[]=[];
        let entradasESaidas: Date[]=[];
        let dataDeNascimento = new Date(f.funcionarios.dataDeNascimento);
        let dataDeContratacao = new Date(f.funcionarios.dataDeContratacao);
        let cargo = new Cargo(f.cargo.nome , f.cargo.salario);

        dados2.forEach((e)=>{
            if(e.funcionario_cpf == f.funcionarios.cpf){
                entradasESaidas.push(new Date(e.data))
            }
        })
        dados3.forEach((e)=>{
            if(e.funcionario_cpf == f.funcionarios.cpf){
                recebimentos.push(new Date(e.data))
            }
        })

        let funcionario = new Funcionario(f.funcionarios.nome, dataDeNascimento, f.funcionarios.cpf, f.funcionarios.telefone, dataDeContratacao, cargo, entradasESaidas, recebimentos,f.funcionarios.ativo);
        funcionariosFormatados.push(funcionario)
    })

    return funcionariosFormatados
    

}