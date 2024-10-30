-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TYPE "public"."payment_status" AS ENUM('pending', 'in processing', 'posted', 'overdue');--> statement-breakpoint
CREATE TYPE "public"."report_status" AS ENUM('submitted', 'in repair', 'completed');--> statement-breakpoint
CREATE TYPE "public"."student_application_status" AS ENUM('registered', 'ready for review', 'approved', 'rejected');--> statement-breakpoint
CREATE TYPE "public"."student_status" AS ENUM('active', 'inactive');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Regulations" (
	"id" serial PRIMARY KEY NOT NULL,
	"content" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Dormitories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"address" varchar,
	"regulation_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Rooms" (
	"id" serial PRIMARY KEY NOT NULL,
	"number" integer NOT NULL,
	"max_capacity" integer NOT NULL,
	"room_status" varchar,
	"dormitory_id" integer,
	CONSTRAINT "Rooms_number_check" CHECK (number > 0),
	CONSTRAINT "Rooms_max_capacity_check" CHECK (max_capacity > 0)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "EquipmentCategories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Equipment" (
	"id" serial PRIMARY KEY NOT NULL,
	"purchase_date" date NOT NULL,
	"condition" varchar,
	"category_id" integer,
	"room_id" integer,
	CONSTRAINT "Equipment_purchase_date_check" CHECK (purchase_date <= CURRENT_DATE)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Students" (
	"id" serial PRIMARY KEY NOT NULL,
	"last_name" varchar NOT NULL,
	"first_name" varchar NOT NULL,
	"pesel" varchar(11) NOT NULL,
	"date_of_birth" date NOT NULL,
	"address" varchar,
	"gender" varchar,
	"student_number" integer,
	"status" "student_status" DEFAULT 'active',
	"email" varchar NOT NULL,
	"password" varchar NOT NULL,
	"phone_number" varchar,
	CONSTRAINT "Students_date_of_birth_check" CHECK (date_of_birth <= CURRENT_DATE),
	CONSTRAINT "Students_gender_check" CHECK ((gender)::text = ANY ((ARRAY['male'::character varying, 'female'::character varying])::text[])),
	CONSTRAINT "Students_student_number_check" CHECK (student_number > 0),
	CONSTRAINT "Students_email_check" CHECK ((email)::text ~ '^[^@]+@[^@]+\.[^@]+$'::text)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "FaultReports" (
	"id" serial PRIMARY KEY NOT NULL,
	"report_date" date NOT NULL,
	"status" "report_status" DEFAULT 'submitted',
	"student_id" integer,
	"equipment_id" integer,
	CONSTRAINT "FaultReports_report_date_check" CHECK (report_date <= CURRENT_DATE)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Employees" (
	"id" serial PRIMARY KEY NOT NULL,
	"last_name" varchar NOT NULL,
	"first_name" varchar NOT NULL,
	"pesel" varchar(11) NOT NULL,
	"date_of_birth" date NOT NULL,
	"address" varchar,
	"gender" varchar,
	"email" varchar NOT NULL,
	"password" varchar NOT NULL,
	"phone_number" varchar,
	CONSTRAINT "Employees_date_of_birth_check" CHECK (date_of_birth <= CURRENT_DATE),
	CONSTRAINT "Employees_gender_check" CHECK ((gender)::text = ANY ((ARRAY['male'::character varying, 'female'::character varying])::text[])),
	CONSTRAINT "Employees_email_check" CHECK ((email)::text ~ '^[^@]+@[^@]+\.[^@]+$'::text)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "RentalAgreements" (
	"id" serial PRIMARY KEY NOT NULL,
	"contract_date" date NOT NULL,
	"termination_date" date,
	"payment" double precision NOT NULL,
	"employee_id" integer,
	"dormitory_id" integer,
	"student_id" integer,
	"room_id" integer,
	CONSTRAINT "RentalAgreements_contract_date_check" CHECK (contract_date <= CURRENT_DATE),
	CONSTRAINT "RentalAgreements_payment_check" CHECK (payment >= (0)::double precision)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "EmploymentContracts" (
	"id" serial PRIMARY KEY NOT NULL,
	"hire_date" date NOT NULL,
	"termination_date" date,
	"duration" varchar,
	"contract_type" varchar,
	"work_hours" integer,
	"salary" double precision,
	"employee_id" integer,
	"position_id" integer,
	"dormitory_id" integer,
	CONSTRAINT "EmploymentContracts_hire_date_check" CHECK (hire_date <= CURRENT_DATE),
	CONSTRAINT "EmploymentContracts_work_hours_check" CHECK (work_hours >= 0),
	CONSTRAINT "EmploymentContracts_salary_check" CHECK (salary >= (0)::double precision)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Positions" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"responsibilities" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "StudentApplications" (
	"id" serial PRIMARY KEY NOT NULL,
	"submission_date" date NOT NULL,
	"status" "student_application_status" DEFAULT 'registered',
	"income" double precision,
	"student_id" integer,
	CONSTRAINT "StudentApplications_submission_date_check" CHECK (submission_date <= CURRENT_DATE),
	CONSTRAINT "StudentApplications_income_check" CHECK (income >= (0)::double precision)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Payments" (
	"id" serial PRIMARY KEY NOT NULL,
	"value" double precision NOT NULL,
	"type" varchar,
	"status" "payment_status" DEFAULT 'pending',
	"student_id" integer,
	CONSTRAINT "Payments_value_check" CHECK (value > (0)::double precision)
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Dormitories" ADD CONSTRAINT "Dormitories_regulation_id_fkey" FOREIGN KEY ("regulation_id") REFERENCES "public"."Regulations"("id") ON DELETE restrict ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Rooms" ADD CONSTRAINT "Rooms_dormitory_id_fkey" FOREIGN KEY ("dormitory_id") REFERENCES "public"."Dormitories"("id") ON DELETE restrict ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Equipment" ADD CONSTRAINT "Equipment_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."EquipmentCategories"("id") ON DELETE restrict ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Equipment" ADD CONSTRAINT "Equipment_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "public"."Rooms"("id") ON DELETE restrict ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "FaultReports" ADD CONSTRAINT "FaultReports_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "public"."Students"("id") ON DELETE restrict ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "FaultReports" ADD CONSTRAINT "FaultReports_equipment_id_fkey" FOREIGN KEY ("equipment_id") REFERENCES "public"."Equipment"("id") ON DELETE restrict ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "RentalAgreements" ADD CONSTRAINT "RentalAgreements_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "public"."Employees"("id") ON DELETE restrict ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "RentalAgreements" ADD CONSTRAINT "RentalAgreements_dormitory_id_fkey" FOREIGN KEY ("dormitory_id") REFERENCES "public"."Dormitories"("id") ON DELETE restrict ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "RentalAgreements" ADD CONSTRAINT "RentalAgreements_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "public"."Students"("id") ON DELETE restrict ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "RentalAgreements" ADD CONSTRAINT "RentalAgreements_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "public"."Rooms"("id") ON DELETE restrict ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "EmploymentContracts" ADD CONSTRAINT "EmploymentContracts_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "public"."Employees"("id") ON DELETE restrict ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "EmploymentContracts" ADD CONSTRAINT "EmploymentContracts_position_id_fkey" FOREIGN KEY ("position_id") REFERENCES "public"."Positions"("id") ON DELETE restrict ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "EmploymentContracts" ADD CONSTRAINT "EmploymentContracts_dormitory_id_fkey" FOREIGN KEY ("dormitory_id") REFERENCES "public"."Dormitories"("id") ON DELETE restrict ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "StudentApplications" ADD CONSTRAINT "StudentApplications_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "public"."Students"("id") ON DELETE restrict ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "Payments" ADD CONSTRAINT "Payments_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "public"."Students"("id") ON DELETE restrict ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

*/