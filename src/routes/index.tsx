import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Calendar, ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { Badge } from "#/components/ui/badge";
import { Button } from "#/components/ui/button";
import { Card, CardDescription, CardHeader } from "#/components/ui/card";
import { ScrollArea, ScrollBar } from "#/components/ui/scroll-area";
import { fetchResults } from "#/features/results/lib/fetch-results";
import { formatDate } from "#/features/results/lib/format-date";
import { LOCALE, LOCALE_OPTIONS } from "#/lib/constants";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/")({ component: App });

function App() {
  const [date, setDate] = useState<Date | null>(null);
  const [game, setGame] = useState("all");

  useEffect(() => {
    setDate(new Date());
  }, []);

  const machineDate = useMemo(() => {
    if (!date) return "";
    return date.toISOString().split("T")[0];
  }, [date]);

  const displayDate = useMemo(() => {
    if (!date) return "";

    return date.toLocaleDateString(LOCALE, {
      ...LOCALE_OPTIONS,
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }, [date]);

  const today = useMemo(() => {
    return new Date().toDateString();
  }, []);

  const { data, error, isLoading } = useQuery({
    queryKey: ["lottoResults", displayDate],
    queryFn: async () => {
      const formattedDate = formatDate(displayDate);
      const results = await fetchResults(formattedDate);
      return results;
    },
  });

  const handleGameChange = (game: string) => {
    setGame(game);
  };

  const handlePrevDay = () => {
    if (!date) return;

    const newDate = new Date(date);
    newDate.setDate(date.getDate() - 1);
    setDate(newDate);
  };

  const handleNextDay = () => {
    if (!date) return;

    const newDate = new Date(date);
    newDate.setDate(date.getDate() + 1);
    setDate(newDate);
  };

  if (!date) {
    return null;
  }

  console.log({ data, error });

  return (
    <main className="page-wrap px-4 pb-8 pt-14">
      <Card className="flex items-center">
        <CardDescription className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={handlePrevDay}>
            <ChevronLeft size={18} />
          </Button>

          <div>
            <time
              dateTime={machineDate}
              className="text-sm flex items-center text-muted-foreground gap-2"
            >
              <Calendar size={18} className="mr-1" />
              {displayDate}
              {date.toDateString() === today && <Badge>Today</Badge>}
            </time>
          </div>

          <Button
            variant="ghost"
            size="icon"
            disabled={date.toDateString() === today}
            onClick={handleNextDay}
          >
            <ChevronRight size={18} />
          </Button>
        </CardDescription>
      </Card>

      <ScrollArea className="w-full my-4 rounded-md border whitespace-nowrap">
        <div className="flex space-x-4 p-4">
          <Button
            variant={game === "all" ? "default" : "outline"}
            onClick={() => handleGameChange("all")}
          >
            All Games
          </Button>
          <Button
            variant={game === "6/58" ? "default" : "outline"}
            onClick={() => handleGameChange("6/58")}
          >
            6/58 Ultra Lotto
          </Button>
          <Button
            variant={game === "6/55" ? "default" : "outline"}
            onClick={() => handleGameChange("6/55")}
          >
            6/55 Grand Lotto
          </Button>
          <Button
            variant={game === "6/49" ? "default" : "outline"}
            onClick={() => handleGameChange("6/49")}
          >
            6/49 Super Lotto
          </Button>
          <Button
            variant={game === "6/45" ? "default" : "outline"}
            onClick={() => handleGameChange("6/45")}
          >
            6/45 Mega Lotto
          </Button>
          <Button
            variant={game === "6/42" ? "default" : "outline"}
            onClick={() => handleGameChange("6/42")}
          >
            6/42 Lotto
          </Button>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <section>
          <Card className="p-0">
            <CardHeader className="py-2 relative rounded-tl-2xl bg-(--sand)">
              <div className="border rounded-tl-2xl rounded-br-2xl top-0 left-0 h-full absolute w-2 bg-(--lagoon)"></div>
              <span className="font-black">6/58 Ultra Lotto</span>
            </CardHeader>
            <CardDescription className="px-2 pb-4">
              <div className="text-sm text-muted-foreground flex items-center gap-2">
                <Clock size={18} className="mr-1" />
                Drawn at 9:00 PM
              </div>
              <section className="flex items-center flex-wrap justify-center gap-3 mt-4">
                {[8, 17, 23, 35, 42, 56].map((num) => (
                  <div
                    key={num}
                    className="w-12 h-12 flex rounded-3xl border-2 border-(--lagoon) items-center justify-center bg-(--lagoon)/20"
                  >
                    <span className="font-black text-lg">{num}</span>
                  </div>
                ))}
              </section>
              <hr className="my-3" />
              <span className="text-sm text-muted-foreground text-center block">
                Jackpot Prize:{" "}
                <span className="font-bold text-(--lagoon)">
                  ₱ 100,000,000.00
                </span>
              </span>
            </CardDescription>
          </Card>
        </section>

        <section>
          <Card className="p-0">
            <CardHeader className="py-2 relative rounded-tl-2xl bg-(--sand)">
              <div className="border rounded-tl-2xl rounded-br-2xl top-0 left-0 h-full absolute w-2 bg-(--lagoon)"></div>
              <span className="font-black">6/58 Ultra Lotto</span>
            </CardHeader>
            <CardDescription className="px-2 pb-4 ">
              <Tabs defaultValue="2:00PM" className="">
                <TabsList className="w-full" variant="line">
                  <TabsTrigger value="2:00PM">2:00PM</TabsTrigger>
                  <TabsTrigger value="5:00PM">5:00PM</TabsTrigger>
                  <TabsTrigger value="9:00PM">9:00PM</TabsTrigger>
                </TabsList>
                <TabsContent value="2:00PM">
                  <section className="flex items-center flex-wrap justify-center gap-3 mt-4">
                    {[8, 28].map((num) => (
                      <div
                        key={num}
                        className="w-12 h-12 flex rounded-3xl border-2 border-(--lagoon) items-center justify-center bg-(--lagoon)/20"
                      >
                        <span className="font-black text-lg">{num}</span>
                      </div>
                    ))}
                  </section>
                </TabsContent>
                <TabsContent value="5:00PM">
                  <section className="flex items-center flex-wrap justify-center gap-3 mt-4">
                    {[15, 21].map((num) => (
                      <div
                        key={num}
                        className="w-12 h-12 flex rounded-3xl border-2 border-(--lagoon) items-center justify-center bg-(--lagoon)/20"
                      >
                        <span className="font-black text-lg">{num}</span>
                      </div>
                    ))}
                  </section>
                </TabsContent>
                <TabsContent value="9:00PM">
                  <section className="flex items-center flex-wrap justify-center gap-3 mt-4">
                    {[1, 11].map((num) => (
                      <div
                        key={num}
                        className="w-12 h-12 flex rounded-3xl border-2 border-(--lagoon) items-center justify-center bg-(--lagoon)/20"
                      >
                        <span className="font-black text-lg">{num}</span>
                      </div>
                    ))}
                  </section>
                </TabsContent>
              </Tabs>
            </CardDescription>
          </Card>
        </section>
      </section>
    </main>
  );
}
