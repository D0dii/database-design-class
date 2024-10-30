-- Enum Types
CREATE TYPE "student_status" AS ENUM (
  'active',
  'inactive'
);

CREATE TYPE "report_status" AS ENUM (
  'submitted',
  'in repair',
  'completed'
);

CREATE TYPE "student_application_status" AS ENUM (
  'registered',
  'ready for review',
  'approved',
  'rejected'
);

CREATE TYPE "payment_status" AS ENUM (
  'pending',
  'in processing',
  'posted',
  'overdue'
);

-- Regulations Table
CREATE TABLE "Regulations" (
  "id" SERIAL PRIMARY KEY,
  "content" VARCHAR
);

-- Dormitories Table
CREATE TABLE "Dormitories" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR NOT NULL,
  "address" VARCHAR,
  "regulation_id" INTEGER REFERENCES "Regulations" ("id") ON DELETE RESTRICT
);

-- Positions Table
CREATE TABLE "Positions" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR NOT NULL,
  "responsibilities" VARCHAR
);

-- Employees Table
CREATE TABLE "Employees" (
  "id" SERIAL PRIMARY KEY,
  "last_name" VARCHAR NOT NULL,
  "first_name" VARCHAR NOT NULL,
  "pesel" VARCHAR(11) NOT NULL,
  "date_of_birth" DATE NOT NULL CHECK (date_of_birth <= CURRENT_DATE),
  "address" VARCHAR,
  "gender" VARCHAR CHECK (gender IN ('male', 'female')),
  "email" VARCHAR NOT NULL CHECK (email ~ '^[^@]+@[^@]+\.[^@]+$'),
  "password" VARCHAR NOT NULL,
  "phone_number" VARCHAR
);

-- Students Table
CREATE TABLE "Students" (
  "id" SERIAL PRIMARY KEY,
  "last_name" VARCHAR NOT NULL,
  "first_name" VARCHAR NOT NULL,
  "pesel" VARCHAR(11) NOT NULL,
  "date_of_birth" DATE NOT NULL CHECK (date_of_birth <= CURRENT_DATE),
  "address" VARCHAR,
  "gender" VARCHAR CHECK (gender IN ('male', 'female')),
  "student_number" INTEGER CHECK (student_number > 0),
  "status" student_status DEFAULT 'active',
  "email" VARCHAR NOT NULL CHECK (email ~ '^[^@]+@[^@]+\.[^@]+$'),
  "password" VARCHAR NOT NULL,
  "phone_number" VARCHAR
);

-- Rooms Table
CREATE TABLE "Rooms" (
  "id" SERIAL PRIMARY KEY,
  "number" INTEGER NOT NULL CHECK (number > 0),
  "max_capacity" INTEGER NOT NULL CHECK (max_capacity > 0),
  "room_status" VARCHAR,
  "dormitory_id" INTEGER REFERENCES "Dormitories" ("id") ON DELETE RESTRICT,
  UNIQUE ("number", "dormitory_id")
);

-- EquipmentCategories Table
CREATE TABLE "EquipmentCategories" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR NOT NULL
);

-- Equipment Table
CREATE TABLE "Equipment" (
  "id" SERIAL PRIMARY KEY,
  "purchase_date" DATE NOT NULL CHECK (purchase_date <= CURRENT_DATE),
  "condition" VARCHAR,
  "category_id" INTEGER REFERENCES "EquipmentCategories" ("id") ON DELETE RESTRICT,
  "room_id" INTEGER REFERENCES "Rooms" ("id") ON DELETE RESTRICT
);

-- FaultReports Table
CREATE TABLE "FaultReports" (
  "id" SERIAL PRIMARY KEY,
  "report_date" DATE NOT NULL CHECK (report_date <= CURRENT_DATE),
  "status" report_status DEFAULT 'submitted',
  "student_id" INTEGER REFERENCES "Students" ("id") ON DELETE RESTRICT,
  "equipment_id" INTEGER REFERENCES "Equipment" ("id") ON DELETE RESTRICT
);

-- RentalAgreements Table
CREATE TABLE "RentalAgreements" (
  "id" SERIAL PRIMARY KEY,
  "contract_date" DATE NOT NULL CHECK (contract_date <= CURRENT_DATE),
  "termination_date" DATE,
  "payment" FLOAT NOT NULL CHECK (payment >= 0),
  "employee_id" INTEGER REFERENCES "Employees" ("id") ON DELETE RESTRICT,
  "dormitory_id" INTEGER REFERENCES "Dormitories" ("id") ON DELETE RESTRICT,
  "student_id" INTEGER REFERENCES "Students" ("id") ON DELETE RESTRICT,
  "room_id" INTEGER REFERENCES "Rooms" ("id") ON DELETE RESTRICT
);

-- EmploymentContracts Table
CREATE TABLE "EmploymentContracts" (
  "id" SERIAL PRIMARY KEY,
  "hire_date" DATE NOT NULL CHECK (hire_date <= CURRENT_DATE),
  "termination_date" DATE,
  "duration" VARCHAR,
  "contract_type" VARCHAR,
  "work_hours" INTEGER CHECK (work_hours >= 0),
  "salary" FLOAT CHECK (salary >= 0),
  "employee_id" INTEGER REFERENCES "Employees" ("id") ON DELETE RESTRICT,
  "position_id" INTEGER REFERENCES "Positions" ("id") ON DELETE RESTRICT,
  "dormitory_id" INTEGER REFERENCES "Dormitories" ("id") ON DELETE RESTRICT
);

-- StudentApplications Table
CREATE TABLE "StudentApplications" (
  "id" SERIAL PRIMARY KEY,
  "submission_date" DATE NOT NULL CHECK (submission_date <= CURRENT_DATE),
  "status" student_application_status DEFAULT 'registered',
  "income" FLOAT CHECK (income >= 0),
  "student_id" INTEGER REFERENCES "Students" ("id") ON DELETE RESTRICT
);

-- Payments Table
CREATE TABLE "Payments" (
  "id" SERIAL PRIMARY KEY,
  "value" FLOAT NOT NULL CHECK (value > 0),
  "type" VARCHAR,
  "status" payment_status DEFAULT 'pending',
  "student_id" INTEGER REFERENCES "Students" ("id") ON DELETE RESTRICT
);
