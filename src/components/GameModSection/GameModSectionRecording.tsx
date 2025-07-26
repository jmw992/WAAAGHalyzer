"use client";

import GameModSectionGeneric from "@/components/GameModSection/GameModSectionGeneric";
import { useZustandStore } from "@/lib/useZustandStore";

export function GameModSectionRecording() {
  const recordingGame = useZustandStore((state) => state.recordingGame);
  const recordingMod = useZustandStore((state) => state.recordingMod);
  const setRecordingMod = useZustandStore((state) => state.setRecordingMod);
  const recordingVersion = useZustandStore((state) => state.recordingVersion);
  const setRecordingVersion = useZustandStore(
    (state) => state.setRecordingVersion,
  );

  return (
    <GameModSectionGeneric
      recordingGame={recordingGame}
      recordingMod={recordingMod ?? ""}
      recordingVersion={recordingVersion}
      setRecordingMod={setRecordingMod}
      setRecordingVersion={setRecordingVersion}
    />
  );
}
