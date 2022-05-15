SELECT count(employee_id) as 'orders_count'
FROM northwind.orders
WHERE (employee_id = 6 or employee_id = 5)
AND shipper_id = 2;
