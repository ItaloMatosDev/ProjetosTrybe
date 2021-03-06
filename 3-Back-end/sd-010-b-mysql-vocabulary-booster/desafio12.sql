SELECT CONCAT(e1.FIRST_NAME, ' ', e1.LAST_NAME) as 'Nome completo funcionário 1',
e1.SALARY as 'Salário funcionário 1',
e1.PHONE_NUMBER AS 'Telefone funcionário 1',
CONCAT(e2.FIRST_NAME, ' ', e2.LAST_NAME) AS 'Nome completo funcionário 2',
e2.SALARY as 'Salário funcionário 2',
e2.PHONE_NUMBER AS 'Telefone funcionário 2'
FROM hr.employees as e1,
hr.employees as e2
WHERE e1.JOB_ID = e2.JOB_ID
AND e1.EMPLOYEE_ID <> e2.EMPLOYEE_ID
ORDER BY `Nome completo funcionário 1`, `Nome completo funcionário 2`;
