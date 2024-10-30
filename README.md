# Student Housing Database

## Overview

This project sets up a database for a student housing application using PostgreSQL and Drizzle ORM.

## Requirements

Before you begin, ensure you have the following installed:

- **Node.js** (version 14 or later)
- **PostgreSQL** (version 12 or later)

## Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/D0dii/database-design-class.git
   cd database-design-class
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Configure your environment variables**:
   - Create a `.env` file in the root of your project if it doesn't exist.
   - Update the `.env` file with your PostgreSQL connection details:
     ```env
     DATABASE_URL=postgres://username:password@localhost:5432/database_name
     ```
   - Replace `username`, `password`, and `database_name` with your actual PostgreSQL credentials and the name of your database.

## Running the Seeder

To seed the database with initial data, run the following command:

```bash
npm run seed
```

## Cleaning the Database

If you want to delete all records from the tables, use the following SQL command in your PostgreSQL client:

```sql
TRUNCATE TABLE
"Rooms",
"Dormitories",
"Students",
"Employees",
"Equipment",
"EquipmentCategories",
"RentalAgreements",
"FaultReports",
"Payments",
"Regulations",
"Positions",
"StudentApplications",
"EmploymentContracts" RESTART IDENTITY CASCADE;
```
