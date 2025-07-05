"use client";

import { useZustandStore } from "@/lib/useZustandStore";
import { MatchesTable } from "@/components/MatchesTable";

export default function History() {
  const matches = useZustandStore((state) => state.matches);
  return (
    <>
      <h1>History</h1>
      <MatchesTable matches={matches} />
    </>
  );
}
