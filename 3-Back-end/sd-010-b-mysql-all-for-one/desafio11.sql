SELECT notes
FROM northwind.purchase_orders
WHERE notes > '%30' LIMIT 5;
