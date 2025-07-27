"use client";

import { useEffect } from "react";
import { MatchesTable } from "@/components/MatchesTable";
import { useZustandStore } from "@/lib/useZustandStore";

export default function History() {
  const matches = useZustandStore((state) => state.matches);
  const getMatchesDb = useZustandStore((state) => state.getMatchesDb);

  useEffect(() => {
    // Fetch matches from the database when the component mounts
    const matches = getMatchesDb();
    matches
      .then((data) => {
        console.log("Fetched matches from database:", data);
        if (data) {
          useZustandStore.setState({ matches: data });
        }
      })
      .catch((error: unknown) => {
        console.error("Failed to fetch matches from database:", error);
      });
  }, [getMatchesDb]);

  return (
    <>
      <h1>History</h1>
      <MatchesTable matches={matches} />
    </>
  );
}
