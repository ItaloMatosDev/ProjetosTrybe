CREATE VIEW top_3_artistas AS
SELECT art.artist as 'artista', COUNT(f.user_id) as 'seguidores'
FROM SpotifyClone.following as f
INNER JOIN SpotifyClone.artists as art
ON art.artist_id = f.artist_id
GROUP BY art.artist_id
LIMIT 3;
