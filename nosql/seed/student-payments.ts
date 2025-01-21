import { Db } from "mongodb";
import { faker } from "@faker-js/faker";
import { Student } from "../types";

export const seedStudentPayments = async (db: Db, students: Student[]) => {
  const studentPayments = db.collection("student_payments");
  await studentPayments.deleteMany({});
  const studentPaymentsData = Array.from({ length: 3000 }).map(() => ({
    payment_date: faker.date.past().toISOString(),
    amount: faker.number.float({ min: 2000, max: 10000 }),
    type: faker.helpers.arrayElement(["rent", "equipment", "other"]),
    status: faker.helpers.arrayElement(["pending", "posted", "overdue"]),
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
  }));
  await studentPayments.insertMany(studentPaymentsData);
};
