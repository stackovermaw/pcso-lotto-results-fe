// ? cards are siblings, so the copied draws live in a tiny store instead of
// ? being threaded through every card. clicking another card appends to what
// ? is already there, clicking the same one again takes it back out.
type CopiedCard = {
  name: string;
  blocks: string[];
};

const EMPTY: CopiedCard[] = [];

let copied: CopiedCard[] = EMPTY;
const listeners = new Set<() => void>();

const emit = () => {
  for (const listener of listeners) listener();
};

export const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

export const getSnapshot = () => copied;

// ? nothing is ever copied while rendering on the server
export const getServerSnapshot = () => EMPTY;

export const clipboardText = (cards: CopiedCard[]) =>
  cards.flatMap((card) => card.blocks).join("\n\n");

export const toggle = (name: string, blocks: string[]) => {
  const isCopied = copied.some((card) => card.name === name);

  copied = isCopied
    ? copied.filter((card) => card.name !== name)
    : [...copied, { name, blocks }];

  emit();
  return clipboardText(copied);
};

export const clear = () => {
  copied = EMPTY;
  emit();
};
