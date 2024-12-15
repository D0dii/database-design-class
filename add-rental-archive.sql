-- RentalArchiveAgreements Table
CREATE TABLE "RentalArchiveAgreements" (
  "id" SERIAL PRIMARY KEY,
  "contract_date" DATE NOT NULL CHECK (contract_date <= CURRENT_DATE),
  "termination_date" DATE,
  "payment" FLOAT NOT NULL CHECK (payment >= 0),
  "archival_date" DATE,
  "archival_reason" VARCHAR,
  "employee_id" INTEGER REFERENCES "Employees" ("id") ON DELETE RESTRICT,
  "dormitory_id" INTEGER REFERENCES "Dormitories" ("id") ON DELETE RESTRICT,
  "student_id" INTEGER REFERENCES "Students" ("id") ON DELETE RESTRICT,
  "room_id" INTEGER REFERENCES "Rooms" ("id") ON DELETE RESTRICT
);
