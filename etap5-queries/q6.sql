-- residence history of a given student 
SELECT 
    d.name AS dormitory_name,
    r.number AS room_number,
    ra.contract_date AS check_in_date,
    ra.termination_date AS check_out_date
FROM 
    "RentalAgreements" ra
JOIN 
    "Rooms" r ON ra.room_id = r.id
JOIN 
    "Dormitories" d ON r.dormitory_id = d.id
WHERE 
    ra.student_id = 5
ORDER BY 
    ra.contract_date;
