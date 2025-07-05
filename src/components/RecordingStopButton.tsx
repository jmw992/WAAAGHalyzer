"use client";
import { Square } from "lucide-react";
import { toast } from "sonner";
import type { Action, RecordingState } from "@/lib/useZustandStore";
import { useZustandStore } from "@/lib/useZustandStore";
import { Button } from "./ui/button";

interface StopHandlerProps {
  autoSaveFile: RecordingState["autoSaveFile"];
  recordingWin: RecordingState["recordingWin"];
  screenshots: RecordingState["screenshots"];
  unwatchAutoSaveFn: RecordingState["unwatchAutoSaveFn"];
  unwatchScreenshotFn: RecordingState["unwatchScreenshotFn"];
  unwatchArmySetup: RecordingState["unwatchArmySetup"];

  setIsRecording: Action["setIsRecording"];
  addRecordingToMatches: Action["addRecordingToMatches"];
}

const stopHandler = ({
  screenshots,
  recordingWin,
  autoSaveFile,
  unwatchScreenshotFn,
  unwatchAutoSaveFn,
  unwatchArmySetup,
  setIsRecording,
  addRecordingToMatches,
}: StopHandlerProps) => {
  try {
    // Stop recording logic here
    unwatchScreenshotFn();
    unwatchAutoSaveFn();
    unwatchArmySetup();
  } catch (err) {
    console.error("stopHandler error:", err);
  }
  // Only add recorded match if files were captured or win loss added
  if (autoSaveFile || screenshots.length > 0 || recordingWin) {
    addRecordingToMatches(new Date());
    toast.success("Match added to history");
  } else {
    toast.warning("Match missing info, not added to history");
  }
  setIsRecording(false);
  console.log("stopHandler finiish");
};

export default function RecordingStopButton() {
  const screenshots = useZustandStore((state) => state.screenshots);
  const autoSaveFile = useZustandStore((state) => state.autoSaveFile);
  const recordingWin = useZustandStore((state) => state.recordingWin);

  const unwatchAutoSaveFn = useZustandStore((state) => state.unwatchAutoSaveFn);
  const unwatchScreenshotFn = useZustandStore(
    (state) => state.unwatchScreenshotFn,
  );
  const unwatchArmySetup = useZustandStore((state) => state.unwatchArmySetup);
  const addRecordingToMatches = useZustandStore(
    (state) => state.addRecordingToMatches,
  );
  const setIsRecording = useZustandStore((state) => state.setIsRecording);

  return (
    <Button
      variant={"ghost"}
      type="button"
      className="relative text-red-500 hover:text-red-300 p-1"
      onClick={() => {
        stopHandler({
          autoSaveFile,
          recordingWin,
          screenshots,
          unwatchScreenshotFn,
          unwatchAutoSaveFn,
          unwatchArmySetup,
          addRecordingToMatches,
          setIsRecording,
        });
      }}
    >
      <Square className="size-6 " />
    </Button>
  );
}
