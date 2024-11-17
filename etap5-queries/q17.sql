-- SCHEMA: average price of rental in each year
SELECT
EXTRACT(YEAR FROM ra.contract_date) as year,
AVG(ra.payment) as price
FROM "RentalAgreements" ra
GROUP BY
EXTRACT(YEAR FROM ra.contract_date)
ORDER BY
EXTRACT(YEAR FROM ra.contract_date) ASC;