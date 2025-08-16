import { useEffect } from "react";
import { CheckIcon, DoorClosedIcon } from "lucide-react";
import { useAttendanceStore } from "../../stores/attendanceStore";
import { useEmployeeStore } from "@/stores/employeeStore";
import TimeDisplay from "../common/TimeDisplay";
import { toast } from "sonner";

export const AttendanceForm = () => {
  const {
    currentEmployee,
    lastPunch,
    logs,
    loading,
    error,
    handleCheckIn,
    handleCheckOut,
    setCurrentEmployee,
    fetchLogs,
    clearError,
  } = useAttendanceStore();

  const { employees = [] } = useEmployeeStore();

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearError();
    }
  }, [error, clearError]);

  useEffect(() => {
    if (currentEmployee) {
      fetchLogs();
    }
  }, [currentEmployee, fetchLogs]);

  const isSameDay = (dateA: string, dateB: Date) => {
    try {
      const a = new Date(dateA);
      return (
        a.getFullYear() === dateB.getFullYear() &&
        a.getMonth() === dateB.getMonth() &&
        a.getDate() === dateB.getDate()
      );
    } catch (error) {
      console.error("Error parsing date:", error);
      return false;
    }
  };

  const today = new Date();
  const todayLog = logs.find(
    (log) =>
      log.employee_id === currentEmployee && isSameDay(log.clock_in, today)
  );

  const isCheckInDisabled = !currentEmployee || !!todayLog || loading;
  const isCheckOutDisabled =
    !currentEmployee || !todayLog || !!todayLog.clock_out || loading;

  const handleAttendanceAction = async (type: "in" | "out") => {
    if (!currentEmployee) {
      toast.warning("Silakan pilih karyawan terlebih dahulu");
      return;
    }

    try {
      let success = false;
      if (type === "in") {
        success = await handleCheckIn(currentEmployee);
      } else {
        success = await handleCheckOut(currentEmployee);
      }

      if (success) {
        toast.success(`Absen ${type === "in" ? "masuk" : "keluar"} berhasil`);
        await fetchLogs();
      }
    } catch (error) {
      console.error(`Error during check ${type}:`, error);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Pilih Karyawan
        </label>
        <select
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          value={currentEmployee || ""}
          onChange={(e) => setCurrentEmployee(Number(e.target.value))}
          disabled={loading}
        >
          <option value="">Pilih Karyawan</option>
          {employees.map((emp) => (
            <option key={emp.id} value={emp.id}>
              {emp.name} ({emp.employee_id})
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-500">Jam Kerja</p>
          <p className="text-2xl font-bold text-gray-800">
            {employees.find((e) => e.id === currentEmployee)?.departement
              ? `${
                  employees.find((e) => e.id === currentEmployee)?.departement
                    ?.max_clock_in_time
                } - ${
                  employees.find((e) => e.id === currentEmployee)?.departement
                    ?.max_clock_out_time
                }`
              : "08:00 - 17:00"}
          </p>
        </div>
        <div className="bg-green-50 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-500">Waktu Sekarang</p>
          <TimeDisplay />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-500">Absen Masuk</p>
          <p className="text-xl font-bold text-gray-800">
            {lastPunch.in || "-"}
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-500">Absen Keluar</p>
          <p className="text-xl font-bold text-gray-800">
            {lastPunch.out || "-"}
          </p>
        </div>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={() => handleAttendanceAction("in")}
          disabled={isCheckInDisabled}
          className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg transition-colors ${
            isCheckInDisabled
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700 text-white"
          }`}
        >
          {loading && isCheckInDisabled ? (
            <>
              <CheckIcon className="h-5 w-5" />
              <span>Absen Masuk</span>
            </>
          ) : (
            <>
              <CheckIcon className="h-5 w-5" />
              <span>Absen Masuk</span>
            </>
          )}
        </button>

        <button
          onClick={() => handleAttendanceAction("out")}
          disabled={isCheckOutDisabled}
          className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg transition-colors ${
            isCheckOutDisabled
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700 text-white"
          }`}
        >
          {loading && isCheckOutDisabled ? (
            <>
              <DoorClosedIcon className="h-5 w-5" />
              <span>Absen Keluar</span>
            </>
          ) : (
            <>
              <DoorClosedIcon className="h-5 w-5" />
              <span>Absen Keluar</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
