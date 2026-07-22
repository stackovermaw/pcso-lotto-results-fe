import { Clock } from "lucide-react";
import { GameCardShell } from "#/features/results/components/GameCardShell";
import { BallRow } from "#/features/results/components/LottoBall";
import {
  isPrizeKey,
  MAJOR_DRAW_TIME,
} from "#/features/results/lib/result-utils";
import type { GameEntry } from "#/features/results/types";

export function MajorLottoCard({
  name,
  entry,
}: {
  name: string;
  entry: GameEntry;
}) {
  const prizeRows = Object.entries(entry).filter(([k]) => isPrizeKey(k));

  return (
    <GameCardShell name={name} entry={entry}>
      <div className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
        <Clock size={16} />
        Drawn at {MAJOR_DRAW_TIME}
      </div>
      <BallRow combination={entry["Winning Combination"]} />
      <hr className="my-3" />
      <p className="text-sm text-muted-foreground text-center">
        Jackpot Prize:{" "}
        <span className="font-bold text-(--lagoon)">
          {entry["Jackpot Prize"]}
        </span>
      </p>
      {entry["Jackpot Winner (6 out of 6)"] !== undefined && (
        <p className="text-xs text-muted-foreground text-center mt-1">
          Jackpot Winner(s):{" "}
          <span className="font-semibold">
            {entry["Jackpot Winner (6 out of 6)"]}
          </span>
        </p>
      )}
      {prizeRows.length > 0 && (
        <>
          <hr className="my-3" />
          <div className="space-y-1">
            {prizeRows.map(([label, value]) => (
              <div
                key={label}
                className="flex justify-between text-xs text-muted-foreground"
              >
                <span>{label}</span>
                <span className="font-semibold text-foreground">{value}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </GameCardShell>
  );
}
