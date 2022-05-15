CREATE VIEW perfil_artistas AS
SELECT art.artist as artista, a.album as album, COUNT(f.user_id) as seguidores
FROM SpotifyClone.artists as art
INNER JOIN SpotifyClone.albums as a
ON art.artist_id = a.artist_id
INNER JOIN SpotifyClone.following as f
ON f.artist_id = art.artist_id
GROUP BY a.album_id
ORDER BY seguidores DESC, artista, album;
