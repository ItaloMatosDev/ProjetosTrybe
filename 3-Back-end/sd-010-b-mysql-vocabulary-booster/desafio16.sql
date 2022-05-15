USE hr;
DELIMITER $$
CREATE FUNCTION buscar_quantidade_de_empregos_por_funcionario(email VARCHAR(30))
RETURNS INT READS SQL DATA
BEGIN
DECLARE result INT;
SELECT COUNT(*)
FROM hr.employees AS e
INNER JOIN hr.job_history AS j
ON e.EMPLOYEE_ID = j.EMPLOYEE_ID
WHERE e.EMAIL = email INTO result;
RETURN result;
END $$
DELIMITER ;
