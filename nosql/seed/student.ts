import { Db } from "mongodb";
import { faker } from "@faker-js/faker";

export const seedStudents = async (db: Db) => {
  console.log("Seeding students");

  const students = db.collection("students");
  await students.deleteMany({});
  const studentData = Array.from({ length: 5000 }).map(() => ({
    last_name: faker.person.lastName(),
    first_name: faker.person.firstName(),
    pesel: faker.string.numeric(11),
    date_of_birth: faker.date
      .between({ from: "1990-01-01T00:00:00.000Z", to: "2005-01-01T00:00:00.000Z" })
      .toISOString(),
    address: faker.location.streetAddress(),
    gender: faker.helpers.arrayElement(["male", "female"]),
    student_number: faker.number.int({ min: 100000, max: 999999 }),
    status: faker.helpers.arrayElement(["active", "inactive"]),
    email: faker.internet.email(),
    password: faker.internet.password(),
    phone_number: faker.phone.number(),
  }));
  await students.insertMany(studentData);
  return studentData;
};
