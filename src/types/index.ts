export type Department = {
  id: number;
  departement_name: string;
  max_clock_in_time: string;
  max_clock_out_time: string;
};

export type Employee = {
  id: number;
  employee_id: string;
  name: string;
  address: string;
  departement_id: number;
  departement?: Department;
};

export type AttendanceLog = {
  id: number;
  employee_id: number;
  clock_in: string;
  clock_out: string | null;
  status_in: string;
  status_out: string | null;
  employee?: Employee;
};
