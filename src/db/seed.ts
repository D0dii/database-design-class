import { faker } from "@faker-js/faker";
import { db } from "../index";
import {
  regulations,
  dormitories,
  rooms,
  equipmentCategories,
  equipment,
  students,
  faultReports,
  employees,
  rentalAgreements,
  employmentContracts,
  positions,
  studentApplications,
  payments,
} from "../../drizzle/schema";

const seed = async () => {
  try {
    // Insert Regulations
    const regulationsData = [
      {
        content:
          "Residents must maintain quiet hours from 10:00 PM to 7:00 AM daily to ensure a peaceful environment for all. Noise levels should be kept to a minimum, including music, conversations, and electronic devices, to respect the study and sleep schedules of fellow residents.",
      },
      {
        content:
          "All dormitory residents are required to keep their rooms clean and organized, with inspections conducted every two weeks. Cleanliness not only promotes health but also enhances the overall living environment. Failure to maintain cleanliness may result in warnings or penalties.",
      },
      {
        content:
          "Visitors are permitted between 8:00 AM and 9:00 PM only, and must sign in at the front desk. Residents must accompany their guests at all times while on the premises. Unauthorized visitors may be asked to leave, and repeated violations will lead to disciplinary actions.",
      },
      {
        content:
          "Smoking is strictly prohibited within the dormitory premises, including rooms and common areas. This policy aims to promote a healthy living environment for all residents and prevent fire hazards. Designated smoking areas are available outside the building.",
      },
      {
        content:
          "No pets are allowed in the dormitory, except for certified service animals. This rule helps to maintain a safe and allergy-free environment. Residents must provide documentation for service animals to the administration prior to bringing them into the dormitory.",
      },
      {
        content:
          "Residents are responsible for the behavior of their guests and must ensure they follow all dormitory rules. If a guest violates any policies, the resident may face disciplinary actions. It is encouraged to communicate these rules to guests before their visit.",
      },
      {
        content:
          "All residents must report any maintenance issues or damages to the dormitory staff immediately. Prompt reporting helps ensure safety and prevents further damage. Regular maintenance checks will be conducted, but residents are encouraged to be proactive in communicating issues.",
      },
    ];

    const regulationRecords = await db.insert(regulations).values(regulationsData).returning();

    // Insert Dormitories
    const dormitoriesData = [
      {
        name: "Dom Studencki T-6 'Alcatraz'",
        address: "ul. Wittiga 6, 50-350 Wrocław",
        regulationId: faker.helpers.arrayElement(regulationRecords).id,
      },
      {
        name: "Dom Studencki T-17 'Oaza'",
        address: "ul. Wittiga 8, 50-351 Wrocław",
        regulationId: faker.helpers.arrayElement(regulationRecords).id,
      },
      {
        name: "Dom Studencki T-19 'Hades'",
        address: "ul. Wybrzeże Wyspiańskiego 40, 50-370 Wrocław",
        regulationId: faker.helpers.arrayElement(regulationRecords).id,
      },
      {
        name: "Dom Studencki 'Kredka'",
        address: "ul. Grunwaldzka 69, 50-357 Wrocław",
        regulationId: faker.helpers.arrayElement(regulationRecords).id,
      },
      {
        name: "Dom Studencki 'Ołówek'",
        address: "ul. Grunwaldzka 67, 50-357 Wrocław",
        regulationId: faker.helpers.arrayElement(regulationRecords).id,
      },
      {
        name: "Dom Studencki 'Parawanowiec'",
        address: "ul. Wybrzeże Wyspiańskiego 39, 50-370 Wrocław",
        regulationId: faker.helpers.arrayElement(regulationRecords).id,
      },
      {
        name: "Dom Studencki T-3 'Polonia'",
        address: "ul. Wittiga 10, 50-352 Wrocław",
        regulationId: faker.helpers.arrayElement(regulationRecords).id,
      },
      {
        name: "Dom Studencki T-4 'Dwudziestolatka'",
        address: "ul. Wittiga 12, 50-353 Wrocław",
        regulationId: faker.helpers.arrayElement(regulationRecords).id,
      },
      {
        name: "Dom Studencki 'Słowianka'",
        address: "ul. Curie-Skłodowskiej 43, 50-369 Wrocław",
        regulationId: faker.helpers.arrayElement(regulationRecords).id,
      },
      {
        name: "Dom Studencki 'Labirynt'",
        address: "ul. Reja 3, 50-334 Wrocław",
        regulationId: faker.helpers.arrayElement(regulationRecords).id,
      },
    ];

    const dormitoryRecords = await db.insert(dormitories).values(dormitoriesData).returning();

    // Insert Positions
    const positionsData = [
      {
        name: "Dormitory Manager",
        responsibilities:
          "Oversees daily operations, ensures dormitory regulations are followed, addresses resident issues, manages dormitory staff, and coordinates with maintenance and security.",
      },
      {
        name: "Resident Assistant",
        responsibilities:
          "Provides support to residents, assists with dormitory events, enforces quiet hours and visitation rules, and acts as a liaison between residents and management.",
      },
      {
        name: "Maintenance Technician",
        responsibilities:
          "Performs regular inspections, addresses repair and maintenance requests, maintains dormitory equipment, and ensures compliance with safety standards.",
      },
      {
        name: "Security Officer",
        responsibilities:
          "Monitors dormitory premises, ensures the safety of residents, enforces visitor policies, handles emergency situations, and reports incidents to management.",
      },
      {
        name: "Cleaning Staff",
        responsibilities:
          "Maintains cleanliness in common areas, sanitizes facilities, removes waste, and supports a clean and hygienic living environment.",
      },
      {
        name: "Administrative Assistant",
        responsibilities:
          "Assists with resident documentation, manages inquiries, supports dormitory events, and handles administrative tasks for dormitory operations.",
      },
      {
        name: "Receptionist",
        responsibilities:
          "Greets and checks in visitors, manages resident sign-ins, provides information, and supports communication between residents and staff.",
      },
      {
        name: "Event Coordinator",
        responsibilities:
          "Plans and organizes dormitory events, coordinates with vendors, manages event logistics, and encourages resident participation.",
      },
      {
        name: "IT Support Specialist",
        responsibilities:
          "Provides technical support, maintains dormitory internet and computer systems, troubleshoots technical issues, and ensures cybersecurity.",
      },
      {
        name: "Health and Safety Officer",
        responsibilities:
          "Conducts safety inspections, promotes health and safety guidelines, responds to emergencies, and ensures compliance with health regulations.",
      },
      {
        name: "Financial Officer",
        responsibilities:
          "Oversees dormitory budget, manages resident billing, processes payments, and ensures accurate financial record-keeping.",
      },
      {
        name: "Cafeteria Manager",
        responsibilities:
          "Oversees cafeteria operations, ensures food quality, manages food staff, and maintains compliance with health and safety standards.",
      },
      {
        name: "Counselor",
        responsibilities:
          "Provides emotional support, offers counseling services, organizes wellness programs, and assists residents with personal challenges.",
      },
      {
        name: "Maintenance Supervisor",
        responsibilities:
          "Supervises maintenance team, schedules repairs, ensures equipment functionality, and coordinates major maintenance projects.",
      },
      {
        name: "Resident Services Coordinator",
        responsibilities:
          "Supports residents with housing queries, manages move-ins and move-outs, and assists with dormitory programs and services.",
      },
      {
        name: "Laundry Facility Supervisor",
        responsibilities:
          "Maintains laundry facilities, assists residents with laundry services, and ensures equipment is functional and accessible.",
      },
      {
        name: "Student Engagement Specialist",
        responsibilities:
          "Develops programs to increase resident involvement, manages social events, and promotes a positive dormitory culture.",
      },
      {
        name: "Fire Safety Officer",
        responsibilities:
          "Conducts fire drills, ensures fire equipment functionality, educates residents on fire safety, and responds to fire-related incidents.",
      },
      {
        name: "Parking Coordinator",
        responsibilities:
          "Manages resident and guest parking, enforces parking policies, issues permits, and resolves parking-related issues.",
      },
      {
        name: "Waste Management Specialist",
        responsibilities:
          "Coordinates waste disposal, manages recycling programs, ensures proper waste collection, and promotes environmentally friendly practices.",
      },
    ];

    const positionRecords = await db.insert(positions).values(positionsData).returning();

    // Insert Equipment Categories
    const equipmentCategoriesData = [
      { name: "Furniture" },
      { name: "Appliances" },
      { name: "Electronics" },
      { name: "Cleaning Supplies" },
      { name: "Kitchen Equipment" },
      { name: "Office Supplies" },
      { name: "Sports Equipment" },
      { name: "Lighting" },
      { name: "Bathroom Fixtures" },
      { name: "Heating and Cooling" },
      { name: "Bedding and Linens" },
      { name: "Safety Equipment" },
      { name: "Laundry Equipment" },
      { name: "Storage Units" },
      { name: "IT and Networking" },
      { name: "Outdoor Furniture" },
      { name: "Fitness Equipment" },
      { name: "Maintenance Tools" },
      { name: "Window Coverings" },
      { name: "Educational Supplies" },
    ];

    const equipmentCategoryRecords = await db
      .insert(equipmentCategories)
      .values(equipmentCategoriesData)
      .returning();

    // Insert Rooms
    const roomData = dormitoryRecords.flatMap((dormitory) => {
      const roomNumbers = new Set();

      return Array.from({ length: 70 }).map(() => {
        let roomNumber;

        do {
          roomNumber = faker.number.int({ min: 1, max: 100 });
        } while (roomNumbers.has(roomNumber));

        roomNumbers.add(roomNumber);

        return {
          number: roomNumber,
          maxCapacity: faker.number.int({ min: 1, max: 5 }),
          roomStatus: faker.helpers.arrayElement(["occupied", "available"]),
          dormitoryId: dormitory.id,
        };
      });
    });

    const roomRecords = await db.insert(rooms).values(roomData).returning();

    // Insert Equipment
    const equipmentData = Array.from({ length: 20000 }).map(() => ({
      purchaseDate: faker.date.past().toISOString(),
      condition: faker.helpers.arrayElement(["new", "used", "needs repair"]),
      categoryId: faker.helpers.arrayElement(equipmentCategoryRecords).id,
      roomId: faker.helpers.arrayElement(roomRecords).id,
    }));
    const chunkSize = 1000;
    for (let i = 0; i < equipmentData.length; i += chunkSize) {
      const chunk = equipmentData.slice(i, i + chunkSize);
      await db.insert(equipment).values(chunk);
    }

    // Insert Students
    const studentData = Array.from({ length: 5500 }).map(() => ({
      lastName: faker.person.lastName(),
      firstName: faker.person.firstName(),
      pesel: faker.string.numeric(11),
      dateOfBirth: faker.date
        .between({ from: "1990-01-01T00:00:00.000Z", to: "2005-01-01T00:00:00.000Z" })
        .toISOString(),
      address: faker.location.streetAddress(),
      gender: faker.helpers.arrayElement(["male", "female"]),
      studentNumber: faker.number.int({ min: 100000, max: 999999 }),
      status: faker.helpers.arrayElement(["active", "inactive"]),
      email: faker.internet.email(),
      password: faker.internet.password(),
      phoneNumber: faker.phone.number(),
    }));
    const studentRecords = await db.insert(students).values(studentData).returning();

    // Insert Employees
    const employeeData = Array.from({ length: 2800 }).map(() => ({
      lastName: faker.person.lastName(),
      firstName: faker.person.firstName(),
      pesel: faker.string.numeric(11),
      dateOfBirth: faker.date
        .between({ from: "1990-01-01T00:00:00.000Z", to: "2005-01-01T00:00:00.000Z" })
        .toISOString(),
      address: faker.location.streetAddress(),
      gender: faker.helpers.arrayElement(["male", "female"]),
      email: faker.internet.email(),
      password: faker.internet.password(),
      phoneNumber: faker.phone.number(),
    }));
    const employeeRecords = await db.insert(employees).values(employeeData).returning();

    // Insert Fault Reports
    const faultReportData = Array.from({ length: 15000 }).map(() => ({
      reportDate: faker.date
        .between({ from: "1990-01-01T00:00:00.000Z", to: "2005-01-01T00:00:00.000Z" })
        .toISOString(),
      status: faker.helpers.arrayElement(["submitted", "in repair", "completed"]),
      studentId: faker.helpers.arrayElement(studentRecords).id,
      equipmentId: faker.helpers.arrayElement(employeeRecords).id,
    }));
    await db.insert(faultReports).values(faultReportData);

    // Insert Employment Contracts
    const employmentContractData = Array.from({ length: 3000 }).map(() => ({
      hireDate: faker.date.past().toISOString(),
      terminationDate: faker.date.future().toISOString(),
      duration: faker.helpers.arrayElement(["1 month", "3 months", "6 months", "1 year"]),
      contractType: faker.helpers.arrayElement(["part-time", "full-time"]),
      workHours: faker.number.int({ min: 20, max: 40 }),
      salary: parseFloat(faker.finance.amount({ min: 2500, max: 8000 })),
      employeeId: faker.helpers.arrayElement(employeeRecords).id,
      positionId: faker.helpers.arrayElement(positionRecords).id,
      dormitoryId: faker.helpers.arrayElement(dormitoryRecords).id,
    }));
    const employmentContractRecords = await db
      .insert(employmentContracts)
      .values(employmentContractData)
      .returning();

    // Insert Rental Agreements
    const rentalAgreementData = Array.from({ length: 10000 }).map(() => {
      const contract = faker.helpers.arrayElement(employmentContractRecords);
      const roomsInDormitory = roomRecords.filter((room) => room.dormitoryId === contract.dormitoryId);
      return {
        contractDate: faker.date.past().toISOString(),
        terminationDate: faker.date.future().toISOString(),
        payment: parseFloat(faker.finance.amount({ min: 300, max: 1000 })),
        employeeId: contract.employeeId,
        dormitoryId: contract.dormitoryId,
        studentId: faker.helpers.arrayElement(studentRecords).id,
        roomId: faker.helpers.arrayElement(roomsInDormitory).id,
      };
    });
    for (let i = 0; i < rentalAgreementData.length; i += chunkSize) {
      const chunk = rentalAgreementData.slice(i, i + chunkSize);
      await db.insert(rentalAgreements).values(chunk);
    }

    // Insert Payments
    const paymentData = Array.from({ length: 10000 }).map(() => ({
      value: parseFloat(faker.finance.amount({ min: 300, max: 1000 })),
      type: faker.helpers.arrayElement(["rent", "equipment", "other"]),
      status: faker.helpers.arrayElement(["pending", "posted", "overdue"]),
      studentId: faker.helpers.arrayElement(studentRecords).id,
    }));
    for (let i = 0; i < paymentData.length; i += chunkSize) {
      const chunk = paymentData.slice(i, i + chunkSize);
      await db.insert(payments).values(chunk);
    }

    // Insert Student Applications
    const studentApplicationData = Array.from({ length: 10000 }).map(() => ({
      submissionDate: faker.date.past().toISOString(),
      status: faker.helpers.arrayElement(["registered", "ready for review", "approved", "rejected"]),
      income: parseFloat(faker.finance.amount({ min: 2000, max: 100000 })),
      studentId: faker.helpers.arrayElement(studentRecords).id,
    }));
    for (let i = 0; i < studentApplicationData.length; i += chunkSize) {
      const chunk = studentApplicationData.slice(i, i + chunkSize);
      await db.insert(studentApplications).values(chunk);
    }

    console.log("Seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding data:", error);
  }
};

seed();
