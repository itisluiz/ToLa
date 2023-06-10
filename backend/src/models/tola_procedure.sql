USE tola;

DELIMITER //
DROP PROCEDURE IF EXISTS criarToken //
CREATE PROCEDURE criarToken
(
	IN ttl INT UNSIGNED,
	OUT id_token INT UNSIGNED
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION 
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

	SET @valor = MD5(RAND());

	WHILE EXISTS(SELECT 1 FROM token WHERE valor = @valor) DO
		SET @valor = MD5(RAND());
	END WHILE;

	INSERT INTO token(valor, ttl) VALUES (@valor, ttl);
	SET id_token = LAST_INSERT_ID();
	
END //

DROP PROCEDURE IF EXISTS atribuirNovoToken //
CREATE PROCEDURE atribuirNovoToken
(
	IN id_credencial INT UNSIGNED
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION 
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

	CALL criarToken(86400, @id_token);
	UPDATE credencial SET id_token = @id_token WHERE id = id_credencial;

END //

DROP PROCEDURE IF EXISTS criarCredencial //
CREATE PROCEDURE criarCredencial
(
	IN email VARCHAR(320),
	IN senha CHAR(60),
	OUT id_credencial INT UNSIGNED
)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION 
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;
   
	INSERT INTO credencial(email, senha) VALUES (email, senha);
	SET id_credencial = LAST_INSERT_ID();
	CALL atribuirNovoToken(id_credencial);

END //

DROP PROCEDURE IF EXISTS criarPessoaFisica //
CREATE PROCEDURE criarPessoaFisica
(
	IN email VARCHAR(320),
	IN senha CHAR(60),
	IN nome VARCHAR(128),
	IN sobrenome VARCHAR(128),
	IN cpf CHAR(11),
	IN nascimento DATE,
	IN genero TINYINT UNSIGNED,
	OUT id_pessoafisica INT UNSIGNED
)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION 
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;
   
	CALL criarCredencial(email, senha, @id_credencial);
	INSERT INTO pessoafisica VALUES (@id_credencial, nome, sobrenome, cpf, nascimento, genero);
	SET id_pessoafisica = LAST_INSERT_ID();

END //

DROP PROCEDURE IF EXISTS criarPessoaJuridica //
CREATE PROCEDURE criarPessoaJuridica
(
	IN email VARCHAR(320),
	IN senha CHAR(60),
	IN titulo VARCHAR(128),
	IN cnpj CHAR(14),
	OUT id_pessoajuridica INT UNSIGNED
)
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION 
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;
   
	CALL criarCredencial(email, senha, @id_credencial);
	INSERT INTO pessoajuridica VALUES (@id_credencial, titulo, cnpj);
	SET id_pessoajuridica = LAST_INSERT_ID();

END //
DELIMITER ;
