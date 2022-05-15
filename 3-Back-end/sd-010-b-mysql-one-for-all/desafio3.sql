CREATE VIEW historico_reproducao_usuarios AS
SELECT users.user as usuario, songs.song as nome
FROM SpotifyClone.users as users
INNER JOIN SpotifyClone.historic as hist
ON hist.user_id = users.user_id
INNER JOIN SpotifyClone.songs as songs
ON hist.song_id = songs.song_id
ORDER BY users.user, songs.song;
