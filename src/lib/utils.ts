export const isSameDay = (dateStr: string, compare: Date) => {
  const logDate = new Date(dateStr).toISOString().split("T")[0];
  const todayDate = compare.toISOString().split("T")[0];
  return logDate === todayDate;
};

export function normalizeResponse(res: any) {
  if (!res) return [];
  if (Array.isArray(res)) return res;
  if (Array.isArray(res.data)) return res.data;
  if (Array.isArray(res.data?.data)) return res.data.data;
  return [];
}
