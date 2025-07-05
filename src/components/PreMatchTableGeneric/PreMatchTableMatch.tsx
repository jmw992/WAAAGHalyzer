"use client";

import { useZustandStore } from "@/lib/useZustandStore";
import React from "react";
import type { RecordingState } from "@/lib/useZustandStore";
import PreMatchTableGeneric from "./PreMatchTableGeneric";
import { DOMINATION } from "@/constants";

export const PreMatchTableMatch = ({ index: idx }: { index: number }) => {
  const { map, matchNum, matchType, matches, setMatch } = useZustandStore(
    (state) => ({
      map: state.matches[idx].map,
      matchType: state.matches[idx].matchType,
      matchNum: state.matches[idx].index,
      matches: state.matches,
      setMatch: state.setMatch,
    }),
  );
  const setMap = (map: string | null) => {
    setMatch(idx, { ...matches[idx], map: map ?? "" });
  };
  const setMatchType = (matchType: RecordingState["matchType"] | null) => {
    setMatch(idx, { ...matches[idx], matchType: matchType ?? DOMINATION });
  };
  return (
    <PreMatchTableGeneric
      {...{ map, matchNum, matchType, setMatchType, setMap }}
    />
  );
};
