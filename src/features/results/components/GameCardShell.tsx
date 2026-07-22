import type { ReactNode } from "react";

import { Card, CardDescription, CardHeader } from "#/components/ui/card";
import { CopyResultButton } from "#/features/results/components/CopyResultButton";
import type { GameEntry } from "#/features/results/types";

function CardAccent() {
  return (
    <div className="border rounded-tl-2xl rounded-br-2xl top-0 left-0 h-full absolute w-2 bg-(--lagoon)" />
  );
}

export function GameCardShell({
  name,
  entry,
  children,
}: {
  name: string;
  // ? absent while the card has nothing to copy yet, e.g. the fallback card
  entry?: GameEntry;
  children: ReactNode;
}) {
  return (
    <Card className="p-0 h-full">
      <CardHeader className="py-2 relative rounded-tl-2xl bg-(--sand)">
        <CardAccent />
        <div className="flex items-center justify-between gap-2">
          <span className="font-black">{name}</span>
          {entry && <CopyResultButton name={name} entry={entry} />}
        </div>
      </CardHeader>
      <CardDescription className="px-2 pb-4">{children}</CardDescription>
    </Card>
  );
}
