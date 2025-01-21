import { Db } from "mongodb";
import { faker } from "@faker-js/faker";

export const seedEmployees = async (db: Db) => {
  console.log("Seeding employees");

  const employees = db.collection("employees");
  await employees.deleteMany({});
  const employeesData = Array.from({ length: 3000 }).map(() => ({
    last_name: faker.person.lastName(),
    first_name: faker.person.firstName(),
    pesel: faker.string.numeric(11),
    date_of_birth: faker.date
      .between({ from: "1970-01-01T00:00:00.000Z", to: "2000-01-01T00:00:00.000Z" })
      .toISOString(),
    address: faker.location.streetAddress(),
    gender: faker.helpers.arrayElement(["male", "female"]),
    email: faker.internet.email(),
    password: faker.internet.password(),
    phone_number: faker.phone.number(),
  }));
  await employees.insertMany(employeesData);
  return employeesData;
};
