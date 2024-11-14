-- data of employees
SELECT 
    e.last_name, 
    e.first_name, 
    p.name AS position, 
    ec.salary, 
    d.name AS dormitory_name
FROM 
    "Employees" e
JOIN 
    "EmploymentContracts" ec ON e.id = ec.employee_id
JOIN 
    "Positions" p ON ec.position_id = p.id
JOIN 
    "Dormitories" d ON ec.dormitory_id = d.id
WHERE 
    ec.termination_date IS NULL OR ec.termination_date > CURRENT_DATE;
