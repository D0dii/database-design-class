-- history of fault reports in given dormitory
SELECT
dorm.name as dormitory,
fr.id as report_id,
s.first_name,
s.last_name,
s.student_number,
fr.report_date,
fr.status
FROM
"RentalAgreements" ra
INNER JOIN
"Students" s ON s.id = ra.student_id
INNER JOIN
"Dormitories" dorm ON dorm.id = ra.dormitory_id
INNER JOIN
"FaultReports" fr ON s.id = fr.student_id
WHERE
dorm.id = 1 AND ra.termination_date > CURRENT_DATE AND fr.report_date > make_date(2000,1,1);