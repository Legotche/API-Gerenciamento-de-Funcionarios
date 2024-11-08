
export class Cargo {
    private _nome: string;
    private _salario: number;


    constructor(
        nome: string,
        salario: number
    ) {
        this._nome = nome;
        this._salario = salario;
    }

    get nome(): string {
        return this._nome;
    }

    set nome(value: string) {
        this._nome = value;
    }


    get salario(): number {
        return this._salario;
    }

    set salario(value: number) {
        this._salario = value;
    }

}
