Employees_contracts:
Data of employees in given dormitory

[
  {
    $match: {
      "dormitory.name":
        "Dom Studencki T-6 'Alcatraz'"
    }
  },
  {
    $project: {
      "employee.first_name": 1,
      "employee.last_name": 1,
      "employee.pesel": 1,
      "employee.email": 1,
      "dormitory.name": 1,
      _id: 0
    }
  }
]

q15_all_employees_with_salary_over_6000

[
  {
    $match: {
      salary: {
        $gt: 6000
      }
    }
  },
  {
    $sort: {
      "dormitory.name": 1
    }
  },
  {
    $project: {
      _id: 0,
      work_hours: 1,
      "employee.first_name": 1,
      "employee.last_name": 1,
      "employee.email": 1,
      salary: 1,
      "dormitory.name": 1
    }
  }
]

Fault_reporst:
q10_fault_reports_in_given_dormitory

[
  {
    $lookup: {
      from: "rental_agreements",
      localField: "student.email",
      foreignField: "student.email",
      as: "rental_info"
    }
  },
  {
    $unwind: "$rental_info"
  },
  {
    $match: {
      "rental_info.dormitory.name":
        "Dom Studencki 'Kredka'"
    }
  },
  {
    $project: {
      _id: 1,
      report_date: 1,
      description: 1,
      status: 1,
      "student.first_name": 1,
      "student.last_name": 1,
      "student.email": 1,
      "equipment.serial_number": 1
    }
  }
]

q14_all_pending_fault_requests

[
  {
    $match: {
      status: "pending"
    }
  },
  {
    $project: {
      _id: 0,
      status: 0
    }
  }
]

q7_number of fault_reports for each equipment ordered descending

[
  {
    "$group": {
      "_id": "$equipment.serial_number",
      "count": { "$sum": 1 }
    }
  },
  {
    "$sort": { "count": -1 }
  }
]

number of fault_reports for each student ordered descending and thier data


[
  {
    "$group": {
      "_id": {
        "first_name": "$student.first_name",
        "last_name": "$student.last_name",
        "email": "$student.email",
      },
      "count": {
        "$sum": 1
      },
    }
  },
  {
    "$sort": {
      "count": -1
    }
  }
]




rental_agreements:
q13_students_whose_contracts_end_in_2025_and_have_already_submitted_another

[
  {
    $lookup: {
      from: "student_applications",
      localField: "student.email",
      foreignField: "student.email",
      as: "applications"
    }
  },
  {
    $unwind: "$applications"
  },
  {
    $match: {
      $expr: {
        $and: [
          {
            $eq: [
              {
                $year: {
                  $dateFromString: {
                    dateString: "$end_date"
                  }
                }
              },
              2025
            ]
          },
          {
            $eq: [
              {
                $year: {
                  $dateFromString: {
                    dateString:
                      "$applications.submission_date"
                  }
                }
              },
              2025
            ]
          }
        ]
      }
    }
  },
  {
    $project: {
      _id: 0,
      "student.first_name": 1,
      "student.last_name": 1,
      "student.email": 1,
      "student.phone_number": 1,
      rental_agreement_end_date: "$end_date",
      application_submission_date:
        "$applications.submission_date"
    }
  }
]

q13_all_students_whose_contract_end_this_semester

[
  {
    $match: {
      end_date: {
        $gte: "2025-01-01",
        $lt: "2025-06-01"
      }
    }
  },
  {
    $project: {
      _id: 0,
      "student.first_name": 1,
      "student.last_name": 1,
      "student.email": 1,
      "dormitory.name": 1,
      room_number: 1,
      end_date: 1,
      start_date: 1
    }
  }
]

q16_average_renatl_time_in_each_dormitory

[
  {
    $addFields: {
      start_date: {
        $dateFromString: {
          dateString: "$start_date"
        }
      },
      end_date: {
        $dateFromString: {
          dateString: "$end_date"
        }
      }
    }
  },
  {
    $project: {
      "dormitory.name": 1,
      rental_days: {
        $dateDiff: {
          startDate: "$start_date",
          endDate: "$end_date",
          unit: "day"
        }
      }
    }
  },
  {
    $group: {
      _id: "$dormitory.name",
      average_rental_days: {
        $avg: "$rental_days"
      }
    }
  }
]

