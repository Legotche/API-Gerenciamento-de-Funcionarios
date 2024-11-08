CREATE TABLE `cargo` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`funcionario_cpf` varchar(255) NOT NULL,
	`nome` varchar(255) NOT NULL,
	`salario` float NOT NULL,
	CONSTRAINT `cargo_id` PRIMARY KEY(`id`),
	CONSTRAINT `cargo_funcionario_cpf_unique` UNIQUE(`funcionario_cpf`)
);
--> statement-breakpoint
CREATE TABLE `entradas_e_saidas` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`funcionario_cpf` varchar(255) NOT NULL,
	`data` varchar(255) NOT NULL,
	CONSTRAINT `entradas_e_saidas_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `funcionarios` (
	`nome` varchar(255) NOT NULL,
	`dataDeNascimento` varchar(30) NOT NULL,
	`cpf` varchar(255) NOT NULL,
	`telefone` varchar(225) NOT NULL,
	`dataDeContratacao` varchar(225) NOT NULL,
	`ativo` boolean NOT NULL,
	CONSTRAINT `funcionarios_cpf` PRIMARY KEY(`cpf`)
);
--> statement-breakpoint
CREATE TABLE `recebimentos` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`funcionario_cpf` varchar(255) NOT NULL,
	`data` varchar(255) NOT NULL,
	CONSTRAINT `recebimentos_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `cargo` ADD CONSTRAINT `cargo_funcionario_cpf_funcionarios_cpf_fk` FOREIGN KEY (`funcionario_cpf`) REFERENCES `funcionarios`(`cpf`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `entradas_e_saidas` ADD CONSTRAINT `entradas_e_saidas_funcionario_cpf_funcionarios_cpf_fk` FOREIGN KEY (`funcionario_cpf`) REFERENCES `funcionarios`(`cpf`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `recebimentos` ADD CONSTRAINT `recebimentos_funcionario_cpf_funcionarios_cpf_fk` FOREIGN KEY (`funcionario_cpf`) REFERENCES `funcionarios`(`cpf`) ON DELETE no action ON UPDATE no action;