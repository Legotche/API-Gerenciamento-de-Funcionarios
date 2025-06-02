import { Funcionario } from "../entities/Funcionario";
import { eq } from "drizzle-orm";
import { db } from "../database";
import { cargo, entradasESaidas, funcionarios, recebimentos } from "../database/tables";
import { Cargo } from "../entities/Cargo";

export interface IFuncionarioRepository {
    inserirPagamento(cpf:string, data: Date): Promise<void>;
    inserirEntradaESaida(cpf:string, data: Date): Promise<void>;
    alterarFuncionario(funcionario: Funcionario): Promise<void>;
    deletarFuncionario(cpf:string): Promise<void>;
    salvarFuncionario(funcionario: Funcionario): Promise<void>;
    buscarFuncionario(cpf?: string): Promise<Funcionario[]>;
}

/**
 * Repositório responsável por gerenciar operações de persistência relacionadas ao funcionário,
 * incluindo inserção, atualização, deleção e consulta de dados de funcionários, cargos, entradas/saídas e recebimentos.
 * 
 * Métodos:
 * 
 * @method inserirPagamento
 * Insere um registro de pagamento para um funcionário no banco de dados.
 * @param cpf - CPF do funcionário.
 * @param data - Data do pagamento.
 * @returns Promise<void> - Promessa resolvida quando o pagamento for inserido.
 * 
 * @method inserirEntradaESaida
 * Insere um registro de entrada ou saída para um funcionário no banco de dados.
 * @param cpf - CPF do funcionário.
 * @param data - Data da entrada ou saída.
 * @returns Promise<void> - Promessa resolvida quando a entrada/saída for inserida.
 * 
 * @method alterarFuncionario
 * Altera as informações de um funcionário existente, incluindo dados pessoais, cargo, entradas/saídas e recebimentos.
 * @param funcionario - Objeto Funcionario com as informações atualizadas.
 * @returns Promise<void> - Promessa resolvida quando as informações forem alteradas.
 * 
 * @method deletarFuncionario
 * Remove um funcionário e todos os seus dados relacionados do banco de dados.
 * @param cpf - CPF do funcionário a ser deletado.
 * @returns Promise<void> - Promessa resolvida quando o funcionário for removido.
 * 
 * @method salvarFuncionario
 * Salva um novo funcionário no banco de dados, incluindo dados pessoais, cargo, entradas/saídas e recebimentos.
 * @param funcionario - Objeto Funcionario a ser salvo.
 * @returns Promise<void> - Promessa resolvida quando o funcionário for salvo.
 * 
 * @method buscarFuncionario
 * Busca e retorna um funcionário pelo CPF, incluindo suas informações, cargo, entradas/saídas e recebimentos.
 * @param cpf - CPF do funcionário a ser buscado.
 * @returns Promise<Funcionario> - Promessa resolvida com o objeto Funcionario encontrado.
 * @throws Error - Caso o funcionário não seja encontrado.
 */
export class FuncionarioRepository implements IFuncionarioRepository {

    /**
     * Método para inserir um pagamento de um funcionário no banco de dados.
     * @param funcionario - Objeto Funcionario que contém o CPF do funcionário.
     * @param data - Data do pagamento.
     * @returns Promise<void> - Retorna uma promessa que resolve quando o pagamento for inserido.
     */
    public async inserirPagamento(cpf:string, data: Date): Promise<void> {
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
    public async inserirEntradaESaida(cpf:string, data: Date): Promise<void> {
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
        });
    }

    /**
     * Método para deletar um funcionário do banco de dados.
     * @param cpf - CPF do funcionário a ser deletado.
     * @returns Promise<void> - Retorna uma promessa que resolve quando o funcionário for deletado.
     */
    public async deletarFuncionario(cpf:string): Promise<void> {

        db.transaction(async (tx) => {
            tx.delete(entradasESaidas).where(eq(entradasESaidas.funcionario_cpf, cpf));
            tx.delete(recebimentos).where(eq(recebimentos.funcionario_cpf, cpf));
            tx.delete(cargo).where(eq(cargo.funcionario_cpf, cpf));
            tx.delete(funcionarios).where(eq(funcionarios.cpf, cpf));
        });
    }
    
    /**
     * Método para salvar um funcionário no banco de dados.
     * @param funcionario - Objeto Funcionario a ser salvo.
     * @returns Promise<void> - Retorna uma promessa que resolve quando o funcionário for salvo.
     */
    public async salvarFuncionario(funcionario: Funcionario): Promise<void> {
        db.transaction(async (tx) => {
            tx.insert(funcionarios).values({
                nome: funcionario.nome,
                dataDeNascimento: funcionario.dataDeNascimento,
                cpf: funcionario.cpf,
                telefone: funcionario.telefone,
                dataDeContratacao: funcionario.dataDeContratacao,
                ativo: funcionario.ativo
            })
            tx.insert(cargo).values({
                funcionario_cpf: funcionario.cpf,
                nome: funcionario.cargo.nome,
                salario: funcionario.cargo.salario
            })
            funcionario.entradasESaidas.forEach(data => {
                tx.insert(entradasESaidas).values({
                    funcionario_cpf: funcionario.cpf,
                    data: data
                })
            })
            funcionario.recebimentos.forEach(data => {
                tx.insert(recebimentos).values({
                    funcionario_cpf: funcionario.cpf,
                    data: data
                })
            })
        })
    }



    /**
     * Método para buscar um funcionário pelo CPF.
     * @param cpf - CPF do funcionário a ser buscado.
     * @returns Promise<Funcionario> - Retorna uma promessa que resolve para um objeto Funcionario.
     */
    public async buscarFuncionario(cpf?:string): Promise<Funcionario[]> {
        

        let linhasFuncionario = cpf ? 
            await db.select().from(funcionarios).where(eq(funcionarios.cpf,cpf)).innerJoin(cargo, eq(cargo.funcionario_cpf, funcionarios.cpf))
            :
            await db.select().from(funcionarios).innerJoin(cargo, eq(cargo.funcionario_cpf, funcionarios.cpf))

        
        if(linhasFuncionario.length === 0 && cpf) {
            return Promise.reject(new Error("Funcionário não encontrado"));
        }

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