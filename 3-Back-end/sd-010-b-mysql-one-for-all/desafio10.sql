DELIMITER $$

USE 

CREATE FUNCTION quantidade_musicas_no_historico (userID INT)
RETURNS INT READS SQL DATA
BEGIN
DECLARE qtd INT;
SELECT COUNT(*)
FROM SpotifyClone.historic
WHERE user_id = userID INTO qtd;
RETURN qtd;
END $$
DELIMITER ;
