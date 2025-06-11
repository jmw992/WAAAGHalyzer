"use client";
import { useZustandStore } from "@/lib/useZustandStore";
import type { Action, RecordingState } from "@/lib/useZustandStore";
import { StopIcon } from "@heroicons/react/24/outline";

interface StopHandlerProps {
  autoSaveFile: RecordingState["autoSaveFile"];
  recordingWin: RecordingState["recordingWin"];
  screenshots: RecordingState["screenshots"];
  unwatchAutoSaveFn: RecordingState["unwatchAutoSaveFn"];
  unwatchScreenshotFn: RecordingState["unwatchScreenshotFn"];

  setIsRecording: Action["setIsRecording"];
  addRecordingToMatches: Action["addRecordingToMatches"];
}

const stopHandler = ({
  screenshots,
  recordingWin,
  autoSaveFile,
  unwatchScreenshotFn,
  unwatchAutoSaveFn,

  setIsRecording,
  addRecordingToMatches,
}: StopHandlerProps) => {
  console.log("jmw stopHandler started");
  try {
    // Stop recording logic here
    unwatchScreenshotFn();
    unwatchAutoSaveFn();
  } catch (err) {
    console.error("jmw error");
  }
  console.log("jmw unwatched");
  // Only add recorded match if files were captured
  if (autoSaveFile || screenshots.length > 0 || recordingWin) {
    if (autoSaveFile !== null) {
      addRecordingToMatches(new Date());
    }
  }
  setIsRecording(false);
  console.log("stopHandler finiish");
};

export default function RecordingStopButton() {
  console.log("jmw RecordingStopButton");
  const screenshots = useZustandStore((state) => state.screenshots);
  const autoSaveFile = useZustandStore((state) => state.autoSaveFile);
  const recordingWin = useZustandStore((state) => state.recordingWin);

  const unwatchAutoSaveFn = useZustandStore((state) => state.unwatchAutoSaveFn);
  const unwatchScreenshotFn = useZustandStore(
    (state) => state.unwatchScreenshotFn,
  );
  const addRecordingToMatches = useZustandStore(
    (state) => state.addRecordingToMatches,
  );
  const setIsRecording = useZustandStore((state) => state.setIsRecording);

  return (
    <button
      type="button"
      className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
      onClick={() => {
        stopHandler({
          autoSaveFile,
          recordingWin,
          screenshots,
          unwatchScreenshotFn,
          unwatchAutoSaveFn,
          addRecordingToMatches,
          setIsRecording,
        });
      }}
    >
      <StopIcon className="size-6 text-red-500" />
    </button>
  );
}
