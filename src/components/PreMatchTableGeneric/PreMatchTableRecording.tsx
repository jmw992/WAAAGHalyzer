"use client";

import { useZustandStore } from "@/lib/useZustandStore";

import PreMatchTableGeneric from "./PreMatchTableGeneric";

export const PreMatchTableRecording = () => {
  const map = useZustandStore((state) => state.map);
  const matchType = useZustandStore((state) => state.matchType);
  const matchNum = useZustandStore((state) => state.matches.length + 1);
  const setMap = useZustandStore((state) => state.setMap);
  const setMatchType = useZustandStore((state) => state.setMatchType);

  const props = {
    map,
    matchType,
    matchNum,
    setMap,
    setMatchType,
  };
  return <PreMatchTableGeneric {...props} />;
};
