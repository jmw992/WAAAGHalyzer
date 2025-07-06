"use client";

import { useZustandStore } from "@/lib/useZustandStore";
import GameModSectionGeneric from "@/components/GameModSection/GameModSectionGeneric";

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
