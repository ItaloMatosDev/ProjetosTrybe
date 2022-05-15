DELIMITER $$

CREATE TRIGGER trigger_usuario_delete
BEFORE DELETE on SpotifyClone.users
FOR EACH ROW
BEGIN
DELETE FROM SpotifyClone.following
WHERE following.user_id = OLD.user_id;
DELETE FROM SpotifyClone.historic
WHERE historic.user_id = OLD.user_id;
END $$
DELIMITER ;
