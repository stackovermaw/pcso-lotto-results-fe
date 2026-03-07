import { RefreshCw, Wifi, WifiOff } from "lucide-react";
import { useEffect, useState } from "react";
import { sileo } from "sileo";

import ThemeToggle from "./ThemeToggle";
import { Button } from "./ui/button";
import { TypographyH3 } from "./ui/h3";

export default function Header() {
  const [isOnline, setIsOnline] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [displayDate, setDisplayDate] = useState("");

  useEffect(() => {
    setIsOnline(navigator.onLine);
    setDisplayDate(
      new Intl.DateTimeFormat("en-PH", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "Asia/Manila",
      }).format(new Date()),
    );

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-background p-5 border-b border-(--border-base) flex justify-between">
      <section>
        <TypographyH3>Lotto Results</TypographyH3>
        <span>{displayDate}</span>
      </section>
      <section className="flex items-center gap-2">
        {isOnline ? (
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
