import { useAttendanceStore } from "@/stores/attendanceStore";
import { useEmployeeStore } from "@/stores/employeeStore";

export const ProfileCard = () => {
  const { currentEmployee } = useAttendanceStore();
  const { employees } = useEmployeeStore();

  const employee = employees.find((e) => e.id === currentEmployee);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 text-center">
      <div className="w-20 h-20 mx-auto rounded-full bg-gray-200 mb-4 flex items-center justify-center">
        <span className="text-2xl font-semibold text-gray-600">
          {employee?.name.charAt(0) || "U"}
        </span>
      </div>
      <h2 className="text-xl font-semibold text-gray-800">
        {employee ? `Hai, ${employee.name.split(" ")[0]}` : "Hai, Pengguna"}
      </h2>
      <p className="text-gray-500 mb-4">Semoga hari Anda menyenangkan</p>
    </div>
  );
};
