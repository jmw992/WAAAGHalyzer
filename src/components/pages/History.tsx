"use client";

import ExampleComboBox from "@/components/ExampleComboBox";
import ExampleTable from "@/components/ExampleTable/ExampleTable";
import MatchTable from "@/components/MatchTable";
import { useZustandStore } from "@/lib/useZustandStore";
import { MatchesTable } from "@/components/MatchesTable";

export default function History() {
  const matches = useZustandStore((state) => state.matches);
  return (
    <>
      <h1>History</h1>
      <p>{JSON.stringify(matches, null, 2)}</p>
      <MatchesTable matches={matches} />
      <ExampleComboBox />
      <MatchTable />
      <ExampleTable />
    </>
  );
}
