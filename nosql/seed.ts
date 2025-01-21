import { MongoClient } from "mongodb";
import { seedDormitories } from "./seed/dormitories";
import { seedStudents } from "./seed/student";
import { seedEmployees } from "./seed/employee";
import { seedEmployeeContracts } from "./seed/employee-contracts";
import { seedRooms } from "./seed/room";
import { seedEquipments } from "./seed/equipment";
import { seedFaultReports } from "./seed/fault-reports";
import { seedStudentApplications } from "./seed/student-applications";
import { seedStudentPayments } from "./seed/student-payments";
import { seedRentalAgreements } from "./seed/rental-agreements";

const url = "mongodb://root:password@localhost:27017";
const dbName = "dormitories_management";
const client = new MongoClient(url);

const seedDatabase = async () => {
  try {
    await client.connect();
    const db = client.db(dbName);
    console.log("Connected to database");

    const studentsData = await seedStudents(db);
    const employeesData = await seedEmployees(db);
    const dormitoriesData = await seedDormitories(db);
    const equipmentData = await seedEquipments(db, dormitoriesData);
    const roomsData = await seedRooms(db, dormitoriesData);
    await seedFaultReports(db, studentsData, equipmentData);
    await seedEmployeeContracts(db, employeesData, dormitoriesData);
    await seedStudentApplications(db, studentsData);
    await seedStudentPayments(db, studentsData);
    await seedRentalAgreements(db, studentsData, employeesData, dormitoriesData, roomsData);
    console.log("Seeding completed");
  } catch {
    console.error("Error connecting to database");
  } finally {
    await client.close();
    console.log("Connection closed");
  }
};

void seedDatabase();
