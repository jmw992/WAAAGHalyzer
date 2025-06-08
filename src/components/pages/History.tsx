"use client";

import { useZustandStore } from "@/lib/useZustandStore";
import ExampleTable from "@/components/ExampleTable/ExampleTable";
import MatchTable from "@/components/MatchTable";
import ExampleComboBox from "@/components/ExampleComboBox";

export default function History() {
  const matches = useZustandStore((state) => state.matches);
  const playerFaction = useZustandStore((state) => state.playerFaction);
  console.log("jmw matches", JSON.stringify(matches, null, 2));
  return (
    <>
      <h1>History</h1>
      <ExampleComboBox />
      <MatchTable />
      <ExampleTable />
    </>
  );
}
