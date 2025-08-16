import { useState } from "react";
import { SearchIcon } from "lucide-react";
import { useAttendanceStore } from "@/stores/attendanceStore";
import { useDepartmentStore } from "@/stores/departmentStore";
import { toast } from "sonner";

export const SearchAttendance = () => {
  const { searchResults, searchLogs } = useAttendanceStore();
  const { departments } = useDepartmentStore();
  const [searchDate, setSearchDate] = useState("");
  const [searchDepartment, setSearchDepartment] = useState(0);

  const handleSearch = async () => {
    try {
      await searchLogs({
        date: searchDate,
        department_id: searchDepartment || undefined,
      });
    } catch (error) {
      toast.error("Gagal melakukan pencarian", {
        description: "Terjadi kesalahan saat memproses permintaan",
      });
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mt-4">
      <h3 className="font-medium text-gray-800 mb-4">Cari Riwayat Absensi</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tanggal
          </label>
          <input
            type="date"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Departemen
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            value={searchDepartment}
            onChange={(e) => setSearchDepartment(Number(e.target.value))}
          >
            <option value="0">Semua Departemen</option>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.departement_name}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={handleSearch}
          className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
        >
          <SearchIcon className="h-5 w-5" />
          <span>Cari</span>
        </button>
      </div>

      {searchResults.length > 0 ? (
        <div className="mt-6">
          <h3 className="font-medium text-gray-800 mb-2">Hasil Pencarian</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Nama
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                    Departemen
                  </th>
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
                {searchResults.map((log) => (
                  <tr key={log.id}>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                      {log.employee?.name || "-"}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                      {log.employee?.departement?.departement_name || "-"}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                      {new Date(log.clock_in).toLocaleDateString("id-ID")}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                      {new Date(log.clock_in).toLocaleTimeString()}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                      {log.clock_out
                        ? new Date(log.clock_out).toLocaleTimeString()
                        : "-"}
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
        </div>
      ) : (
        <div className="mt-6 text-center text-gray-500 py-4">
          {searchDate || searchDepartment > 0
            ? "Tidak ada data yang cocok dengan kriteria pencarian"
            : "Masukkan kriteria pencarian untuk melihat hasil"}
        </div>
      )}
    </div>
  );
};
