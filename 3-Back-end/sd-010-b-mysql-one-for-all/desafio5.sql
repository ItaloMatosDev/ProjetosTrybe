CREATE VIEW top_2_hits_do_momento AS
SELECT s.song as 'cancao', COUNT(h.song_id) as 'reproducoes'
FROM SpotifyClone.historic as h
INNER JOIN SpotifyClone.songs as s
ON h.song_id = s.song_id
GROUP BY song
ORDER BY COUNT(song_id) DESC, s.song
LIMIT 2;
