# Trabalho de POO

## Introdução

1. Para inicializar o projeto, na pasta principal do projeto, crie o arquivo `.env` com as variaveis de ambiente monstradas abaixo, subtituindo as informações pelas de seu banco de dados.

```
URL_BANCO_DE_DADOS = "mysql://root:dani1234@localhost:3306/testedrizzle"
SENHA_BANCO_DE_DADOS = "dani1234"
PORTA_BANCO_DE_DADOS = 3306
HOSPEDEIRO_BANCO_DE_DADOS = "localhost"
USUARIO_BANCO_DE_DADOS = "root"
NOME_BANCO_DE_DADOS = "testedrizzle"
```

2. Execute `npm i` para instalar as dependencias.

3. Em um terminal execute `npm run App` para iniciar o servidor na porta 3000.


## Regras de Negócio

1. Somente um funcionario ativo pode bater ponto;
2. Somente um funcionario ativo pode receber;
3. Somente funcionarios existentes podem ser deletados, desativados, listados, receber ou trocar de telefone;

## Rotas

### POST `/criarFuncionario`
Cria um funcionário e armazena no banco de dados. Recebe no corpo da requisição um objeto como o abaixo:
```json
{
    "nome":"Pedro",
    "cpf":"188.888.888-78",
    "dataDeNascimento":"2024-04-06" ,
    "telefone": "65999999999",
    "dataDeContratacao": "2024-04-05" ,
    "cargo": {
        "nome": "desenvolvedor",
        "salario": 2000
    },
    "entradasESaidas": [],
    "recebimentos": [],
    "ativo":true
}
```

### DELETE `/deletarFuncionario`
Deleta o funcionario com o cpf passado caso já exista no banco. Recebe no corpo da requisição um objeto como o abaixo:
```json
{
  "cpf":"188.888.888-78"
}
```

### GET `/listarFuncionarios` 
Retorna um vetor com todos os funcionarios. Não necessita de parâmetros.


### GET `/obterFuncionario`
Retorna o funcionario, caso possua o cpf. Recebe em seus parâmetros em sua query, como no formato mostrado abaixo:
```json
{
  "cpf":"188.888.888-78"
}
```

### POST `/baterPonto`
Adiciona um registro do momento em que o funcionario bateu ponto. Recebe no corpo da requisição um objeto como o abaixo:
```json
{
  "cpf":"188.888.888-78"
}
```

### POST `/marcarRecebimento`
Adiciona um recebimento ao a um funcionario existente. Recebe no corpo da requisição um objeto como o abaixo:
```json
{
  "cpf":"188.888.888-78"
}
```

### PUT `/trocarTelefone`
Troca o telefone de um funcionario cadastrado no banco de dados. O telefone válido deve ter 11 digitos. Recebe no corpo da requisição um objeto como o abaixo:
```json
{
  "cpf":"118.111.181-91",
  "telefone":"88888888888"
}
```

