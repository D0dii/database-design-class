import { Db } from "mongodb";
import { faker } from "@faker-js/faker";
import { Dormitory } from "../types";

export const seedEquipments = async (db: Db, dormitories: Dormitory[]) => {
  const equipments = db.collection("equipments");
  await equipments.deleteMany({});
  const equipmentsData = Array.from({ length: 3000 }).map(() => ({
    serial_number: faker.number.int({ min: 100000, max: 999999 }),
    buy_date: faker.date.past().toISOString(),
    condition: faker.helpers.arrayElement(["new", "used", "damaged"]),
    category: faker.helpers.arrayElement(["kitchen", "bathroom", "bedroom", "living room"]),
    room_number: faker.number.int({ min: 1, max: 100 }),
    dormitory: faker.helpers.arrayElement(
      dormitories.map((dormitory) => {
        return {
          name: dormitory.name,
        };
      })
    ),
  }));
  await equipments.insertMany(equipmentsData);
  return equipmentsData;
};
