"use client";

import GameModSectionGeneric from "@/components/GameModSection/GameModSectionGeneric";
import { useZustandStore } from "@/lib/useZustandStore";

export function GameModSectionRecording() {
  const recordingGame = useZustandStore((state) => state.recordingGame);
  const recordingMod = useZustandStore((state) => state.recordingMod);
  const setRecordingMod = useZustandStore((state) => state.setRecordingMod);

  return (
    <GameModSectionGeneric
      recordingGame={recordingGame}
      recordingMod={recordingMod}
      setRecordingMod={setRecordingMod}
    />
  );
}
