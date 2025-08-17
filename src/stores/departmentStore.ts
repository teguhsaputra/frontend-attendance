import { create } from "zustand";
import { Department } from "../types";
import {
  fetchDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from "../utils/api";
import { toast } from "sonner";
import { normalizeResponse } from "@/lib/utils";

interface DepartmentState {
  departments: Department[];
  loading: boolean;
  error: string | null;
  fetchDepartments: () => Promise<void>;
  addDepartment: (data: Omit<Department, "id">) => Promise<boolean>;
  updateDepartment: (id: number, data: Partial<Department>) => Promise<boolean>;
  deleteDepartment: (id: number) => Promise<boolean>;
  clearError: () => void;
}

export const useDepartmentStore = create<DepartmentState>((set) => ({
  departments: [],
  loading: false,
  error: null,

  fetchDepartments: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetchDepartments();
      set({
        departments: normalizeResponse(response),
        loading: false,
      });
    } catch (error) {
      console.error("Error fetching departments:", error);
      set({
        error: "Gagal memuat data departemen",
        loading: false,
      });
      toast.error("Gagal memuat data departemen");
    }
  },

  addDepartment: async (data) => {
    set({ loading: true, error: null });
    try {
      await createDepartment(data);
      const response = await fetchDepartments();
      set({ departments: normalizeResponse(response), loading: false });
      toast.success("Departemen berhasil ditambahkan");
      return true;
    } catch (error) {
      console.error("Error adding department:", error);
      set({
        error: "Gagal menambahkan departemen",
        loading: false,
      });
      toast.error("Gagal menambahkan departemen");
      return false;
    }
  },

  updateDepartment: async (id, data) => {
    set({ loading: true, error: null });
    try {
      await updateDepartment(id, data);
      const response = await fetchDepartments();
      set({ departments: normalizeResponse(response), loading: false });
      toast.success("Departemen berhasil diperbarui");
      return true;
    } catch (error) {
      console.error("Error updating department:", error);
      set({
        error: "Gagal memperbarui departemen",
        loading: false,
      });
      toast.error("Gagal memperbarui departemen");
      return false;
    }
  },

  deleteDepartment: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await deleteDepartment(id);

      if (response?.success === false) {
        toast.error(response.message);
        set({ loading: false });
        return false;
      }

      const departmentsResponse = await fetchDepartments();
      set({
        departments: normalizeResponse(departmentsResponse),
        loading: false,
      });
      toast.success("Departemen berhasil dihapus");
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
