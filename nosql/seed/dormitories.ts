import { Db } from "mongodb";

export const seedDormitories = async (db: Db) => {
  const dormitories = db.collection("dormitories");
  await dormitories.deleteMany({});
  const dormitoriesData = [
    {
      name: "Dom Studencki T-6 'Alcatraz'",
      address: "ul. Wittiga 6, 50-350 Wrocław",
      regulations: [
        "Residents must maintain quiet hours from 10:00 PM to 7:00 AM daily to ensure a peaceful environment for all. Noise levels should be kept to a minimum, including music, conversations, and electronic devices, to respect the study and sleep schedules of fellow residents.",
        "All dormitory residents are required to keep their rooms clean and organized, with inspections conducted every two weeks. Cleanliness not only promotes health but also enhances the overall living environment. Failure to maintain cleanliness may result in warnings or penalties.",
      ],
      parkings: [
        { id: 1, address: "Parking Address 1 for Alcatraz", spots: 10 },
        { id: 2, address: "Parking Address 2 for Alcatraz", spots: 5 },
      ],
    },
    {
      name: "Dom Studencki T-17 'Oaza'",
      address: "ul. Wittiga 8, 50-351 Wrocław",
      regulations: [
        "Visitors are permitted between 8:00 AM and 9:00 PM only, and must sign in at the front desk. Residents must accompany their guests at all times while on the premises. Unauthorized visitors may be asked to leave, and repeated violations will lead to disciplinary actions.",
        "Smoking is strictly prohibited within the dormitory premises, including rooms and common areas. This policy aims to promote a healthy living environment for all residents and prevent fire hazards. Designated smoking areas are available outside the building.",
      ],
      parkings: [{ id: 3, address: "Parking Address 1 for Oaza", spots: 15 }],
    },
    {
      name: "Dom Studencki T-19 'Hades'",
      address: "ul. Wybrzeże Wyspiańskiego 40, 50-370 Wrocław",
      regulations: [
        "No pets are allowed in the dormitory, except for certified service animals. This rule helps to maintain a safe and allergy-free environment. Residents must provide documentation for service animals to the administration prior to bringing them into the dormitory.",
        "Residents are responsible for the behavior of their guests and must ensure they follow all dormitory rules. If a guest violates any policies, the resident may face disciplinary actions. It is encouraged to communicate these rules to guests before their visit.",
      ],
      parkings: [
        { id: 4, address: "Parking Address 1 for Hades", spots: 8 },
        { id: 5, address: "Parking Address 2 for Hades", spots: 12 },
      ],
    },
    {
      name: "Dom Studencki 'Kredka'",
      address: "ul. Grunwaldzka 69, 50-357 Wrocław",
      regulations: [
        "All residents must report any maintenance issues or damages to the dormitory staff immediately. Prompt reporting helps ensure safety and prevents further damage. Regular maintenance checks will be conducted, but residents are encouraged to be proactive in communicating issues.",
        "Residents must maintain quiet hours from 10:00 PM to 7:00 AM daily to ensure a peaceful environment for all. Noise levels should be kept to a minimum, including music, conversations, and electronic devices, to respect the study and sleep schedules of fellow residents.",
      ],
      parkings: [{ id: 6, address: "Parking Address 1 for Kredka", spots: 20 }],
    },
    {
      name: "Dom Studencki 'Ołówek'",
      address: "ul. Grunwaldzka 67, 50-357 Wrocław",
      regulations: [
        "Smoking is strictly prohibited within the dormitory premises, including rooms and common areas. This policy aims to promote a healthy living environment for all residents and prevent fire hazards. Designated smoking areas are available outside the building.",
        "Visitors are permitted between 8:00 AM and 9:00 PM only, and must sign in at the front desk. Residents must accompany their guests at all times while on the premises. Unauthorized visitors may be asked to leave, and repeated violations will lead to disciplinary actions.",
      ],
      parkings: [
        { id: 7, address: "Parking Address 1 for Ołówek", spots: 25 },
        { id: 8, address: "Parking Address 2 for Ołówek", spots: 10 },
      ],
    },
  ];
  await dormitories.insertMany(dormitoriesData);
  return dormitoriesData;
};
