"use client";

import { useZustandStore } from "@/lib/useZustandStore";

export default function History() {
  const matches = useZustandStore((state) => state.matches);
  console.log("jmw matches", JSON.stringify(matches, null, 2));
  return <>history</>;
}
