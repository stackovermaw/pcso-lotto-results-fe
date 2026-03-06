import { MONTHS } from "#/lib/constants";

export const formatDate = (date: string) => {
  const [month, day, year] = date.toLowerCase().split(" ");

  const monthIndex = MONTHS.indexOf(month);

  if (monthIndex === -1) {
    throw new Error(`Invalid month: ${month}`);
  }

  return `${MONTHS[monthIndex]}-${parseInt(day, 10)}-${year}`;
};
