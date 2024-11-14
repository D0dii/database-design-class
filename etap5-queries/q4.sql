-- students applications ready for review order by income
SELECT 
    sa.*
FROM 
    "StudentApplications" sa
WHERE 
    sa.status = 'ready for review'
ORDER BY 
    sa.income;



