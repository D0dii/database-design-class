import { Db } from "mongodb";
import { faker } from "@faker-js/faker";
import { Equipment, Student } from "../types";

export const seedFaultReports = async (db: Db, students: Student[], equipments: Equipment[]) => {
  const faultReports = db.collection("fault_reports");
  await faultReports.deleteMany({});
  const faultReportsData = Array.from({ length: 3000 }).map(() => ({
    report_date: faker.date.past().toISOString(),
    description: faker.lorem.sentence(),
    status: faker.helpers.arrayElement(["pending", "in progress", "completed"]),
    student: faker.helpers.arrayElement(
      students.map((student) => {
        return {
          first_name: student.first_name,
          last_name: student.last_name,
          email: student.email,
          phone_number: student.phone_number,
        };
      })
    ),
    equipment: faker.helpers.arrayElement(
      equipments.map((equipment) => {
        return {
          serial_number: equipment.serial_number,
        };
      })
    ),
  }));
  await faultReports.insertMany(faultReportsData);
};
