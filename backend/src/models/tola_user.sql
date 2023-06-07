SET autocommit = 0;
START TRANSACTION;

DROP USER IF EXISTS 'tola_admin';

CREATE USER 'tola_admin'@'%' IDENTIFIED BY '6EPCyzm@nfgF&2KF';
GRANT ALL PRIVILEGES ON tola.* TO 'tola_admin'@'%';

COMMIT;
