import { useState, useEffect } from "react";
import { PencilIcon, TrashIcon, PlusIcon } from "lucide-react";
import { useEmployeeStore } from "@/stores/employeeStore";
import { useDepartmentStore } from "@/stores/departmentStore";
import { Modal } from "../common/Modal";
import { Employee } from "@/types";
import { toast } from "react-toastify";

export const EmployeeCRUD = () => {
  const {
    employees,
    loading,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    fetchEmployees,
  } = useEmployeeStore();

  const { departments } = useDepartmentStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState<Employee | null>(null);
  const [nextEmployeeId, setNextEmployeeId] = useState("");

  useEffect(() => {
    if (employees.length > 0) {
      const lastId = Math.max(
        ...employees.map((emp) => {
          const idNum = parseInt(emp.employee_id.replace("EMP-", ""));
          return isNaN(idNum) ? 0 : idNum;
        })
      );
      setNextEmployeeId(`EMP-${lastId + 1}`);
    } else {
      setNextEmployeeId("EMP-1");
    }
  }, [employees]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      employee_id: formData.get("employeeId") as string,
      name: formData.get("name") as string,
      address: formData.get("address") as string,
      departement_id: Number(formData.get("departmentId")),
    };

    try {
      let success = false;
      if (currentEmployee) {
        success = await updateEmployee(currentEmployee.id, data);
      } else {
        success = await addEmployee(data);
      }

      if (success) {
        setIsModalOpen(false);
        await fetchEmployees();
      }
    } catch (error) {
      console.error("Error submitting employee:", error);
      toast.error("Terjadi kesalahan saat memproses karyawan");
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus karyawan ini?")) {
      const success = await deleteEmployee(id);
      if (success) {
        await fetchEmployees();
      }
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mt-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium text-gray-800">Daftar Karyawan</h3>
        <button
          onClick={() => {
            setCurrentEmployee(null);
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
                ID
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Nama
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Alamat
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Departemen
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {employees.map((emp) => (
              <tr key={emp.id}>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                  {emp.employee_id}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                  {emp.name}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                  {emp.address}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                  {emp.departement?.departement_name || "-"}
                </td>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                  <button
                    onClick={() => {
                      setCurrentEmployee(emp);
                      setIsModalOpen(true);
                    }}
                    className="text-blue-600 hover:text-blue-800 mr-2"
                    disabled={loading}
                  >
                    <PencilIcon className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(emp.id)}
                    className="text-red-600 hover:text-red-800"
                    disabled={loading}
                  >
                    {loading ? (
                      <TrashIcon className="h-4 w-4" />
                    ) : (
                      <TrashIcon className="h-4 w-4" />
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h3 className="text-lg font-medium text-gray-800 mb-4">
          {currentEmployee ? "Edit" : "Tambah"} Karyawan
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ID Karyawan
              </label>
              <input
                type="text"
                name="employeeId"
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                value={currentEmployee?.employee_id || nextEmployeeId}
                disabled
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama
              </label>
              <input
                type="text"
                name="name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                defaultValue={currentEmployee?.name || ""}
                required
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Alamat
              </label>
              <input
                type="text"
                name="address"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                defaultValue={currentEmployee?.address || ""}
                required
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Departemen
              </label>
              <select
                name="departmentId"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                defaultValue={currentEmployee?.departement_id || ""}
                required
                disabled={loading}
              >
                <option value="">Pilih Departemen</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.departement_name}
                  </option>
                ))}
              </select>
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
