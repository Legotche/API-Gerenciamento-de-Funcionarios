import { relations } from "drizzle-orm/relations";
import { funcionarios, cargo, entradasESaidas, recebimentos } from "./schema";

export const cargoRelations = relations(cargo, ({one}) => ({
	funcionario: one(funcionarios, {
		fields: [cargo.funcionarioCpf],
		references: [funcionarios.cpf]
	}),
}));

export const funcionariosRelations = relations(funcionarios, ({many}) => ({
	cargos: many(cargo),
	entradasESaidas: many(entradasESaidas),
	recebimentos: many(recebimentos),
}));

export const entradasESaidasRelations = relations(entradasESaidas, ({one}) => ({
	funcionario: one(funcionarios, {
		fields: [entradasESaidas.funcionarioCpf],
		references: [funcionarios.cpf]
	}),
}));

export const recebimentosRelations = relations(recebimentos, ({one}) => ({
	funcionario: one(funcionarios, {
		fields: [recebimentos.funcionarioCpf],
		references: [funcionarios.cpf]
	}),
}));