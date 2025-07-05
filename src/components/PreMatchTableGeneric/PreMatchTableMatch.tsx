"use client";

import { DOMINATION } from "@/constants";
import { useZustandStore } from "@/lib/useZustandStore";
import type { RecordingState } from "@/lib/useZustandStore";
import React from "react";
import PreMatchTableGeneric from "./PreMatchTableGeneric";

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
