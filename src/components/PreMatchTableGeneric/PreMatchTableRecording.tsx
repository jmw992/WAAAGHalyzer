"use client";

import { useZustandStore } from "@/lib/useZustandStore";

import PreMatchTableGeneric from "./PreMatchTableGeneric";

export const PreMatchTableRecording = () => {
  const map = useZustandStore((state) => state.map);
  const matchType = useZustandStore((state) => state.matchType);
  const matchNum = useZustandStore((state) => state.recordingNumber ?? 0);
  const player1Id = useZustandStore((state) => state.player1Id);
  const player2Id = useZustandStore((state) => state.player2Id);
  const setPlayer1Id = useZustandStore((state) => state.setPlayer1Id);
  const setPlayer2Id = useZustandStore((state) => state.setPlayer2Id);
  const setMap = useZustandStore((state) => state.setMap);
  const setMatchType = useZustandStore((state) => state.setMatchType);
  const playerId = useZustandStore((state) => state.playerId);

  const props = {
    map,
    matchType,
    matchNum,
    player1Id,
    player2Id,
    defaultPlayer1Id: playerId,
    setPlayer1Id,
    setPlayer2Id,
    setMap,
    setMatchType,
  };
  return <PreMatchTableGeneric {...props} />;
};
