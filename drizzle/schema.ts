import { pgTable, serial, varchar, foreignKey, integer, check, date, doublePrecision, pgEnum } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"

export const paymentStatus = pgEnum("payment_status", ['pending', 'in processing', 'posted', 'overdue'])
export const reportStatus = pgEnum("report_status", ['submitted', 'in repair', 'completed'])
export const studentApplicationStatus = pgEnum("student_application_status", ['registered', 'ready for review', 'approved', 'rejected'])
export const studentStatus = pgEnum("student_status", ['active', 'inactive'])



export const regulations = pgTable("Regulations", {
	id: serial().primaryKey().notNull(),
	content: varchar(),
});

export const dormitories = pgTable("Dormitories", {
	id: serial().primaryKey().notNull(),
	name: varchar().notNull(),
	address: varchar(),
	regulationId: integer("regulation_id"),
},
(table) => {
	return {
		dormitoriesRegulationIdFkey: foreignKey({
			columns: [table.regulationId],
			foreignColumns: [regulations.id],
			name: "Dormitories_regulation_id_fkey"
		}).onDelete("restrict"),
	}
});

export const rooms = pgTable("Rooms", {
	id: serial().primaryKey().notNull(),
	number: integer().notNull(),
	maxCapacity: integer("max_capacity").notNull(),
	roomStatus: varchar("room_status"),
	dormitoryId: integer("dormitory_id"),
},
(table) => {
	return {
		roomsDormitoryIdFkey: foreignKey({
			columns: [table.dormitoryId],
			foreignColumns: [dormitories.id],
			name: "Rooms_dormitory_id_fkey"
		}).onDelete("restrict"),
		roomsNumberCheck: check("Rooms_number_check", sql`number > 0`),
		roomsMaxCapacityCheck: check("Rooms_max_capacity_check", sql`max_capacity > 0`),
	}
});

export const equipmentCategories = pgTable("EquipmentCategories", {
	id: serial().primaryKey().notNull(),
	name: varchar().notNull(),
});

export const equipment = pgTable("Equipment", {
	id: serial().primaryKey().notNull(),
	purchaseDate: date("purchase_date").notNull(),
	condition: varchar(),
	categoryId: integer("category_id"),
	roomId: integer("room_id"),
},
(table) => {
	return {
		equipmentCategoryIdFkey: foreignKey({
			columns: [table.categoryId],
			foreignColumns: [equipmentCategories.id],
			name: "Equipment_category_id_fkey"
		}).onDelete("restrict"),
		equipmentRoomIdFkey: foreignKey({
			columns: [table.roomId],
			foreignColumns: [rooms.id],
			name: "Equipment_room_id_fkey"
		}).onDelete("restrict"),
		equipmentPurchaseDateCheck: check("Equipment_purchase_date_check", sql`purchase_date <= CURRENT_DATE`),
	}
});

export const students = pgTable("Students", {
	id: serial().primaryKey().notNull(),
	lastName: varchar("last_name").notNull(),
	firstName: varchar("first_name").notNull(),
	pesel: varchar({ length: 11 }).notNull(),
	dateOfBirth: date("date_of_birth").notNull(),
	address: varchar(),
	gender: varchar(),
	studentNumber: integer("student_number"),
	status: studentStatus().default('active'),
	email: varchar().notNull(),
	password: varchar().notNull(),
	phoneNumber: varchar("phone_number"),
},
(table) => {
	return {
		studentsDateOfBirthCheck: check("Students_date_of_birth_check", sql`date_of_birth <= CURRENT_DATE`),
		studentsGenderCheck: check("Students_gender_check", sql`(gender)::text = ANY ((ARRAY['male'::character varying, 'female'::character varying])::text[])`),
		studentsStudentNumberCheck: check("Students_student_number_check", sql`student_number > 0`),
		studentsEmailCheck: check("Students_email_check", sql`(email)::text ~ '^[^@]+@[^@]+\.[^@]+$'::text`),
	}
});

export const faultReports = pgTable("FaultReports", {
	id: serial().primaryKey().notNull(),
	reportDate: date("report_date").notNull(),
	status: reportStatus().default('submitted'),
	studentId: integer("student_id"),
	equipmentId: integer("equipment_id"),
},
(table) => {
	return {
		faultReportsStudentIdFkey: foreignKey({
			columns: [table.studentId],
			foreignColumns: [students.id],
			name: "FaultReports_student_id_fkey"
		}).onDelete("restrict"),
		faultReportsEquipmentIdFkey: foreignKey({
			columns: [table.equipmentId],
			foreignColumns: [equipment.id],
			name: "FaultReports_equipment_id_fkey"
		}).onDelete("restrict"),
		faultReportsReportDateCheck: check("FaultReports_report_date_check", sql`report_date <= CURRENT_DATE`),
	}
});

