import type { GameEntry } from "#/features/results/types";

export const TIME_RE = /^\d{1,2}:\d{2}\s?(AM|PM)$/i;
export const isTimeKey = (k: string) => TIME_RE.test(k);

const PRIZE_PREFIXES = ["2nd", "3rd", "4th", "5th"] as const;
export const isPrizeKey = (k: string) =>
  PRIZE_PREFIXES.some((p) => k.startsWith(p));

// ? the api suffixes the city when a game is drawn in more than one of them
// ? on the same date, e.g. "STL Swer3 (Lapu-Lapu City)"
export const CITY_RE = /^(.+?) \((.+ City)\)$/i;

export const baseGameName = (name: string) => name.match(CITY_RE)?.[1] ?? name;

export const cityOf = (name: string) => name.match(CITY_RE)?.[2] ?? null;

// ? major lotto entries carry no draw time, they are always drawn at 9pm
export const MAJOR_DRAW_TIME = "9:00 PM";

// ? one block per draw, since a card can hold several of them
export function drawBlocks(name: string, entry: GameEntry): string[] {
  const draws = Object.entries(entry).filter(([key]) => isTimeKey(key));

  if (draws.length === 0) {
    const combination = entry["Winning Combination"];
    return combination ? [`${name} - ${MAJOR_DRAW_TIME}\n${combination}`] : [];
  }

  return draws.map(([time, combination]) => `${name} - ${time}\n${combination}`);
}

export type CardType = "major" | "4d" | "tabbed";

export function cardType(entry: GameEntry): CardType {
  if ("Winning Combination" in entry) return "major";
  if ("First Prize" in entry) return "4d";
  return "tabbed";
}
