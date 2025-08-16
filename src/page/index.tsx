import { useEffect, useState } from "react";
import { useAttendanceStore } from "@/stores/attendanceStore";
import { useDepartmentStore } from "@/stores/departmentStore";
import { useEmployeeStore } from "@/stores/employeeStore";
import { AttendanceForm } from "@/components/Attendance/AttendanceForm";
import { DepartmentCRUD } from "@/components/DataManagement/DepartmentCRUD";
import { EmployeeCRUD } from "@/components/DataManagement/EmployeeCRUD";
import { SearchAttendance } from "@/components/DataManagement/SearchAttendance";
import { ProfileCard } from "@/components/common/ProfileCard";
import TimeDisplay from "@/components/common/TimeDisplay";
import { AttendanceHistory } from "@/components/Attendance/AttendanceHistory";
import { StatsCards } from "@/components/common/StatsCards";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"absensi" | "data">("absensi");
  const { fetchLogs } = useAttendanceStore();
  const { fetchDepartments } = useDepartmentStore();
  const { fetchEmployees } = useEmployeeStore();

  useEffect(() => {
    const initializeData = async () => {
      try {
        await Promise.all([fetchDepartments(), fetchEmployees(), fetchLogs()]);
      } catch (error) {
        console.error("Initialization error:", error);
      }
    };

    initializeData();
  }, [fetchDepartments, fetchEmployees, fetchLogs]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Sistem Absensi</h1>
          <TimeDisplay />
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Absen</h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => setActiveTab("absensi")}
                  className={`px-4 py-2 rounded-lg ${
                    activeTab === "absensi"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  Absensi
                </button>
                <button
                  onClick={() => setActiveTab("data")}
                  className={`px-4 py-2 rounded-lg ${
                    activeTab === "data"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  Data
                </button>
              </div>
            </div>

            {activeTab === "absensi" ? (
              <>
                <AttendanceForm />
                <AttendanceHistory />
              </>
            ) : (
              <>
                <StatsCards />
                <DepartmentCRUD />
                <EmployeeCRUD />
                <SearchAttendance />
              </>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <ProfileCard />
        </div>
      </main>
    </div>
  );
}
