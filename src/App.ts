import jwt from '@fastify/jwt';
import { fastifySwagger } from '@fastify/swagger';
import { fastifySwaggerUi } from '@fastify/swagger-ui';
import { FastifyInstance, FastifyReply, FastifyRequest, fastify } from 'fastify';
import { ZodTypeProvider, jsonSchemaTransform, serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { rotaAlterarFuncionario } from './Funcionarios/controllers/rotaAtualizarFuncionario';
import { rotaBaterPonto } from './Funcionarios/controllers/rotaBaterPonto';
import { rotaCriarFuncionario } from './Funcionarios/controllers/rotaCriarFuncionario';
import { rotaDeletarFuncionario } from './Funcionarios/controllers/rotaDeletarFuncionario';
import { rotaDesativarFuncionario } from './Funcionarios/controllers/rotaDesativarFuncionario';
import { rotaListarFuncionarios } from './Funcionarios/controllers/rotaListarFuncionarios';
import { rotaMarcarRecebimento } from './Funcionarios/controllers/rotaMarcarRecebimento';
import { rotaObterFuncionario } from './Funcionarios/controllers/rotaObterFuncionario';
import { JWT_SECRET } from './Funcionarios/schemas/dotenv';

declare module 'fastify' {
    interface FastifyInstance {
        authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    }
}

export const app = fastify().withTypeProvider<ZodTypeProvider>()
app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

// JWT
app.register(jwt, { secret: JWT_SECRET })

app.decorate('authenticate', async (request, reply) => {
    try {
        await request.jwtVerify();
    } catch (err) {
        reply.status(401).send({
            message: 'Token inválido ou expirado',
            error: err instanceof Error ? err.message : 'Erro desconhecido'
        });
    }
})
let lista: string[] = []

// Swagger só disponível em desenvolvimento

app.register(fastifySwagger, {
    openapi: {
        info: {
            title: 'API Gerenciamento de Funcionários',
            description: 'Documentação da API',
            version: '1.0.0',
        },
        servers: [{ url: 'http://localhost:3000', },],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        },
    },
    transform: jsonSchemaTransform
});


app.register(fastifySwaggerUi, { routePrefix: '/docs', })

app.after(() => {

    app.register(rotaBaterPonto)            // /baterPonto
    app.register(rotaMarcarRecebimento)     // /marcarRecebimento
    app.register(rotaCriarFuncionario)      // /criarFuncionario
    app.register(rotaObterFuncionario)      // /obterFuncionario
    app.register(rotaListarFuncionarios)    // /listarFuncionarios
    app.register(rotaDesativarFuncionario)  // /desativarFuncionario
    app.register(rotaAlterarFuncionario)    // /alterarFuncionario
    app.register(rotaDeletarFuncionario)    //  /deletarFuncionario


    app.post('/login', { schema: { body: z.object({ username: z.string(), password: z.string() }) } }, async (request, reply) => {
        const { username, password } = request.body;

        if (!lista.includes(username)) {
            return reply.status(401).send({ message: 'Usuário não encontrado' });
        }

        const token = app.jwt.sign({ username }, { expiresIn: '15m' });
        reply.status(200).send({ messagem: 'Sucesso', token: token })
    });

    app.post('/register', { schema: { body: z.object({ username: z.string(), password: z.string() }) } }, async (request, reply) => {
        const { username, password } = request.body;
        if (lista.find(item => item === username)) {
            return reply.status(400).send({ message: 'Usuário já existe' });
        }
        lista.push(username);
        reply.status(201).send({ message: 'Usuário registrado com sucesso' });
    })

    app.get('/todos', { preHandler: [app.authenticate], schema: { security: [{ BearerAuth: [] }] } }, async (request, reply) => {
        // Aqui você pode retornar uma lista de todos os usuários registrados
        reply.status(200).send({ users: lista });
    })
})




app.listen({ port: 3000 }, () => { console.log("Servidor rodando na porta 3000") })