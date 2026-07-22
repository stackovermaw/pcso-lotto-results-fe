import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";

import {
  DateNav,
  FallbackCard,
  GameFilter,
  ResultCard,
  SkeletonCard,
} from "#/features/results/components";
import { useCopyBuffer } from "#/features/results/hooks/useCopyBuffer";
import { useResults } from "#/features/results/hooks/useResults";
import { LOCALE, LOCALE_OPTIONS } from "#/lib/constants";

export const Route = createFileRoute("/")({ component: App });

function App() {
  const [date, setDate] = useState<Date | null>(null);
  const [game, setGame] = useState("all");

  useEffect(() => {
    setDate(new Date());
  }, []);

  const machineDate = useMemo(() => {
    if (!date) return "";
    return date.toISOString().split("T")[0];
  }, [date]);

  const displayDate = useMemo(() => {
    if (!date) return "";
    return date.toLocaleDateString(LOCALE, {
      ...LOCALE_OPTIONS,
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }, [date]);

  const today = useMemo(() => new Date().toDateString(), []);

  const { data, error, isLoading, filteredGames, missingGames } =
    useResults(displayDate, game);

  const { copied, clearAll } = useCopyBuffer();

  const handlePrevDay = () => {
    if (!date) return;
    const next = new Date(date);
    next.setDate(date.getDate() - 1);
    setDate(next);
  };
 
  const handleNextDay = () => {
    if (!date) return;
    const next = new Date(date);
    next.setDate(date.getDate() + 1);
    setDate(next);
  };

  if (!date) return null;

  const visibleGames = filteredGames(game);

  return (
    <main className="page-wrap px-4 pb-8 pt-14">
      <DateNav
        machineDate={machineDate}
        displayDate={displayDate}
        isToday={date.toDateString() === today}
        onPrev={handlePrevDay}
        onNext={handleNextDay}
      />

      <GameFilter activeGame={game} onChange={setGame} />

      {copied.length > 0 && (
        <p className="text-sm text-muted-foreground flex items-center gap-2">
          <span>
            {copied.length} {copied.length === 1 ? "result" : "results"} copied
          </span>
          <button
            type="button"
            onClick={clearAll}
            className="underline underline-offset-2 hover:text-foreground"
          >
            Clear
          </button>
        </p>
      )}

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        {visibleGames.map((name) => {
          if (isLoading) return <SkeletonCard key={name} name={name} />;
          if (error) return <FallbackCard key={name} name={name} />;
          const entry = data?.results[name];
          if (!entry) return null;
          return <ResultCard key={name} name={name} entry={entry} />;
        })}
      </section>

      {missingGames.length > 0 && (
        <p className="text-sm text-muted-foreground text-center mt-2">
          No results for {missingGames.join(", ")} on this date.
        </p>
      )}
    </main>
  );
}
