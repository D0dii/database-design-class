-- students details with rejected application in 2024
SELECT 
    s.last_name,
    s.first_name,
    s.student_number,
	s.address,
    sa.income
FROM 
    "Students" s
JOIN 
    "StudentApplications" sa ON s.id = sa.student_id
WHERE 
    sa.status = 'rejected' 
    AND EXTRACT(YEAR FROM sa.submission_date) = 2024
ORDER BY
	sa.income;
