import { Db } from "mongodb";
import { faker } from "@faker-js/faker";
import { Dormitory, Employee } from "../types";

export const seedRooms = async (db: Db, dormitories: Dormitory[]) => {
  const rooms = db.collection("rooms");
  await rooms.deleteMany({});
  const roomData = dormitories.flatMap((dormitory) => {
    const roomNumbers = new Set();

    return Array.from({ length: 70 }).map(() => {
      let roomNumber;

      do {
        roomNumber = faker.number.int({ min: 1, max: 100 });
      } while (roomNumbers.has(roomNumber));

      roomNumbers.add(roomNumber);

      return {
        number: roomNumber,
        max_capacity: faker.number.int({ min: 1, max: 5 }),
        status: faker.helpers.arrayElement(["occupied", "available"]),
        dormitory: dormitory.name,
      };
    });
  });
  await rooms.insertMany(roomData);
  return roomData;
};
