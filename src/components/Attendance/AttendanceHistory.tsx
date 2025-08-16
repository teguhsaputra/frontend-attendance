import { useEffect } from "react";
import { useAttendanceStore } from "@/stores/attendanceStore";
import { useEmployeeStore } from "@/stores/employeeStore";
import { AttendanceLog } from "@/types";

export const AttendanceHistory = () => {
  const { logs = [], currentEmployee } = useAttendanceStore();
  const { employees = [] } = useEmployeeStore();

  useEffect(() => {
    console.log("Current Employee ID:", currentEmployee);
    console.log("All Logs:", logs);
    console.log("Employees:", employees);
  }, [currentEmployee, logs, employees]);

  if (!currentEmployee) return null;

  const employeeId = Number(currentEmployee);
  const employeeName = employees.find((e) => e.id === employeeId)?.name || "";

  const employeeLogs = logs
    .filter((log) => {
      const logEmployeeId = Number(log.employee_id);
      return logEmployeeId === employeeId;
    })
    .sort(
      (a, b) => new Date(b.clock_in).getTime() - new Date(a.clock_in).getTime()
    );

  const formatDateTime = (dateString: string | null) => {
    if (!dateString) return "-";
    try {
      const date = new Date(dateString);
      return date.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (error) {
      console.error("Error formatting date:", dateString, error);
      return "-";
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch (error) {
      console.error("Error formatting date:", dateString, error);
      return "-";
    }
  };

  return (
    <div className="mt-6">
      <h3 className="font-medium text-gray-800 mb-2">
        Riwayat Absensi {employeeName}
      </h3>

      {employeeLogs.length === 0 ? (
        <p className="text-gray-500 text-center py-4">
          Tidak ada riwayat absensi
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                  Tanggal
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                  Masuk
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                  Keluar
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {employeeLogs.map((log) => (
                <tr key={log.id}>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(log.clock_in)}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                    {formatDateTime(log.clock_in)}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                    {formatDateTime(log.clock_out)}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        log.status_in === "Tepat Waktu"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {log.status_in}
                    </span>
                    {log.clock_out && (
                      <span
                        className={`ml-2 px-2 py-1 rounded-full text-xs ${
                          log.status_out === "Tepat Waktu"
                            ? "bg-green-100 text-green-800"
                            : log.status_out === "Pulang Cepat"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {log.status_out}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