export const employees = pgTable("Employees", {
	id: serial().primaryKey().notNull(),
	lastName: varchar("last_name").notNull(),
	firstName: varchar("first_name").notNull(),
	pesel: varchar({ length: 11 }).notNull(),
	dateOfBirth: date("date_of_birth").notNull(),
	address: varchar(),
	gender: varchar(),
	email: varchar().notNull(),
	password: varchar().notNull(),
	phoneNumber: varchar("phone_number"),
},
(table) => {
	return {
		employeesDateOfBirthCheck: check("Employees_date_of_birth_check", sql`date_of_birth <= CURRENT_DATE`),
		employeesGenderCheck: check("Employees_gender_check", sql`(gender)::text = ANY ((ARRAY['male'::character varying, 'female'::character varying])::text[])`),
		employeesEmailCheck: check("Employees_email_check", sql`(email)::text ~ '^[^@]+@[^@]+\.[^@]+$'::text`),
	}
});

export const rentalAgreements = pgTable("RentalAgreements", {
	id: serial().primaryKey().notNull(),
	contractDate: date("contract_date").notNull(),
	terminationDate: date("termination_date"),
	payment: doublePrecision().notNull(),
	employeeId: integer("employee_id"),
	dormitoryId: integer("dormitory_id"),
	studentId: integer("student_id"),
	roomId: integer("room_id"),
},
(table) => {
	return {
		rentalAgreementsEmployeeIdFkey: foreignKey({
			columns: [table.employeeId],
			foreignColumns: [employees.id],
			name: "RentalAgreements_employee_id_fkey"
		}).onDelete("restrict"),
		rentalAgreementsDormitoryIdFkey: foreignKey({
			columns: [table.dormitoryId],
			foreignColumns: [dormitories.id],
			name: "RentalAgreements_dormitory_id_fkey"
		}).onDelete("restrict"),
		rentalAgreementsStudentIdFkey: foreignKey({
			columns: [table.studentId],
			foreignColumns: [students.id],
			name: "RentalAgreements_student_id_fkey"
		}).onDelete("restrict"),
		rentalAgreementsRoomIdFkey: foreignKey({
			columns: [table.roomId],
			foreignColumns: [rooms.id],
			name: "RentalAgreements_room_id_fkey"
		}).onDelete("restrict"),
		rentalAgreementsContractDateCheck: check("RentalAgreements_contract_date_check", sql`contract_date <= CURRENT_DATE`),
		rentalAgreementsPaymentCheck: check("RentalAgreements_payment_check", sql`payment >= (0)::double precision`),
	}
});

export const employmentContracts = pgTable("EmploymentContracts", {
	id: serial().primaryKey().notNull(),
	hireDate: date("hire_date").notNull(),
	terminationDate: date("termination_date"),
	duration: varchar(),
	contractType: varchar("contract_type"),
	workHours: integer("work_hours"),
	salary: doublePrecision(),
	employeeId: integer("employee_id"),
	positionId: integer("position_id"),
	dormitoryId: integer("dormitory_id"),
},
(table) => {
	return {
		employmentContractsEmployeeIdFkey: foreignKey({
			columns: [table.employeeId],
			foreignColumns: [employees.id],
			name: "EmploymentContracts_employee_id_fkey"
		}).onDelete("restrict"),
		employmentContractsPositionIdFkey: foreignKey({
			columns: [table.positionId],
			foreignColumns: [positions.id],
			name: "EmploymentContracts_position_id_fkey"
		}).onDelete("restrict"),
		employmentContractsDormitoryIdFkey: foreignKey({
			columns: [table.dormitoryId],
			foreignColumns: [dormitories.id],
			name: "EmploymentContracts_dormitory_id_fkey"
		}).onDelete("restrict"),
		employmentContractsHireDateCheck: check("EmploymentContracts_hire_date_check", sql`hire_date <= CURRENT_DATE`),
		employmentContractsWorkHoursCheck: check("EmploymentContracts_work_hours_check", sql`work_hours >= 0`),
		employmentContractsSalaryCheck: check("EmploymentContracts_salary_check", sql`salary >= (0)::double precision`),
	}
});

export const positions = pgTable("Positions", {
	id: serial().primaryKey().notNull(),
	name: varchar().notNull(),
	responsibilities: varchar(),
});

export const studentApplications = pgTable("StudentApplications", {
	id: serial().primaryKey().notNull(),
	submissionDate: date("submission_date").notNull(),
	status: studentApplicationStatus().default('registered'),
	income: doublePrecision(),
	studentId: integer("student_id"),
},
(table) => {
	return {
		studentApplicationsStudentIdFkey: foreignKey({
			columns: [table.studentId],
			foreignColumns: [students.id],
			name: "StudentApplications_student_id_fkey"
		}).onDelete("restrict"),
		studentApplicationsSubmissionDateCheck: check("StudentApplications_submission_date_check", sql`submission_date <= CURRENT_DATE`),
		studentApplicationsIncomeCheck: check("StudentApplications_income_check", sql`income >= (0)::double precision`),
	}
});

export const payments = pgTable("Payments", {
	id: serial().primaryKey().notNull(),
	value: doublePrecision().notNull(),
	type: varchar(),
	status: paymentStatus().default('pending'),
	studentId: integer("student_id"),
},
(table) => {
	return {
		paymentsStudentIdFkey: foreignKey({
			columns: [table.studentId],
			foreignColumns: [students.id],
			name: "Payments_student_id_fkey"
		}).onDelete("restrict"),
		paymentsValueCheck: check("Payments_value_check", sql`value > (0)::double precision`),
	}
});
