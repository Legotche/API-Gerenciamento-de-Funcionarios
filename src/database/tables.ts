import { mysqlTable, mysqlSchema, AnyMySqlColumn, primaryKey, unique, serial, varchar, int, float, boolean, date } from "drizzle-orm/mysql-core"


export const funcionarios = mysqlTable("funcionarios", {
	nome: varchar({ length: 255 }).notNull(),
	dataDeNascimento: date().notNull(),
	cpf: varchar({ length: 255 }).primaryKey().notNull(),
	telefone: varchar({ length: 225 }).notNull(),
	dataDeContratacao: date().notNull(),
	ativo: boolean().notNull(),
})

export const entradasESaidas = mysqlTable("entradas_e_saidas", {
	id: serial().primaryKey().notNull(),
	funcionario_cpf: varchar({ length: 255 }).references(() => funcionarios.cpf).notNull(),
	data: date().notNull(),
})

export const cargo = mysqlTable("cargos", {
	id: serial().notNull().primaryKey(),
	funcionario_cpf: varchar({ length: 255 }).references(() => funcionarios.cpf).unique().notNull(),
	nome: varchar({ length: 255 }).notNull(),
	salario: float().notNull(),
})

export const recebimentos = mysqlTable("recebimentos", {
	id: serial().primaryKey().notNull(),
	funcionario_cpf: varchar({ length: 255 }).references(() => funcionarios.cpf).notNull(),
	data: date().notNull(),
})


