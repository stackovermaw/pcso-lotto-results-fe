import { Link } from "@tanstack/react-router";
import { RefreshCw, Wifi, WifiOff } from "lucide-react";
import { useState } from "react";
import { sileo } from "sileo";

import ThemeToggle from "./ThemeToggle";
import { Button } from "./ui/button";
import { TypographyH3 } from "./ui/h3";

export default function Header() {
  const now = new Date();
  const [isRefreshing, setIsRefreshing] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg--background p-5 border-b border-(--border-base) flex justify-between">
      <section>
        <TypographyH3>Lotto Results</TypographyH3>
        <span>
          {new Intl.DateTimeFormat("en-PH", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            timeZone: "Asia/Manila",
          }).format(now)}
        </span>
      </section>

      <section className="flex items-center gap-2">
        {navigator.onLine ? (
          <Wifi className="text-(--lagoon)" size={18} />
        ) : (
          <WifiOff size={18} />
        )}

        <Button
          size="icon"
          variant="outline"
          disabled={isRefreshing}
          onClick={() => {
            setIsRefreshing((prev) => !prev);

            setTimeout(() => {
              setIsRefreshing(false);
              sileo.success({
                title: "Refreshed",
                description: "The lotto results have been refreshed.",
              });
            }, 2000);
          }}
        >
          <RefreshCw
            className={`transition-transform ${isRefreshing ? "animate-spin" : ""}`}
            size={18}
          />
        </Button>
        <ThemeToggle />
      </section>
    </header>
  );
}
