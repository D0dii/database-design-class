-- report of equipment
SELECT 
    ec.name AS equipment_category, 
    COUNT(e.id) AS equipment_count
FROM 
    "Equipment" e
JOIN 
    "EquipmentCategories" ec ON e.category_id = ec.id
GROUP BY 
    ec.name
ORDER BY 
    ec.name;


