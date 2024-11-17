-- all employees in given dormitory
SELECT
dorm.name as dormitory,
e.first_name,
e.last_name,
e.pesel
FROM
"EmploymentContracts" ec
INNER JOIN
"Dormitories" dorm ON dorm.id = ec.dormitory_id
INNER JOIN
"Employees" e ON e.id = ec.employee_id
WHERE
dorm.id = 1 AND ec.termination_date > CURRENT_DATE;