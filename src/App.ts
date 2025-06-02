import { fastify } from 'fastify'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { ZodTypeProvider, jsonSchemaTransform, serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod'
import { rotaCriarFuncionario } from './controllers/rotaCriarFuncionario';
import { rotaDeletarFuncionario } from './controllers/rotaDeletarFuncionario';
import { rotaListarFuncionarios } from './controllers/rotaListarFuncionarios';
import { rotaBaterPonto } from './controllers/rotaBaterPonto';
import { rotaMarcarRecebimento } from './controllers/rotaMarcarRecebimento';
import { rotaObterFuncionario } from './controllers/rotaObterFuncionario';
import { rotaAlterarFuncionario } from './controllers/rotaAtualizarFuncionario';
import { z } from 'zod';
import { rotaDesativarFuncionario } from './controllers/rotaDesativarFuncionario';


const app = fastify().withTypeProvider<ZodTypeProvider>()
app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

// Swagger só disponível em desenvolvimento

app.register(fastifySwagger, {
    openapi: {
        info: {
            title: 'API Gerenciamento de Funcionários',
            description: 'Documentação da API',
            version: '1.0.0',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
    },
    transform: jsonSchemaTransform
});


app.register(fastifySwaggerUi,
    {
        routePrefix: '/docs',
    }
)

app.after(()=>{

    app.register(rotaObterFuncionario)      // /obterFuncionario
    app.register(rotaCriarFuncionario)      // /criarFuncionario
    app.register(rotaDeletarFuncionario)    //  /deletarFuncionario
    app.register(rotaDesativarFuncionario)  // /desativarFuncionario
    app.register(rotaListarFuncionarios)    // /listarFuncionarios
    app.register(rotaBaterPonto)            // /baterPonto
    app.register(rotaMarcarRecebimento)     // /marcarRecebimento
    app.register(rotaAlterarFuncionario)    // /alterarFuncionario
    
})




app.listen({ port: 3000 }, () => { console.log("Servidor rodando na porta 3000") })