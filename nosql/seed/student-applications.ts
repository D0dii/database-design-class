import { Db } from "mongodb";
import { faker } from "@faker-js/faker";
import { Student } from "../types";

export const seedStudentApplications = async (db: Db, students: Student[]) => {
  const studentApplications = db.collection("student_applications");
  await studentApplications.deleteMany({});
  const studentApplicationsData = Array.from({ length: 3000 }).map(() => ({
    submission_date: faker.date.past().toISOString(),
    status: faker.helpers.arrayElement(["pending", "in progress", "completed"]),
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
  }));
  await studentApplications.insertMany(studentApplicationsData);
};
