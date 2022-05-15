SELECT DISTINCT(c.Country) AS 'País'
FROM (
SELECT Country FROM w3schools.customers
UNION
SELECT Country FROM w3schools.suppliers
) as c
ORDER BY Country
LIMIT 5;
