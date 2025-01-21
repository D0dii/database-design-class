export interface Employee {
  last_name: string;
  first_name: string;
  pesel: string;
  email: string;
}

export interface Dormitory {
  name: string;
}

export interface Student {
  last_name: string;
  first_name: string;
  pesel: string;
  email: string;
  phone_number: string;
}

export interface Equipment {
  serial_number: number;
}

export interface Room {
  number: number;
}
