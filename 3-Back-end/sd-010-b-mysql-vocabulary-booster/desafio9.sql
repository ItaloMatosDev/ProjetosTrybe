SELECT CONCAT(e.FirstName, ' ', e.LastName) as 'Nome completo', COUNT(*) as 'Total de pedidos'
FROM w3schools.employees as e
INNER JOIN w3schools.orders as o
ON o.EmployeeID = e.EmployeeID
GROUP BY e.EmployeeID
ORDER BY COUNT(*);
