const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchDepartments = async () => {
  const res = await fetch(`${BASE_URL}/api/departements`);
  return await res.json();
};

export const fetchEmployees = async () => {
  const res = await fetch(`${BASE_URL}/api/employees`);
  const data = await res.json();
  return Array.isArray(data) ? data : data.data;
};

export const fetchLogs = async () => {
  const res = await fetch(`${BASE_URL}/api/attendance/logs`);
  const data = await res.json();
  return Array.isArray(data) ? data : data.data;
};

export const checkIn = async (employee_id: number) => {
  return await fetch(`${BASE_URL}/api/attendance/check-in`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ employee_id }),
  });
};

export const checkOut = async (logId: number) => {
  return await fetch(`${BASE_URL}/api/attendance/check-out/${logId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  });
};
