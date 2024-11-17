-- all submitted repairs
SELECT
dorm.name as dormitory,
r.number as room_number,
eqc.name as equipment,
fr.report_date
FROM
"FaultReports" fr
INNER JOIN
"Equipment" eq ON eq.id = fr.equipment_id
INNER JOIN
"EquipmentCategories" eqc ON eqc.id = eq.category_id
INNER JOIN
"Rooms" r ON r.id = eq.room_id
INNER JOIN
"Dormitories" dorm ON dorm.id = r.dormitory_id
WHERE
fr.status = 'submitted'
ORDER BY
fr.report_date DESC;
