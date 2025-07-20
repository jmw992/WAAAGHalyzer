import MatchTable from "@/components/MatchTableGeneric/MatchTableGeneric";
import { useZustandStore } from "@/lib/useZustandStore";

export const MatchTableRecordingMatch = () => {
  const player1Faction = useZustandStore((state) => state.player1Faction);
  const player2Faction = useZustandStore((state) => state.player2Faction);
  const recordingWin = useZustandStore((state) => state.recordingWin);
  const setPlayer1Faction = useZustandStore((state) => state.setPlayer1Faction);
  const setPlayer2Faction = useZustandStore((state) => state.setPlayer2Faction);
  const setRecordingWin = useZustandStore((state) => state.setRecordingWin);

  return (
    <MatchTable
      player1Faction={player1Faction}
      player2Faction={player2Faction}
      recordingWin={recordingWin}
      setPlayer1Faction={setPlayer1Faction}
      setPlayer2Faction={setPlayer2Faction}
      setRecordingWin={setRecordingWin}
    />
  );
};
