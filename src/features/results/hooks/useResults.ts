import { useQuery } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";

import { fetchResults } from "#/features/results/lib/fetch-results";
import { formatDate } from "#/features/results/lib/format-date";
import { KNOWN_GAMES } from "#/features/results/lib/game-config";

export function useResults(displayDate: string, activeGame: string) {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["lottoResults", displayDate],
    queryFn: async () => {
      const formattedDate = formatDate(displayDate);
      return fetchResults(formattedDate);
    },
  });

  const expectedGames = useMemo(() => {
    return [...KNOWN_GAMES];
  }, []);

  const filteredGames = useCallback(
    (game: string) => {
      if (game === "all") return expectedGames;
      return expectedGames.filter((name) => name.includes(game));
    },
    [expectedGames],
  );

  const missingGames = useMemo(() => {
    if (!data?.results || isLoading || error) return [];
    return filteredGames(activeGame).filter((name) => !data.results[name]);
  }, [data, activeGame, filteredGames, isLoading, error]);

  return {
    data,
    error,
    isLoading,
    refetch,
    expectedGames,
    filteredGames,
    missingGames,
  };
}