q17_average_monthly_rent

[
  {
    $addFields: {
      year: {
        $year: {
          $dateFromString: {
            dateString: "$start_date"
          }
        }
      }
    }
  },
  {
    $group: {
      _id: {
        year: "$year",
        dormitory: "$dormitory.name"
      },
      averageMonthlyRent: {
        $avg: "$monthly_rent"
      }
    }
  },
  {
    $sort: { averageMonthlyRent: -1 }
  }
]

q20_new_students_in_each_month_in_each_room

[
  {
    $project: {
      year: {
        $year: {
          $dateFromString: {
            dateString: "$start_date"
          }
        }
      },
      month: {
        $month: {
          $dateFromString: {
            dateString: "$start_date"
          }
        }
      },
      "dormitory.name": 1,
      room_number: 1
    }
  },
  {
    $group: {
      _id: {
        year: "$year",
        month: "$month",
        dormitory: "$dormitory.name",
        room_number: "$room_number"
      },
      new_students: { $sum: 1 }
    }
  },
  {
    $sort: {
      "_id.year": 1,
      "_id.month": 1,
      "_id.dormitory": 1,
      "_id.room_number": 1
    }
  }
]

current dormitory and room number of each student

[
  {
    $project: {
      _id: 0,
      "student.first_name": 1,
      "student.last_name": 1,
      "dormitory.name": 1,
      room_number: 1
    }
  }
]

q6_residence history of a given student 

[
  {
    "$match": {
      "student.email": "Thomas_Renner28@gmail.com"
    }
  },
  {
    "$project": {
      "_id": 0,
      "start_date": 1,
      "end_date": 1,
      "dormitory_name": "$dormitory.name",
      "room_number": 1,
      "monthly_rent": 1
    }
  }
]




Rooms:
q21_total_free_spots_in_each_dormitory

[
  {
    $lookup: {
      from: "rental_agreements",
      let: {
        roomNumber: "$number",
        dormName: "$dormitory"
      },
      pipeline: [
        {
          $match: {
            $expr: {
              $and: [
                {
                  $eq: [
                    "$room_number",
                    "$$roomNumber"
                  ]
                },
                {
                  $eq: [
                    "$dormitory.name",
                    "$$dormName"
                  ]
                },
                {
                  $gte: [
                    "$end_date",
                    "2025-01-26"
                  ]
                },
                {
                  $lte: [
                    "$start_date",
                    "2025-01-26"
                  ]
                }
              ]
            }
          }
        }
      ],
      as: "rental_info"
    }
  },
  {
    $addFields: {
      current_occupants: {
        $size: "$rental_info"
      }
    }
  },
  {
    $addFields: {
      free_spots: {
        $subtract: [
          "$max_capacity",
          "$current_occupants"
        ]
      }
    }
  },
  {
    $group: {
      _id: "$dormitory",
      total_free_spots: {
        $sum: "$free_spots"
      },
      total_capacity: {
        $sum: "$max_capacity"
      },
      current_occupants: {
        $sum: "$current_occupants"
      }
    }
  },
  {
    $sort: {
      total_free_spots: -1
    }
  }
]

Student_payments:

q1_all_students_with_overdue_payments_ane_their_value


[
  {
    $match: {
      status: "overdue"
    }
  },
  {
    $group: {
      _id: "$student.email",
      total_amount: {
        $sum: "$amount"
      },
      student: {
        $first: "$student"
      }
    }
  },
  {
    $project: {
      _id: 0,
      email: "$_id",
      first_name: "$student.first_name",
      last_name: "$student.last_name",
      total_amount: 1
    }
  }
]


student_applications:

q4 students applications with pending status ordered by student_income

[
  {
    $match: {
      status: "pending"
    }
  },
  {
    $sort: {
      "student.student_income": 1
    }
  }
]