import { Clock } from "lucide-react";
import { GameCardShell } from "#/features/results/components/GameCardShell";
import { BallRow } from "#/features/results/components/LottoBall";
import { isTimeKey } from "#/features/results/lib/result-utils";
import type { GameEntry } from "#/features/results/types";

export function FourDCard({ name, entry }: { name: string; entry: GameEntry }) {
  const drawTimeKey = Object.keys(entry).find(isTimeKey);
  const combination = drawTimeKey ? entry[drawTimeKey] : null;

  return (
    <GameCardShell name={name} entry={entry}>
      {drawTimeKey && (
        <div className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
          <Clock size={16} />
          Drawn at {drawTimeKey}
        </div>
      )}
      {combination && <BallRow combination={combination} />}
      <hr className="my-3" />
      <p className="text-sm text-muted-foreground text-center">
        First Prize:{" "}
        <span className="font-bold text-(--lagoon)">
          {entry["First Prize"]}
        </span>
      </p>
      {entry["Number of Winner(s)"] !== undefined && (
        <p className="text-xs text-muted-foreground text-center mt-1">
          Winner(s):{" "}
          <span className="font-semibold">{entry["Number of Winner(s)"]}</span>
        </p>
      )}
    </GameCardShell>
  );
}
