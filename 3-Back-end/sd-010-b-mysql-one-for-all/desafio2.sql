CREATE VIEW estatisticas_musicais AS
SELECT 
COUNT(song.song_id) AS 'cancoes',
COUNT(DISTINCT artist.artist_id) AS 'artistas',
COUNT(DISTINCT album.album_id) AS 'albuns'
FROM SpotifyClone.artists AS artist
INNER JOIN SpotifyClone.albums AS album
ON album.artist_id = artist.artist_id
INNER JOIN SpotifyClone.songs AS song
ON song.album_id = album.album_id;
