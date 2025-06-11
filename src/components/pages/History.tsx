"use client";

import ExampleComboBox from "@/components/ExampleComboBox";
import ExampleTable from "@/components/ExampleTable/ExampleTable";
import MatchTable from "@/components/MatchTable";
import { useZustandStore } from "@/lib/useZustandStore";

export default function History() {
  const matches = useZustandStore((state) => state.matches);
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
