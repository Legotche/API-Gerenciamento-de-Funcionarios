export class Pessoa{
    private _nome:string
    private _dataDeNascimento:Date
    private _cpf:string
    private _telefone:string
    
    constructor(nome:string, dataDeNascimento:Date, cpf:string, telefone:string){
        
        this.validarTelefone(telefone)
        this.validarCPF(cpf)

        this._nome = nome
        this._dataDeNascimento = dataDeNascimento
        this._cpf = cpf
        this._telefone = telefone
    }
    
    get nome():string{
        return this._nome
    }
    
    set nome(nome:string){
        this._nome = nome
    }
    
    get dataDeNascimento():Date{
        return this._dataDeNascimento
    }
    
    set dataDeNascimento(dataDeNascimento:Date){
        this._dataDeNascimento = dataDeNascimento
    }
    
    get cpf():string{
        return this._cpf
    }
    
    set cpf(cpf:string){
        this._cpf = cpf
    }
    
    get telefone():string{
        return this._telefone
    }
    
    set telefone(telefone:string){
        this._telefone = telefone
    }
    private validarTelefone(telefone: string) {

        if(telefone.length !== 11){
            throw new Error('Telefone inválido')
        };
    }

    private validarCPF(cpf: string) {
        const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/; 

       if(!cpfRegex.test(cpf)){
            throw new Error('CPF inválido')
        };
    }

    static validarCPF(cpf: string) {
        this.validarCPF(cpf)
    }
    static validarTelefone(telefone: string) {
        this.validarTelefone(telefone)
    }
    
}