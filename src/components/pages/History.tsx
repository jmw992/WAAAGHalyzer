"use client";

import { MatchesTable } from "@/components/MatchesTable";
import { useZustandStore } from "@/lib/useZustandStore";

export default function History() {
  const matches = useZustandStore((state) => state.matches);
  return (
    <>
      <h1>History</h1>
      <MatchesTable matches={matches} />
    </>
  );
}
