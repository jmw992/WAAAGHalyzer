"use client";

import { DOMINATION } from "@/constants";
import type { RecordingState } from "@/lib/useZustandStore";
import { useZustandStore } from "@/lib/useZustandStore";
import PreMatchTableGeneric from "./PreMatchTableGeneric";

export const PreMatchTableMatch = ({ index: idx }: { index: number }) => {
  const {
    map,
    matchNum,
    matchType,
    matches,
    player1Id,
    player2Id,
    setMatch,
    setPlayer1Id,
    setPlayer2Id,
  } = useZustandStore((state) => ({
    map: state.matches[idx].map,
    matchType: state.matches[idx].matchType,
    matchNum: state.matches[idx].recordingNumber,
    matches: state.matches,
    player1Id: state.matches[idx].player1Id,
    player2Id: state.matches[idx].player2Id,
    setMatch: state.setMatch,
    setPlayer1Id: state.setPlayer1Id,
    setPlayer2Id: state.setPlayer2Id,
  }));
  const setMap = (map: string | null) => {
    setMatch(idx, { ...matches[idx], map: map ?? "" });
  };
  const setMatchType = (matchType: RecordingState["matchType"] | null) => {
    setMatch(idx, { ...matches[idx], matchType: matchType ?? DOMINATION });
  };
  return (
    <PreMatchTableGeneric
      {...{
        map,
        matchNum,
        matchType,
        player1Id,
        player2Id,
        setMatchType,
        setMap,
        setPlayer1Id,
        setPlayer2Id,
      }}
    />
  );
};
