-- Insert records into RentalArchiveAgreements from RentalAgreements
INSERT INTO "RentalArchiveAgreements" (
    "contract_date",
    "termination_date",
    "payment",
    "archival_date",
    "archival_reason",
    "employee_id",
    "dormitory_id",
    "student_id",
    "room_id"
)
SELECT
    "contract_date",
    "termination_date",
    "payment",
    CURRENT_DATE,                       -- Archival date set to the current date
    'Archived due to contract termination', -- Archival reason
    "employee_id",
    "dormitory_id",
    "student_id",
    "room_id"
FROM
    "RentalAgreements" ra
WHERE
    ra.termination_date < '2025-01-01';

