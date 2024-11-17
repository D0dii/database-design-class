-- SCHEMA: average time of rental
SELECT
AVG(age(ra.termination_date, ra.contract_date)) as avg_time_of_rental
FROM "RentalAgreements" ra;