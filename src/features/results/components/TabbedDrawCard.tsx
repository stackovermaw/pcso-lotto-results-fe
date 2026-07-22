import { Tabs, TabsContent, TabsList, TabsTrigger } from "#/components/ui/tabs";
import { GameCardShell } from "#/features/results/components/GameCardShell";
import { BallRow } from "#/features/results/components/LottoBall";
import { isTimeKey } from "#/features/results/lib/result-utils";
import type { GameEntry } from "#/features/results/types";

export function TabbedDrawCard({
  name,
  entry,
}: {
  name: string;
  entry: GameEntry;
}) {
  const draws = Object.entries(entry).filter(([k]) => isTimeKey(k));
  const defaultTab = draws[0]?.[0] ?? "";

  return (
    <GameCardShell name={name} entry={entry}>
      <Tabs defaultValue={defaultTab}>
        <TabsList className="w-full mt-1" variant="line">
          {draws.map(([time]) => (
            <TabsTrigger key={time} value={time}>
              {time}
            </TabsTrigger>
          ))}
        </TabsList>
        {draws.map(([time, combo]) => (
          <TabsContent key={time} value={time}>
            <BallRow combination={combo} />
          </TabsContent>
        ))}
      </Tabs>
    </GameCardShell>
  );
}
