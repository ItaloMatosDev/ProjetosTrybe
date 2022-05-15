CREATE VIEW cancoes_premium AS
SELECT s.song nome, COUNT(us.song_id) reproducoes
FROM SpotifyClone.songs s
INNER JOIN SpotifyClone.historic us
ON s.song_id = us.song_id
INNER JOIN SpotifyClone.users u
ON us.user_id = u.user_id
WHERE u.plan_id IN (2, 3)
GROUP BY nome
ORDER BY nome;
