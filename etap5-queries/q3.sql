-- current dormitory and room number of students
SELECT 
    s.last_name,
    s.first_name,
    s.student_number,
    d.name AS dormitory_name,
    r.number AS room_number
FROM 
    "Students" s
JOIN 
    "RentalAgreements" ra ON s.id = ra.student_id
JOIN 
    "Rooms" r ON ra.room_id = r.id
JOIN 
    "Dormitories" d ON r.dormitory_id = d.id
WHERE 
    ra.termination_date > CURRENT_DATE;  