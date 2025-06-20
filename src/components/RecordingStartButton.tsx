"use client";
import { useZustandStore } from "@/lib/useZustandStore";
import type { Action, PersistedState } from "@/lib/useZustandStore";
import { watchNewArmySetup } from "@/lib/watchNewArmySetup";
import { watchNewAutoSave } from "@/lib/watchNewAutoSave";
import { watchNewScreenshot } from "@/lib/watchNewScreenshot";
import { PlayIcon } from "lucide-react";
import { ulid } from "ulid";
import { Button } from "./ui/button";

interface AsyncWatchProps {
  newRecordingUlid: string;
  screenshotsDirectory: PersistedState["gameDirectory"];
  gameDirectory: PersistedState["gameDirectory"];
  addScreenshot: Action["addScreenshot"];
  setAutoSaveFile: Action["setAutoSaveFile"];
  addArmySetup: Action["addArmySetup"];
}
const asyncWatch = async ({
  newRecordingUlid,
  screenshotsDirectory,
  gameDirectory,
  addScreenshot,
  setAutoSaveFile,
  addArmySetup,
}: AsyncWatchProps) => {
  try {
    const unwatchFns = await Promise.all([
      watchNewScreenshot({
        screenshotsDir: screenshotsDirectory,
        destinationDir: newRecordingUlid,
        onCopy: (ulid) => {
          addScreenshot(ulid);
        },
      }),
      watchNewAutoSave({
        gameDirectory,
        destinationDir: newRecordingUlid,
        onCopy: (file) => {
          setAutoSaveFile(file);
        },
      }),
      watchNewArmySetup({
        gameDirectory,
        destinationDir: newRecordingUlid,
        onCopy: (file, origFilename) => {
          addArmySetup(file, origFilename ?? "");
        },
      }),
    ]);
    return unwatchFns;
  } catch (error) {
    console.error("asyncWatch error:", error);
  }
};

type RecordingHandlerProps = PersistedState & {
  addScreenshot: Action["addScreenshot"];
  addArmySetup: Action["addArmySetup"];
  setAutoSaveFile: Action["setAutoSaveFile"];
  setRecordingStartState: Action["setRecordingStartState"];
};

const recordingHandler = ({
  screenshotsDirectory,
  gameDirectory,
  mod,
  game,
  defaultMatchType,
  addScreenshot,
  addArmySetup,
  setAutoSaveFile,
  setRecordingStartState,
}: RecordingHandlerProps) => {
  const newRecordingUlid = ulid();
  // Start recording logic here

  asyncWatch({
    newRecordingUlid,
    screenshotsDirectory,
    gameDirectory,
    addScreenshot,
    addArmySetup,
    setAutoSaveFile,
  })
    .then((unwatchFns) => {
      if (!unwatchFns) {
        throw new Error("recordingHandler unwatchFns not set up correctly");
      }
      setRecordingStartState({
        matchType: defaultMatchType,
        recordingUlid: newRecordingUlid,
        unwatchScreenshotFn: unwatchFns[0],
        unwatchAutoSaveFn: unwatchFns[1],
        unwatchArmySetup: unwatchFns[2],
        recordingGame: game,
        recordingMod: mod,
      });
    })
    .catch((error: unknown) => {
      console.error("recordingHandler error:", error);
    });
};

export default function RecordingStartButton() {
  const screenshotsDirectory = useZustandStore(
    (state) => state.screenshotsDirectory,
  );
  const gameDirectory = useZustandStore((state) => state.gameDirectory);
  const game = useZustandStore((state) => state.game);
  const mod = useZustandStore((state) => state.mod);
  const defaultMatchType = useZustandStore((state) => state.defaultMatchType);

  const setRecordingStartState = useZustandStore(
    (state) => state.setRecordingStartState,
  );
  const addScreenshot = useZustandStore((state) => state.addScreenshot);
  const addArmySetup = useZustandStore((state) => state.addArmySetup);
  const setAutoSaveFile = useZustandStore((state) => state.setAutoSaveFile);

  return (
    <Button
      type="button"
      variant={"ghost"}
      className="p-1 text-green-500 hover:text-green-300"
      onClick={() => {
        recordingHandler({
          screenshotsDirectory,
          gameDirectory,
          mod,
          game,
          defaultMatchType,
          addScreenshot,
          addArmySetup,
          setAutoSaveFile,
          setRecordingStartState,
        });
      }}
    >
      <PlayIcon className="size-6 " />
    </Button>
  );
}
