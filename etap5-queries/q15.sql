-- all employees with higher positions and contact to them
SELECT
e.first_name,
e.last_name,
e.pesel,
e.phone_number,
e.email,
dorm.name AS dormitory
FROM
"EmploymentContracts" ec
INNER JOIN
"Employees" e ON e.id = ec.employee_id
INNER JOIN
"Positions" p ON p.id = ec.position_id
INNER JOIN
"Dormitories" dorm ON dorm.id = ec.dormitory_id
WHERE
p.name IN('Dormitory Manager', 'Administrative Assistant');