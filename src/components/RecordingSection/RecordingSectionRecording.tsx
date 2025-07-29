"use client";

import RecordingSectionGeneric from "@/components/RecordingSection/RecordingSectionGeneric";
import { useZustandStore } from "@/lib/useZustandStore";

export default function RecordingSectionRecording() {
  const recordingUlid = useZustandStore((state) => state.recordingUlid);
  const autoSaveFile = useZustandStore((state) => state.autoSaveFile);
  const setAutoSaveFile = useZustandStore((state) => state.setAutoSaveFile);

  return (
    <RecordingSectionGeneric
      recordingUlid={recordingUlid}
      autoSaveFile={autoSaveFile}
      setAutoSaveFile={setAutoSaveFile}
    />
  );
}
