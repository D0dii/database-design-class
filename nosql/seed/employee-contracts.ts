import { Db } from "mongodb";
import { faker } from "@faker-js/faker";
import { Dormitory, Employee } from "../types";

export const seedEmployeeContracts = async (db: Db, employees: Employee[], dormitories: Dormitory[]) => {
  const employeeContracts = db.collection("employees_contracts");
  await employeeContracts.deleteMany({});
  const employeeContractsData = Array.from({ length: 3000 }).map(() => ({
    hire_date: faker.date.past().toISOString(),
    termination_date: faker.date.future().toISOString(),
    duration: faker.helpers.arrayElement(["1 month", "3 months", "6 months", "1 year"]),
    contract_type: faker.helpers.arrayElement(["part-time", "full-time"]),
    work_hours: faker.number.int({ min: 20, max: 40 }),
    salary: parseFloat(faker.finance.amount({ min: 2500, max: 8000 })),
    employee: faker.helpers.arrayElement(
      employees.map((employee) => {
        return {
          first_name: employee.first_name,
          last_name: employee.last_name,
          pesel: employee.pesel,
          email: employee.email,
        };
      })
    ),
    dormitory: faker.helpers.arrayElement(
      dormitories.map((dormitory: any) => {
        return {
          name: dormitory.name,
        };
      })
    ),
  }));
  await employeeContracts.insertMany(employeeContractsData);
};
