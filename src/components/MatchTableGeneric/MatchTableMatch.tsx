import MatchTable from "@/components/MatchTableGeneric/MatchTableGeneric";
import { BEASTMEN } from "@/constants";
import { useZustandStore } from "@/lib/useZustandStore";
import type { Faction } from "@/types";

export const MatchTableMatch = ({ index }: { index: number }) => {
  const matches = useZustandStore((state) => state.matches);
  const setMatch = useZustandStore((state) => state.setMatch);
  const match = matches[index];
  const { playerFaction, opponentFaction, win } = match;

  const setPlayer = (faction: Faction | null) => {
    setMatch(index, { ...match, playerFaction: faction ?? BEASTMEN });
  };
  const setOpponent = (faction: Faction | null) => {
    setMatch(index, { ...match, opponentFaction: faction ?? BEASTMEN });
  };
  const setWin = (w: boolean | null) => {
    setMatch(index, { ...match, win: w ?? true });
  };

  return (
    <MatchTable
      playerFaction={playerFaction}
      opponentFaction={opponentFaction}
      recordingWin={win}
      setPlayerFaction={setPlayer}
      setOpponentFaction={setOpponent}
      setRecordingWin={setWin}
    />
  );
};
