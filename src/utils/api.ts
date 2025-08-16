import { Department, Employee } from "@/types";
import axios, { isAxiosError } from "axios";

const BASE_URL = "http://127.0.0.1:8000";

export const api = axios.create({
  baseURL: BASE_URL,
});

// Department endpoints
export const fetchDepartments = () => api.get("/api/departements");
export const createDepartment = (data: Omit<Department, "id">) =>
  api.post("/api/departements", data);
export const updateDepartment = (id: number, data: Partial<Department>) =>
  api.put(`/api/departements/${id}`, data);
export const deleteDepartment = async (id: number) => {
  try {
    const response = await api.delete(`/api/departements/${id}`);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      return {
        success: false,
        message: error.response?.data?.message || "Gagal menghapus departemen",
        status: error.response?.status,
      };
    }
    return {
      success: false,
      message: "Terjadi kesalahan pada sistem",
      status: 500,
    };
  }
};

// Employee endpoints
export const fetchEmployees = () => api.get("/api/employees");
export const createEmployee = (data: Omit<Employee, "id">) =>
  api.post("/api/employees", data);
export const updateEmployee = (id: number, data: Partial<Employee>) =>
  api.put(`/api/employees/${id}`, data);
export const deleteEmployee = async (id: number) => {
  try {
    const response = await api.delete(`/api/employees/${id}`);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      return {
        success: false,
        message: error.response?.data?.message || "Gagal menghapus karyawan",
        status: error.response?.status,
      };
    }
    return {
      success: false,
      message: "Terjadi kesalahan pada sistem",
      status: 500,
    };
  }
};

// Attendance endpoints
export const fetchAttendanceLogs = () => api.get("/api/attendance/logs");
export const checkIn = (employeeId: number) =>
  api.post("/api/attendance/check-in", { employee_id: employeeId });
export const checkOut = (attendanceId: number) =>
  api.put(`/api/attendance/check-out/${attendanceId}`);
export const searchAttendance = (params: {
  date?: string;
  department_id?: number;
}) => api.get("/api/attendance/logs", { params });
