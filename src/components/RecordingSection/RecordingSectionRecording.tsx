"use client";

import { useZustandStore } from "@/lib/useZustandStore";
import RecordingSectionGeneric from "@/components/RecordingSection/RecordingSectionGeneric";

export default function RecordingSectionRecording() {
  const recordingUlid = useZustandStore((state) => state.recordingUlid);
  const autoSaveFile = useZustandStore((state) => state.autoSaveFile);

  return (
    <RecordingSectionGeneric
      recordingUlid={recordingUlid}
      autoSaveFile={autoSaveFile}
    />
  );
}
