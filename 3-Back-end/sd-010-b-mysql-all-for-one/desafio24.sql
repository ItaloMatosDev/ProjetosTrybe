UPDATE northwind.order_details
set discount = 45
WHERE unit_price >10 and (id >= 30 and id <= 40);
