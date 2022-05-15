USE SpotifyClone;

DELIMITER $$

CREATE PROCEDURE albuns_do_artista (IN name_artist VARCHAR(30))
BEGIN
SELECT a.artist as 'artista', al.album as 'album'
FROM SpotifyClone.artists as a
INNER JOIN SpotifyClone.albums as al
WHERE a.artist_id = al.artist_id AND a.artist = name_artist
ORDER BY album;
END $$

DELIMITER ;
