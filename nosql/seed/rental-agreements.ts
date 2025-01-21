import { Db } from "mongodb";
import { faker } from "@faker-js/faker";
import { Dormitory, Employee, Room, Student } from "../types";

export const seedRentalAgreements = async (
  db: Db,
  students: Student[],
  employees: Employee[],
  dormitories: Dormitory[],
  rooms: Room[]
) => {
  const rentalAgreements = db.collection("rental_agreements");
  await rentalAgreements.deleteMany({});
  const rentalAgreementsData = Array.from({ length: 3000 }).map(() => ({
    start_date: faker.date.past().toISOString(),
    end_date: faker.date.future().toISOString(),
    monthly_rent: faker.number.float({ min: 200, max: 1000 }),
    room_number: faker.helpers.arrayElement(rooms.map((room) => room.number)),
    student: faker.helpers.arrayElement(
      students.map((student) => {
        return {
          first_name: student.first_name,
          last_name: student.last_name,
          email: student.email,
          phone_number: student.phone_number,
          student_income: faker.number.float({ min: 2000, max: 10000 }),
        };
      })
    ),
    employee: faker.helpers.arrayElement(
      employees.map((employee) => {
        return {
          first_name: employee.first_name,
          last_name: employee.last_name,
          email: employee.email,
          salary: faker.number.float({ min: 2000, max: 10000 }),
        };
      })
    ),
    dormitory: faker.helpers.arrayElement(
      dormitories.map((dormitory) => {
        return {
          name: dormitory.name,
        };
      })
    ),
  }));

  await rentalAgreements.insertMany(rentalAgreementsData);
};
