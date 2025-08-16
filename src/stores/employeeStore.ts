import { create } from "zustand";
import { Employee } from "../types";
import {
  fetchEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../utils/api";
import { toast } from "sonner";

interface EmployeeState {
  employees: Employee[];
  loading: boolean;
  error: string | null;
  fetchEmployees: () => Promise<void>;
  addEmployee: (data: Omit<Employee, "id">) => Promise<boolean>;
  updateEmployee: (id: number, data: Partial<Employee>) => Promise<boolean>;
  deleteEmployee: (id: number) => Promise<boolean>;
  clearError: () => void;
}

export const useEmployeeStore = create<EmployeeState>((set) => ({
  employees: [],
  loading: false,
  error: null,

  fetchEmployees: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetchEmployees();

      const employeesData = response.data?.data || response.data || [];
      set({
        employees: Array.isArray(employeesData) ? employeesData : [],
        loading: false,
      });
    } catch (error) {
      console.error("Error fetching employees:", error);
      set((state) => ({
        error: "Gagal memuat data employee",
        loading: false,

        employees: state.employees,
      }));
      toast.error("Gagal memuat data employee");
    }
  },

  addEmployee: async (data) => {
    set({ loading: true, error: null });
    try {
      const response = await createEmployee(data);

      const fetchResponse = await fetchEmployees();
      const employeesData = Array.isArray(fetchResponse?.data)
        ? fetchResponse.data
        : [];

      set({
        employees: employeesData,
        loading: false,
      });

      toast.success("Karyawan berhasil ditambahkan");
      return true;
    } catch (error) {
      console.error("Error adding employee:", error);
      set({
        error: "Gagal menambahkan karyawan",
        loading: false,
      });
      toast.error("Gagal menambahkan karyawan");
      return false;
    }
  },

  updateEmployee: async (id, data) => {
    set({ loading: true, error: null });
    try {
      await updateEmployee(id, data);
      const response = await fetchEmployees();

      const updatedEmployees = Array.isArray(response?.data)
        ? response.data
        : [];
      set({
        employees: updatedEmployees,
        loading: false,
      });
      toast.success("Employee berhasil diperbarui");
      return true;
    } catch (error) {
      console.error("Error updating employee:", error);
      set({
        error: "Gagal memperbarui employee",
        loading: false,
      });
      toast.error("Gagal memperbarui employee");
      return false;
    }
  },

  deleteEmployee: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await deleteEmployee(id);

      if (response?.success === false) {
        toast.error(response.message);
        set({ loading: false });
        return false;
      }

      const employeesResponse = await fetchEmployees();
      set({
        employees: employeesResponse.data,
        loading: false,
      });
      toast.success("Employee berhasil dihapus");
      return true;
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("Terjadi kesalahan tak terduga");
      set({ loading: false });
      return false;
    }
  },

  clearError: () => set({ error: null }),
}));
