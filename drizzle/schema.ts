import { mysqlTable, mysqlSchema, AnyMySqlColumn, foreignKey, primaryKey, unique, serial, varchar, float, tinyint } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"

export const cargo = mysqlTable("cargo", {
	id: serial().notNull(),
	funcionarioCpf: varchar("funcionario_cpf", { length: 255 }).notNull().references(() => funcionarios.cpf),
	nome: varchar({ length: 255 }).notNull(),
	salario: float().notNull(),
},
(table) => {
	return {
		cargoId: primaryKey({ columns: [table.id], name: "cargo_id"}),
		cargoFuncionarioCpfUnique: unique("cargo_funcionario_cpf_unique").on(table.funcionarioCpf),
		id: unique("id").on(table.id),
	}
});

export const entradasESaidas = mysqlTable("entradas_e_saidas", {
	id: serial().notNull(),
	funcionarioCpf: varchar("funcionario_cpf", { length: 255 }).notNull().references(() => funcionarios.cpf),
	data: varchar({ length: 255 }).notNull(),
},
(table) => {
	return {
		entradasESaidasId: primaryKey({ columns: [table.id], name: "entradas_e_saidas_id"}),
		id: unique("id").on(table.id),
	}
});

export const funcionarios = mysqlTable("funcionarios", {
	nome: varchar({ length: 255 }).notNull(),
	dataDeNascimento: varchar({ length: 30 }).notNull(),
	cpf: varchar({ length: 255 }).notNull(),
	telefone: varchar({ length: 225 }).notNull(),
	dataDeContratacao: varchar({ length: 225 }).notNull(),
	ativo: tinyint().notNull(),
},
(table) => {
	return {
		funcionariosCpf: primaryKey({ columns: [table.cpf], name: "funcionarios_cpf"}),
	}
});

export const recebimentos = mysqlTable("recebimentos", {
	id: serial().notNull(),
	funcionarioCpf: varchar("funcionario_cpf", { length: 255 }).notNull().references(() => funcionarios.cpf),
	data: varchar({ length: 255 }).notNull(),
},
(table) => {
	return {
		recebimentosId: primaryKey({ columns: [table.id], name: "recebimentos_id"}),
		id: unique("id").on(table.id),
	}
});
