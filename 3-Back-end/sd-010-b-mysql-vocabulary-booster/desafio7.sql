SELECT UPPER(CONCAT(e.FIRST_NAME, ' ', e.LAST_NAME)) as 'Nome completo', h.START_DATE as 'Data de início', e.SALARY  as 'Salário'
FROM hr.job_history as h
INNER JOIN hr.employees as e
ON e.EMPLOYEE_ID = h.EMPLOYEE_ID
INNER JOIN hr.jobs as j
ON j.JOB_ID = e.JOB_ID
WHERE (MONTH(h.START_DATE) = 1 || MONTH(h.START_DATE) = 2 || MONTH(h.START_DATE) = 3)
ORDER BY CONCAT(e.FIRST_NAME, ' ', e.LAST_NAME), h.START_DATE;
