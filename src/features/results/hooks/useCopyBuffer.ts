import { useCallback, useSyncExternalStore } from "react";

import {
  clear,
  clipboardText,
  getServerSnapshot,
  getSnapshot,
  subscribe,
  toggle,
} from "#/features/results/lib/copy-buffer";

export function useCopyBuffer() {
  const copied = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const copyToClipboard = useCallback(async (text: string) => {
    // ? clipboard writes need a secure context, so this can legitimately fail
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return false;
    }
  }, []);

  const toggleCard = useCallback(
    async (name: string, blocks: string[]) => {
      return copyToClipboard(toggle(name, blocks));
    },
    [copyToClipboard],
  );

  const clearAll = useCallback(async () => {
    clear();
    return copyToClipboard("");
  }, [copyToClipboard]);

  return {
    copied,
    isCopied: (name: string) => copied.some((card) => card.name === name),
    text: clipboardText(copied),
    toggleCard,
    clearAll,
  };
}
