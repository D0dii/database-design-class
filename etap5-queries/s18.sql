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
dorm.id = 1
UNION
SELECT
dorm.name as dormitory,
s.first_name,
s.last_name,
s.student_number
FROM
"RentalArchiveAgreements" raa
INNER JOIN
"Students" s ON s.id = raa.student_id
INNER JOIN
"Dormitories" dorm ON dorm.id = raa.dormitory_id
WHERE
dorm.id = 1 AND raa.termination_date + 7 > CURRENT_DATE;