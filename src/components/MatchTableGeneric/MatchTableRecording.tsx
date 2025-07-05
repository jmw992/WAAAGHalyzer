import MatchTable from "@/components/MatchTableGeneric/MatchTableGeneric";
import { useZustandStore } from "@/lib/useZustandStore";

export const MatchTableRecordingMatch = () => {
  const playerFaction = useZustandStore((state) => state.playerFaction);
  const opponentFaction = useZustandStore((state) => state.opponentFaction);
  const recordingWin = useZustandStore((state) => state.recordingWin);
  const setPlayerFaction = useZustandStore((state) => state.setPlayerFaction);
  const setOpponentFaction = useZustandStore(
    (state) => state.setOpponentFaction,
  );
  const setRecordingWin = useZustandStore((state) => state.setRecordingWin);

  return (
    <MatchTable
      playerFaction={playerFaction}
      opponentFaction={opponentFaction}
      recordingWin={recordingWin}
      setPlayerFaction={setPlayerFaction}
      setOpponentFaction={setOpponentFaction}
      setRecordingWin={setRecordingWin}
    />
  );
};
