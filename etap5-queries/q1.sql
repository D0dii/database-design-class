-- all students with overdue payments and their total value
SELECT 
    s.last_name,
    s.first_name,
    s.student_number,
    SUM(p.value) AS total_overdue_payments
FROM 
    "Students" s
LEFT JOIN 
    "Payments" p ON s.id = p.student_id AND p.status = 'overdue'
GROUP BY 
    s.last_name, s.first_name, s.student_number
HAVING
	SUM(p.value) IS NOT NULL
ORDER BY 
    s.last_name,
    s.first_name;