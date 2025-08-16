import { useState } from "react";
import { PencilIcon, TrashIcon, PlusIcon } from "lucide-react";
import { useDepartmentStore } from "@/stores/departmentStore";
import { Modal } from "../common/Modal";
import { Department } from "@/types";
import { toast } from "sonner";

export const DepartmentCRUD = () => {
  const {
    departments,
    loading,
    addDepartment,
    updateDepartment,
    deleteDepartment,
  } = useDepartmentStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDepartment, setCurrentDepartment] = useState<Department | null>(
    null
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      departement_name: formData.get("name") as string,
      max_clock_in_time: `${formData.get("clockIn")}:00`,
      max_clock_out_time: `${formData.get("clockOut")}:00`,
    };

    try {
      let success = false;
      if (currentDepartment) {
        success = await updateDepartment(currentDepartment.id, data);
      } else {
        success = await addDepartment(data);
      }

      if (success) {
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Error submitting department:", error);
      toast.error("Terjadi kesalahan saat memproses departemen");
    }
  };

  const handleDelete = async (id: number) => {
    window.confirm("Apakah Anda yakin ingin menghapus departemen ini?") &&
      (await deleteDepartment(id));
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mt-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium text-gray-800">Daftar Departemen</h3>
        <button
          onClick={() => {
            setCurrentDepartment(null);
            setIsModalOpen(true);
          }}
          className="text-blue-600 hover:text-blue-800"
          disabled={loading}
        >
          <PlusIcon className="h-5 w-5" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Nama
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Jam Masuk
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Jam Keluar
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {departments.map((dept) => (
              <tr key={dept.id}>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                  {dept.departement_name}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                  {dept.max_clock_in_time}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                  {dept.max_clock_out_time}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                  <button
                    onClick={() => {
                      setCurrentDepartment(dept);
                      setIsModalOpen(true);
                    }}
                    className="text-blue-600 hover:text-blue-800 mr-2"
                    disabled={loading}
                  >
                    <PencilIcon className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(dept.id)}
                    className="text-red-600 hover:text-red-800"
                    disabled={loading}
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h3 className="text-lg font-medium text-gray-800 mb-4">
          {currentDepartment ? "Edit" : "Tambah"} Departemen
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama Departemen
              </label>
              <input
                type="text"
                name="name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                defaultValue={currentDepartment?.departement_name || ""}
                required
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Batas Waktu Check-in
              </label>
              <input
                type="time"
                name="clockIn"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                defaultValue={
                  currentDepartment?.max_clock_in_time?.slice(0, 5) || "08:00"
                }
                required
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Batas Waktu Check-out
              </label>
              <input
                type="time"
                name="clockOut"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                defaultValue={
                  currentDepartment?.max_clock_out_time?.slice(0, 5) || "17:00"
                }
                required
                disabled={loading}
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md"
                disabled={loading}
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md"
                disabled={loading}
              >
                {loading ? "Memproses..." : "Simpan"}
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};
