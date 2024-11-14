-- available rooms in a given dormitory and the number of available places
SELECT 
    r.number AS room_number,
	r.max_capacity - COUNT(ra.id) AS available_spots
FROM 
    "Rooms" r
LEFT JOIN 
    "RentalAgreements" ra ON r.id = ra.room_id AND r.room_status = 'avaiable'
WHERE 
    r.dormitory_id = 1
GROUP BY 
    r.id
ORDER BY 
    r.number;
