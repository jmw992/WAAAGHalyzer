"use client";
import { toast } from "sonner";
import type { Action, RecordingState } from "@/lib/useZustandStore";
import { useZustandStore } from "@/lib/useZustandStore";
import { Button } from "./ui/button";

interface SaveHandlerProps {
  autoSaveFile: RecordingState["autoSaveFile"];
  recordingWin: RecordingState["recordingWin"];
  screenshots: RecordingState["screenshots"];
  unwatchAutoSaveFn: RecordingState["unwatchAutoSaveFn"];
  unwatchScreenshotFn: RecordingState["unwatchScreenshotFn"];
  unwatchArmySetup: RecordingState["unwatchArmySetup"];

  setIsRecording: Action["setIsRecording"];
  addRecordingToMatches: Action["addRecordingToMatches"];
  setNullRecordingStartState: Action["setNullRecordingStartState"];
}

const saveHandler = ({
  screenshots,
  recordingWin,
  autoSaveFile,
  unwatchScreenshotFn,
  unwatchAutoSaveFn,
  unwatchArmySetup,
  setIsRecording,
  addRecordingToMatches,
  setNullRecordingStartState,
}: SaveHandlerProps) => {
  console.log("saveHandler called");
  // Only add recorded match if files were captured or win loss added
  if (autoSaveFile || screenshots.length > 0 || recordingWin !== null) {
    try {
      // Stop recording logic here
      unwatchScreenshotFn();
      unwatchAutoSaveFn();
      unwatchArmySetup();
    } catch (err) {
      console.error("stopHandler error:", err);
    }
    addRecordingToMatches(new Date());
    setNullRecordingStartState();
    setIsRecording(false);
    toast.success("Match added to history");
  } else {
    toast.warning("Match missing info, not added to history");
  }
};

export default function MatchSaveButton() {
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
  const setNullRecordingStartState = useZustandStore(
    (state) => state.setNullRecordingStartState,
  );
  // setNullRecordingStartState

  return (
    <Button
      size="lg"
      type="submit"
      onClick={() => {
        saveHandler({
          autoSaveFile,
          recordingWin,
          screenshots,
          unwatchScreenshotFn,
          unwatchAutoSaveFn,
          unwatchArmySetup,
          addRecordingToMatches,
          setIsRecording,
          setNullRecordingStartState,
        });
      }}
    >
      Save
    </Button>
  );
}
