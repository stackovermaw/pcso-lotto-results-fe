const ROOT_URL = "http://66.181.46.16/api/v2/results/";

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
