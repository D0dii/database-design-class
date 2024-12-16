CREATE VIEW AllAgreements AS
WITH AllAgreements AS (
    SELECT 
        room_id,
        student_id,
        dormitory_id,
        termination_date,
        contract_date
    FROM "RentalAgreements"
    UNION ALL
    SELECT 
        room_id,
        student_id,
        dormitory_id,
        termination_date,
        contract_date
    FROM "RentalArchiveAgreements"
)
SELECT * FROM AllAgreements;
