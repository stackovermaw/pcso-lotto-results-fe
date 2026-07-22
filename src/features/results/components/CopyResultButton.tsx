import { Check, Copy, X } from "lucide-react";
import { useState } from "react";

import { Button } from "#/components/ui/button";
import { useCopyBuffer } from "#/features/results/hooks/useCopyBuffer";
import { drawBlocks } from "#/features/results/lib/result-utils";
import type { GameEntry } from "#/features/results/types";

export function CopyResultButton({
  name,
  entry,
}: {
  name: string;
  entry: GameEntry;
}) {
  const { isCopied, toggleCard } = useCopyBuffer();
  const [failed, setFailed] = useState(false);

  const copied = isCopied(name);
  const blocks = drawBlocks(name, entry);

  if (blocks.length === 0) return null;

  const handleClick = async () => {
    const ok = await toggleCard(name, blocks);
    setFailed(!ok);
  };

  const label = failed
    ? "Could not copy to clipboard"
    : copied
      ? `Remove ${name} from clipboard`
      : `Copy ${name} results`;

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      onClick={handleClick}
      aria-label={label}
      aria-pressed={copied}
      title={label}
    >
      {failed ? (
        <X className="text-destructive" />
      ) : copied ? (
        <Check className="text-(--lagoon)" />
      ) : (
        <Copy />
      )}
    </Button>
  );
}
