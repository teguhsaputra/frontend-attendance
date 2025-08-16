import { useAttendanceStore } from "@/stores/attendanceStore";

export const StatsCards = () => {
  const { logs } = useAttendanceStore();

  const presentToday = logs.filter((log) => log.clock_in).length;
  const lateArrivals = logs.filter(
    (log) => log.status_in === "Terlambat"
  ).length;
  const earlyDepartures = logs.filter(
    (log) => log.status_out === "Pulang Cepat"
  ).length;

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium text-gray-800">Karyawan</h3>
        </div>
        <p className="text-3xl font-bold text-blue-600">{presentToday}</p>
      </div>
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium text-gray-800">Departemen</h3>
        </div>
        <p className="text-3xl font-bold text-green-600">{lateArrivals}</p>
      </div>
      <div className="bg-white border border-gray-200 rounded-lg p-4 col-span-2">
        <h3 className="font-medium text-gray-800 mb-2">Statistik</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Hadir Hari Ini</span>
            <span className="font-medium">{presentToday}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Keterlambatan</span>
            <span className="font-medium">{lateArrivals}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Pulang Cepat</span>
            <span className="font-medium">{earlyDepartures}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
