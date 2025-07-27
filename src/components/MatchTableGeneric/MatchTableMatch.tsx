import MatchTable from "@/components/MatchTableGeneric/MatchTableGeneric";
import { useZustandStore } from "@/lib/useZustandStore";
import type { Faction } from "@/types";

export const MatchTableMatch = ({ index }: { index: number }) => {
  const matches = useZustandStore((state) => state.matches);
  const setMatch = useZustandStore((state) => state.setMatch);
  const match = matches[index];
  const { player1Faction, player2Faction, win } = match;

  const setPlayer1 = (faction: Faction | null) => {
    setMatch(index, { ...match, player1Faction: faction });
  };
  const setPlayer2 = (faction: Faction | null) => {
    setMatch(index, { ...match, player2Faction: faction });
  };
  const setWin = (w: boolean | null) => {
    setMatch(index, { ...match, win: w ?? true });
  };

  return (
    <MatchTable
      player1Faction={player1Faction}
      player2Faction={player2Faction}
      recordingWin={win}
      setPlayer1Faction={setPlayer1}
      setPlayer2Faction={setPlayer2}
      setRecordingWin={setWin}
    />
  );
};
