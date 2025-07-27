"use client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import type { Action, DbActions, RecordingState } from "@/lib/types";
import { useZustandStore } from "@/lib/useZustandStore";
import { Button, type ButtonProps } from "./ui/button";

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
  addRecordingMatchDb: DbActions["addRecordingMatchDb"];
}

const saveHandler = async ({
  screenshots,
  recordingWin,
  autoSaveFile,
  unwatchScreenshotFn,
  unwatchAutoSaveFn,
  unwatchArmySetup,
  setIsRecording,
  addRecordingToMatches,
  setNullRecordingStartState,
  addRecordingMatchDb,
}: SaveHandlerProps) => {
  // Only add recorded match if files were captured or win loss added
  if (autoSaveFile || screenshots.length > 0 || recordingWin !== null) {
    const addRecordingMatchDbPromise = addRecordingMatchDb();
    try {
      // Stop recording logic here
      unwatchScreenshotFn();
      unwatchAutoSaveFn();
      unwatchArmySetup();
    } catch (err) {
      console.error("stopHandler error:", err);
    }

    addRecordingToMatches(new Date());
    await addRecordingMatchDbPromise;
    setNullRecordingStartState();
    setIsRecording(false);
    toast.success("Match added to history");
  } else {
    toast.warning("Match missing info, not added to history");
  }
};

export default function MatchSaveButtonBase({
  buttonClassName,
  variant = "default",
  children,
  type = "submit",
}: {
  buttonClassName?: string;
  variant?: ButtonProps["variant"];
  type?: ButtonProps["type"];
  children: React.ReactNode;
}) {
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
  const addRecordingMatchDb = useZustandStore(
    (state) => state.addRecordingMatchDb,
  );

  const mutation = useMutation({
    mutationFn: saveHandler,
  });

  return (
    <Button
      variant={variant}
      size="lg"
      type={type}
      className={buttonClassName}
      disabled={mutation.isPending}
      onClick={() => {
        mutation.mutate({
          autoSaveFile,
          recordingWin,
          screenshots,
          unwatchScreenshotFn,
          unwatchAutoSaveFn,
          unwatchArmySetup,
          addRecordingToMatches,
          setIsRecording,
          setNullRecordingStartState,
          addRecordingMatchDb,
        });
      }}
    >
      {children}
    </Button>
  );
}
