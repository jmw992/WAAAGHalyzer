"use client";

import VersionSectionGeneric from "@/components/VersionSection/VersionSectionGeneric";
import { useZustandStore } from "@/lib/useZustandStore";

export function VersionSectionRecording() {
  const recordingVersionMajor = useZustandStore((state) => state.recordingVersionMajor);
  const recordingVersionMinor = useZustandStore((state) => state.recordingVersionMinor);
  const recordingVersionPatch = useZustandStore((state) => state.recordingVersionPatch);
  const setRecordingVersion = useZustandStore((state) => state.setRecordingVersion);

  return (
    <VersionSectionGeneric
      versionMajor={recordingVersionMajor}
      versionMinor={recordingVersionMinor}
      versionPatch={recordingVersionPatch}
      setVersion={setRecordingVersion}
    />
  );
}
