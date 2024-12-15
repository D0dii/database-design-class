-- available rooms in a given dormitory and the number of available places
SELECT 
    r.number AS room_number,
	r.max_capacity - COUNT(ra.id) AS available_spots
FROM 
    "Rooms" r
LEFT JOIN 
    "RentalAgreements" ra ON r.id = ra.room_id AND ra.termination_date > now()
WHERE 
    r.dormitory_id = 1 and r.room_status  = 'available'
GROUP BY 
    r.id, r.room_status 
ORDER BY 
    r."number" ;
