-- current students in chosen dormitory
SELECT
dorm.name as dormitory,
s.first_name,
s.last_name,
s.student_number
FROM
"RentalAgreements" ra
INNER JOIN
"Students" s ON s.id = ra.student_id
INNER JOIN
"Dormitories" dorm ON dorm.id = ra.dormitory_id
WHERE
dorm.id = 1 AND ra.termination_date > CURRENT_DATE;