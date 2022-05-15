SELECT p.ProductName as 'Produto',
MIN(d.Quantity) as 'Mínima',
MAX(d.Quantity) as 'Máxima',
ROUND(AVG(d.Quantity), 2) as 'Média'
FROM w3schools.products as p
INNER JOIN w3schools.order_details as d
ON d.ProductID = p.ProductID
GROUP BY d.ProductID
HAVING `Média`> 20
ORDER BY `Média`, p.ProductName;
