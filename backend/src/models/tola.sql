SET autocommit = 0;
START TRANSACTION;

DROP DATABASE IF EXISTS tola;
CREATE DATABASE tola;

USE tola;

CREATE TABLE token
(
	id INT UNSIGNED AUTO_INCREMENT NOT NULL,
	valor CHAR(32) UNIQUE NOT NULL,
	criado TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
	ttl INT UNSIGNED DEFAULT NULL,
	
	PRIMARY KEY(id)
);

CREATE TABLE credencial
(
	id INT UNSIGNED AUTO_INCREMENT NOT NULL,
	id_token INT UNSIGNED,
    email VARCHAR(320) UNIQUE NOT NULL,
	senha CHAR(60) NOT NULL,
	criado TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
	
	FOREIGN KEY(id_token) REFERENCES token(id),
    
	PRIMARY KEY(id)
);

CREATE TABLE pessoafisica
(
	id_credencial INT UNSIGNED NOT NULL,
	nome VARCHAR(128) NOT NULL,
	sobrenome VARCHAR(128) NOT NULL,
	cpf CHAR(11) UNIQUE NOT NULL,
	nascimento DATE NOT NULL,
	genero TINYINT UNSIGNED NOT NULL,
	
	FOREIGN KEY(id_credencial) REFERENCES credencial(id),
    
	PRIMARY KEY(id_credencial)
);

CREATE TABLE pessoajuridica
(
	id_credencial INT UNSIGNED NOT NULL,
	titulo VARCHAR(128) NOT NULL,
	cnpj CHAR(14) UNIQUE NOT NULL,
	
	FOREIGN KEY(id_credencial) REFERENCES credencial(id),
    
	PRIMARY KEY(id_credencial)
);

CREATE TABLE categoriaevento
(
	id INT UNSIGNED AUTO_INCREMENT NOT NULL,
	titulo VARCHAR(32) NOT NULL,
	descricao VARCHAR(256) NOT NULL,
	icone SMALLINT UNSIGNED NOT NULL,

	PRIMARY KEY(id)
);

CREATE TABLE evento
(
	id INT UNSIGNED AUTO_INCREMENT NOT NULL,
	id_pessoajuridica INT UNSIGNED NOT NULL,
	id_categoriaevento INT UNSIGNED NOT NULL,
	titulo VARCHAR(128) NOT NULL,
	descricao VARCHAR(1024) NOT NULL,
	horario TIMESTAMP NOT NULL,
	localizacao VARCHAR(256) NOT NULL,
	idade TINYINT UNSIGNED DEFAULT NULL,
	
	FOREIGN KEY(id_pessoajuridica) REFERENCES pessoajuridica(id_credencial),
	FOREIGN KEY(id_categoriaevento) REFERENCES categoriaevento(id),

	PRIMARY KEY(id)
);

CREATE TABLE categoriaingesso
(
	id INT UNSIGNED AUTO_INCREMENT NOT NULL,
	id_evento INT UNSIGNED NOT NULL,
	titulo VARCHAR(32) NOT NULL,
	descricao VARCHAR(256) NOT NULL,
	quantidade INT UNSIGNED NOT NULL,
	
	FOREIGN KEY(id_evento) REFERENCES evento(id),
	
	PRIMARY KEY(id)
);

CREATE TABLE ingresso
(
	id INT UNSIGNED AUTO_INCREMENT NOT NULL,
	id_categoriaingesso INT UNSIGNED NOT NULL,
	id_pessoafisica INT UNSIGNED NOT NULL,
	atribuido TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
	
	FOREIGN KEY(id_categoriaingesso) REFERENCES categoriaingesso(id),
	FOREIGN KEY(id_pessoafisica) REFERENCES pessoafisica(id_credencial),
	
	PRIMARY KEY(id)
);

CREATE TABLE avaliacao
(
	id_evento INT UNSIGNED NOT NULL,
	id_pessoafisica INT UNSIGNED NOT NULL,
	nota TINYINT UNSIGNED NOT NULL,
	descricao VARCHAR(256) DEFAULT NULL,
	
	FOREIGN KEY(id_evento) REFERENCES evento(id),
	FOREIGN KEY(id_pessoafisica) REFERENCES pessoafisica(id_credencial),
	
	PRIMARY KEY(id_evento, id_pessoafisica)
);

COMMIT;
