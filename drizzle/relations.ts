import { relations } from "drizzle-orm/relations";
import { regulations, dormitories, rooms, equipmentCategories, equipment, students, faultReports, employees, rentalAgreements, employmentContracts, positions, studentApplications, payments } from "./schema";

export const dormitoriesRelations = relations(dormitories, ({one, many}) => ({
	regulation: one(regulations, {
		fields: [dormitories.regulationId],
		references: [regulations.id]
	}),
	rooms: many(rooms),
	rentalAgreements: many(rentalAgreements),
	employmentContracts: many(employmentContracts),
}));

export const regulationsRelations = relations(regulations, ({many}) => ({
	dormitories: many(dormitories),
}));

export const roomsRelations = relations(rooms, ({one, many}) => ({
	dormitory: one(dormitories, {
		fields: [rooms.dormitoryId],
		references: [dormitories.id]
	}),
	equipment: many(equipment),
	rentalAgreements: many(rentalAgreements),
}));

export const equipmentRelations = relations(equipment, ({one, many}) => ({
	equipmentCategory: one(equipmentCategories, {
		fields: [equipment.categoryId],
		references: [equipmentCategories.id]
	}),
	room: one(rooms, {
		fields: [equipment.roomId],
		references: [rooms.id]
	}),
	faultReports: many(faultReports),
}));

export const equipmentCategoriesRelations = relations(equipmentCategories, ({many}) => ({
	equipment: many(equipment),
}));

export const faultReportsRelations = relations(faultReports, ({one}) => ({
	student: one(students, {
		fields: [faultReports.studentId],
		references: [students.id]
	}),
	equipment: one(equipment, {
		fields: [faultReports.equipmentId],
		references: [equipment.id]
	}),
}));

export const studentsRelations = relations(students, ({many}) => ({
	faultReports: many(faultReports),
	rentalAgreements: many(rentalAgreements),
	studentApplications: many(studentApplications),
	payments: many(payments),
}));

export const rentalAgreementsRelations = relations(rentalAgreements, ({one}) => ({
	employee: one(employees, {
		fields: [rentalAgreements.employeeId],
		references: [employees.id]
	}),
	dormitory: one(dormitories, {
		fields: [rentalAgreements.dormitoryId],
		references: [dormitories.id]
	}),
	student: one(students, {
		fields: [rentalAgreements.studentId],
		references: [students.id]
	}),
	room: one(rooms, {
		fields: [rentalAgreements.roomId],
		references: [rooms.id]
	}),
}));

export const employeesRelations = relations(employees, ({many}) => ({
	rentalAgreements: many(rentalAgreements),
	employmentContracts: many(employmentContracts),
}));

export const employmentContractsRelations = relations(employmentContracts, ({one}) => ({
	employee: one(employees, {
		fields: [employmentContracts.employeeId],
		references: [employees.id]
	}),
	position: one(positions, {
		fields: [employmentContracts.positionId],
		references: [positions.id]
	}),
	dormitory: one(dormitories, {
		fields: [employmentContracts.dormitoryId],
		references: [dormitories.id]
	}),
}));

export const positionsRelations = relations(positions, ({many}) => ({
	employmentContracts: many(employmentContracts),
}));

export const studentApplicationsRelations = relations(studentApplications, ({one}) => ({
	student: one(students, {
		fields: [studentApplications.studentId],
		references: [students.id]
	}),
}));

export const paymentsRelations = relations(payments, ({one}) => ({
	student: one(students, {
		fields: [payments.studentId],
		references: [students.id]
	}),
}));