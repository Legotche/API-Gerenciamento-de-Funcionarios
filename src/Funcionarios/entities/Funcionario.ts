import { Cargo } from "./Cargo";
import { Pessoa } from "./Pessoa";


export class Funcionario extends Pessoa {
    private _dataDeContratacao: Date;
    private _cargo: Cargo;
    private _entradasESaidas: Date[];
    private _recebimentos: Date[];
    private _ativo: boolean;

    constructor(nome: string, dataDeNascimento: Date, cpf: string, telefone: string, dataDeContratacao: Date, cargo: Cargo, entradasESaidas: Date[], recebimentos: Date[], ativo: boolean) {
        super(nome, dataDeNascimento, cpf, telefone);
        this._dataDeContratacao = dataDeContratacao;
        this._entradasESaidas = entradasESaidas;
        this._recebimentos = recebimentos;
        this._cargo = cargo;
        this._ativo = ativo;
    }


    get dataDeContratacao(): Date {
        return this._dataDeContratacao;
    }

    set dataDeContratacao(dataDeContratacao: Date) {
        this._dataDeContratacao = dataDeContratacao;
    }

    get cargo(): Cargo {
        return this._cargo;
    }

    set cargo(cargo: Cargo) {
        this._cargo = cargo;
    }

    get entradasESaidas(): Date[] {
        return this._entradasESaidas;
    }

    set entradasESaidas(entradasESaidas: Date[]) {
        this._entradasESaidas = entradasESaidas;
    }

    get recebimentos(): Date[] {
        return this._recebimentos;
    }

    set recebimentos(recebimentos: Date[]) {
        this._recebimentos = recebimentos;
    }

    get ativo(): boolean {
        return this._ativo;
    }

    set ativo(ativo: boolean) {
        this._ativo = ativo;
    }

    adicionarEntradaESaida(data: Date): void {
        this._entradasESaidas.push(data);
    }

    removerEntradaESaida(data: Date): void {
        this._entradasESaidas = this._entradasESaidas.filter(date => !date.toDateString().includes(data.toDateString()));
    }

    adicionarRecebimento(data: Date): void {
        this._recebimentos.push(data);
    }

    removerRecebimento(data: Date): void {
        this._recebimentos = this._recebimentos.filter(date => !date.toDateString().includes(data.toDateString()));
    }

    toJSON() {
        return {
            nome: this.nome,
            dataDeNascimento: this.dataDeNascimento,
            cpf: this.cpf,
            telefone: this.telefone,
            dataDeContratacao: this.dataDeContratacao,
            cargo: {
                nome: this.cargo.nome,
                salario: this.cargo.salario
            },
            entradasESaidas: this.entradasESaidas,
            recebimentos: this.recebimentos,
            ativo: this.ativo
        };
    }
}