-- all students whose contracts end before holidays and have submitted for another room in this year
SELECT
s.first_name,
s.last_name,
s.student_number,
ra.termination_date
FROM
"Students" s
INNER JOIN
"RentalAgreements" ra ON s.id = ra.student_id
INNER JOIN
"StudentApplications" sa ON s.id = sa.student_id
WHERE
ra.termination_date < make_date(2025,6,30) AND sa.submission_date > make_date(2024,9,30) AND sa.status IN ('registered','ready for review');