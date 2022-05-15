SELECT c.ContactName AS 'Nome de contato', s.ShipperName 'Empresa que fez o envio', o.OrderDate as 'Data do pedido'
FROM w3schools.customers as c
INNER JOIN w3schools.orders as o
ON o.CustomerID = c.CustomerID
INNER JOIN w3schools.shippers as s
ON s.ShipperID = o.ShipperID
WHERE (o.ShipperID = 1 || o.ShipperID = 2)
ORDER BY c.ContactName, s.ShipperName, o.OrderDate;
