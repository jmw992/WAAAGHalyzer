"use client";

import GameModSectionGeneric from "@/components/GameModSection/GameModSectionGeneric";
import { useZustandStore } from "@/lib/useZustandStore";

export function GameModSectionRecording() {
  const recordingGame = useZustandStore((state) => state.recordingGame);
  const recordingMod = useZustandStore((state) => state.recordingMod);
  const setRecordingMod = useZustandStore((state) => state.setRecordingMod);
  const version_major = useZustandStore((state) => state.version_major);
  const version_minor = useZustandStore((state) => state.version_minor);
  const version_patch = useZustandStore((state) => state.version_patch);
  const setVersionMajor = useZustandStore((state) => state.setVersionMajor);
  const setVersionMinor = useZustandStore((state) => state.setVersionMinor);
  const setVersionPatch = useZustandStore((state) => state.setVersionPatch);

  return (
    <GameModSectionGeneric
      recordingGame={recordingGame}
      recordingMod={recordingMod ?? ""}
      version_major={version_major}
      version_minor={version_minor}
      version_patch={version_patch}
      setRecordingMod={setRecordingMod}
      setVersionMajor={setVersionMajor}
      setVersionMinor={setVersionMinor}
      setVersionPatch={setVersionPatch}
    />
  );
}
