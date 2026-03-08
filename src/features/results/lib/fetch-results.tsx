const ROOT_URL =
  "https://server-production-2894.up.railway.app/api/v2/results/";

export const fetchResults = async (
  date: string,
): Promise<{
  date: string;
  results: Record<string, Record<string, string>>;
}> => {
  const response = await fetch(`${ROOT_URL}${date}`);
  if (!response.ok) {
    throw new Error("Failed to fetch results");
  }
  const data = await response.json();
  return data;
};
