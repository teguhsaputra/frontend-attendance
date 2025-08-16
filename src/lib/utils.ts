export const isSameDay = (dateStr: string, compare: Date) => {
  const logDate = new Date(dateStr).toISOString().split("T")[0];
  const todayDate = compare.toISOString().split("T")[0];
  return logDate === todayDate;
};