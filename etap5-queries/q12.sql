-- all employees whose contracts end before holidays
SELECT
e.first_name,
e.last_name,
e.pesel,
ec.termination_date
FROM
"EmploymentContracts" ec
INNER JOIN
"Employees" e ON e.id = ec.employee_id
WHERE
ec.termination_date < make_date(2025,6,30);