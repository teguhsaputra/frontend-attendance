import { create } from "zustand";
import { AttendanceLog } from "../types";
import {
  fetchAttendanceLogs,
  checkIn,
  checkOut,
  searchAttendance,
} from "../utils/api";

interface AttendanceState {
  logs: AttendanceLog[];
  currentEmployee: number | null;
  lastPunch: { in: string | null; out: string | null };
  searchResults: AttendanceLog[];
  loading: boolean;
  error: string | null;
  fetchLogs: () => Promise<void>;
  handleCheckIn: (employeeId: number) => Promise<boolean>;
  handleCheckOut: (employeeId: number) => Promise<boolean>;
  searchLogs: (params: {
    date?: string;
    department_id?: number;
  }) => Promise<void>;
  setCurrentEmployee: (id: number | null) => void;
  clearError: () => void;
}

export const useAttendanceStore = create<AttendanceState>((set, get) => ({
  logs: [],
  currentEmployee: null,
  lastPunch: { in: null, out: null },
  searchResults: [],
  loading: false,
  error: null,

  fetchLogs: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetchAttendanceLogs();
      const logsData = Array.isArray(response?.data)
        ? response.data
        : Array.isArray(response?.data?.data)
        ? response.data.data
        : [];

      set({ logs: logsData, loading: false });
      return logsData;
    } catch (error) {
      console.error("Error fetching attendance logs:", error);
      set({
        error: "Gagal memuat data absensi",
        loading: false,
      });
      return [];
    }
  },

  handleCheckIn: async (employeeId) => {
    set({ loading: true, error: null });
    try {
      await checkIn(employeeId);
      const now = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      set((state) => ({
        lastPunch: { ...state.lastPunch, in: now },
        loading: false,
      }));

      await get().fetchLogs();
      return true;
    } catch (error) {
      console.error("Error checking in:", error);
      set({
        error: "Gagal melakukan absen masuk",
        loading: false,
      });
      return false;
    }
  },

  handleCheckOut: async (employeeId) => {
    set({ loading: true, error: null });
    try {
      const { logs } = get();
      const employeeLogs = logs
        .filter((log) => log.employee_id === employeeId)
        .sort(
          (a, b) =>
            new Date(b.clock_in).getTime() - new Date(a.clock_in).getTime()
        );

      const latestLog = employeeLogs[0];

      if (!latestLog) {
        throw new Error("Tidak ada riwayat absen masuk");
      }

      if (latestLog.clock_out) {
        throw new Error("Anda sudah melakukan absen keluar");
      }

      await checkOut(latestLog.id);
      const now = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      set((state) => ({
        lastPunch: { ...state.lastPunch, out: now },
        loading: false,
      }));

      await get().fetchLogs();
      return true;
    } catch (error) {
      console.error("Error checking out:", error);
      set({
        error:
          error instanceof Error
            ? error.message
            : "Gagal melakukan absen keluar",
        loading: false,
      });
      return false;
    }
  },

  searchLogs: async (params) => {
    set({ loading: true, error: null });
    try {
      const response = await searchAttendance(params);
      set({
        searchResults: Array.isArray(response?.data?.data)
          ? response.data.data
          : [],
        loading: false,
      });
    } catch (error) {
      console.error("Error searching attendance logs:", error);
      set({
        error: "Gagal melakukan pencarian",
        loading: false,
        searchResults: [],
      });
    }
  },

  setCurrentEmployee: (id) => set({ currentEmployee: id }),

  clearError: () => set({ error: null }),
}));
