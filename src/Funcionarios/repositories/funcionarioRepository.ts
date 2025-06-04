import { Funcionario } from "../entities/Funcionario";
import { eq } from "drizzle-orm";
import { db } from "../../database";
import { cargo, entradasESaidas, funcionarios, recebimentos } from "../../database/tables";
import { Cargo } from "../entities/Cargo";

export interface IFuncionarioRepository {
    inserirPagamento(cpf: string, data: Date): Promise<void>;
    inserirEntradaESaida(cpf: string, data: Date): Promise<void>;
    alterarFuncionario(funcionario: Funcionario): Promise<void>;
    deletarFuncionario(cpf: string): Promise<void>;
    salvarFuncionario(funcionario: Funcionario): Promise<void>;
    buscarFuncionario(cpf?: string): Promise<Funcionario[]>;
}

export class FuncionarioRepository implements IFuncionarioRepository {

    /**
     * Método para inserir um pagamento de um funcionário no banco de dados.
     * @param funcionario - Objeto Funcionario que contém o CPF do funcionário.
     * @param data - Data do pagamento.
     * @returns Promise<void> - Retorna uma promessa que resolve quando o pagamento for inserido.
     */
    public async inserirPagamento(cpf: string, data: Date): Promise<void> {
        db.insert(recebimentos).values({
            funcionario_cpf: cpf,
            data: data
        });
    }

    /**
     * Método para inserir uma entrada e saída de um funcionário no banco de dados.
     * @param funcionario - Objeto Funcionario que contém o CPF do funcionário.
     * @param data - Data da entrada ou saída.
     * @returns Promise<void> - Retorna uma promessa que resolve quando a entrada e saída for inserida.
     */
    public async inserirEntradaESaida(cpf: string, data: Date): Promise<void> {
        db.insert(entradasESaidas).values({
            funcionario_cpf: cpf,
            data: data
        });
    }

    /**
     * Método para alterar as informações de um funcionário no banco de dados.
     * @param funcionario - Objeto Funcionario com as informações atualizadas.
     * @returns Promise<void> - Retorna uma promessa que resolve quando as informações forem alteradas.
     */
    public async alterarFuncionario(funcionario: Funcionario): Promise<void> {
        db.transaction(async (tx) => {
            tx.update(funcionarios).set({
                nome: funcionario.nome,
                dataDeNascimento: funcionario.dataDeNascimento,
                telefone: funcionario.telefone,
                dataDeContratacao: funcionario.dataDeContratacao,
                ativo: funcionario.ativo
            }).where(eq(funcionarios.cpf, funcionario.cpf));

            tx.update(cargo).set({
                nome: funcionario.cargo.nome,
                salario: funcionario.cargo.salario
            }).where(eq(cargo.funcionario_cpf, funcionario.cpf));

            // Deletar entradas e saídas antigas
            tx.delete(entradasESaidas).where(eq(entradasESaidas.funcionario_cpf, funcionario.cpf));
            // Inserir novas entradas e saídas
            funcionario.entradasESaidas.forEach(data => {
                tx.insert(entradasESaidas).values({
                    funcionario_cpf: funcionario.cpf,
                    data: data
                });
            });

            // Deletar recebimentos antigos
            tx.delete(recebimentos).where(eq(recebimentos.funcionario_cpf, funcionario.cpf));
            // Inserir novos recebimentos
            funcionario.recebimentos.forEach(data => {
                tx.insert(recebimentos).values({
                    funcionario_cpf: funcionario.cpf,
                    data: data
                });
            });
        }).catch((error) => {
            return Promise.reject(new Error("Erro ao alterar funcionário: " + error.message));
        });
    }

    /**
     * Método para deletar um funcionário do banco de dados.
     * @param cpf - CPF do funcionário a ser deletado.
     * @returns Promise<void> - Retorna uma promessa que resolve quando o funcionário for deletado.
     */
    public async deletarFuncionario(cpf: string): Promise<void> {
        try {
            await db.transaction(async (tx) => {
                await tx.delete(entradasESaidas).where(eq(entradasESaidas.funcionario_cpf, cpf))
                await tx.delete(recebimentos).where(eq(recebimentos.funcionario_cpf, cpf));
                await tx.delete(cargo).where(eq(cargo.funcionario_cpf, cpf));
                const a = await tx.delete(funcionarios).where(eq(funcionarios.cpf, cpf));
                
                if (a[0].affectedRows !== 1){
                    throw new Error(`Algo deu errado, ${a[0].affectedRows} colunas foram afetadas.`)
                }
                
            });
        } catch (error) {
            throw new Error("Erro ao deletar funcionário: " + (error instanceof Error ? error.message : String(error)));
        }

    }

    /**
     * Método para salvar um funcionário no banco de dados.
     * @param funcionario - Objeto Funcionario a ser salvo.
     * @returns Promise<void> - Retorna uma promessa que resolve quando o funcionário for salvo.
     */
    public async salvarFuncionario(funcionario: Funcionario): Promise<void> {

        await db.transaction(async (tx) => {
            await tx.insert(funcionarios).values({
                nome: funcionario.nome,
                dataDeNascimento: funcionario.dataDeNascimento,
                cpf: funcionario.cpf,
                telefone: funcionario.telefone,
                dataDeContratacao: funcionario.dataDeContratacao,
                ativo: funcionario.ativo
            })
            await tx.insert(cargo).values({
                funcionario_cpf: funcionario.cpf,
                nome: funcionario.cargo.nome,
                salario: funcionario.cargo.salario
            })
            for (const data of funcionario.entradasESaidas) {
                await tx.insert(entradasESaidas).values({
                    funcionario_cpf: funcionario.cpf,
                    data: data
                });
            }
            for (const data of funcionario.recebimentos) {
                await tx.insert(recebimentos).values({
                    funcionario_cpf: funcionario.cpf,
                    data: data
                });
            }
        })
    }



    /**
     * Método para buscar um funcionário pelo CPF.
     * @param cpf - CPF do funcionário a ser buscado.
     * @returns Promise<Funcionario> - Retorna uma promessa que resolve para um objeto Funcionario.
     */
    public async buscarFuncionario(cpf?: string): Promise<Funcionario[]> {

        let linhasFuncionario = cpf ?
            await db.select().from(funcionarios).where(eq(funcionarios.cpf, cpf)).innerJoin(cargo, eq(cargo.funcionario_cpf, funcionarios.cpf))
            :
            await db.select().from(funcionarios).innerJoin(cargo, eq(cargo.funcionario_cpf, funcionarios.cpf))

        return await Promise.all(linhasFuncionario.map(async (linhaFuncionario: typeof linhasFuncionario[0]) => {
            let linhasEntradasESaidas = await db.select().from(entradasESaidas).where(eq(entradasESaidas.funcionario_cpf, linhaFuncionario.funcionarios.cpf));
            let linhasRecebimentos = await db.select().from(recebimentos).where(eq(recebimentos.funcionario_cpf, linhaFuncionario.funcionarios.cpf));

            return new Funcionario(
                linhaFuncionario.funcionarios.nome,
                linhaFuncionario.funcionarios.dataDeNascimento,
                linhaFuncionario.funcionarios.cpf,
                linhaFuncionario.funcionarios.telefone,
                linhaFuncionario.funcionarios.dataDeContratacao,
                new Cargo(linhaFuncionario.cargos.nome, linhaFuncionario.cargos.salario),
                linhasEntradasESaidas.map(es => es.data),
                linhasRecebimentos.map(rec => rec.data),
                linhaFuncionario.funcionarios.ativo
            );
        }));
    }
}