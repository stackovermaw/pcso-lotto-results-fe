import { useQuery } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";

import { fetchResults } from "#/features/results/lib/fetch-results";
import { formatDate } from "#/features/results/lib/format-date";
import { KNOWN_GAMES } from "#/features/results/lib/game-config";
import { baseGameName } from "#/features/results/lib/result-utils";

export function useResults(displayDate: string, activeGame: string) {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["lottoResults", displayDate],
    queryFn: async () => {
      const formattedDate = formatDate(displayDate);
      return fetchResults(formattedDate);
    },
  });

  // ? a known game can come back as several city entries, so we swap it for
  // ? whichever ones the api actually returned and keep the rest as is
  const expectedGames = useMemo(() => {
    const names = Object.keys(data?.results ?? {});

    return KNOWN_GAMES.flatMap((game) => {
      const cityVariants = names.filter((name) => baseGameName(name) === game);
      return cityVariants.length > 0 ? cityVariants : [game];
    });
  }, [data]);

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
