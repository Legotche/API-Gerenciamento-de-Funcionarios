import {fastify} from 'fastify'
import {ZodTypeProvider, serializerCompiler, validatorCompiler} from 'fastify-type-provider-zod'
import { rotaCriarFuncionario } from './routes/rotaCriarFuncionario';
import { rotaDeletarFuncionario } from './routes/rotaDeletarFuncionario';
import { rotaListarFuncionarios } from './routes/rotaListarFuncionarios';
import { rotaBaterPonto } from './routes/rotaBaterPonto';
import { rotaMarcarRecebimento } from './routes/rotaMarcarRecebimento';
import { rotaObterFuncionario } from './routes/rotaObterFuncionario';
import { rotaTrocarTelefone } from './routes/rotaTrocarTelefone';


const app=fastify().withTypeProvider<ZodTypeProvider>()
app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)


app.register(rotaObterFuncionario)      // /obterFuncionario
app.register(rotaCriarFuncionario)      // /criarFuncionario
app.register(rotaDeletarFuncionario)    //  /deletarFuncionario
app.register(rotaListarFuncionarios)    // /listarFuncionarios
app.register(rotaBaterPonto)            // /baterPonto
app.register(rotaMarcarRecebimento)     // /marcarRecebimento
app.register(rotaTrocarTelefone)        // /trocarTelefone


app.listen({port:3000},()=>{console.log("...")})