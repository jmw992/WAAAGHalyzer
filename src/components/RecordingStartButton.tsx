"use client";
import { PlayIcon } from "lucide-react";
import { ulid } from "ulid";
import type { Action, DbActions, PersistedState } from "@/lib/useZustandStore";
import { useZustandStore } from "@/lib/useZustandStore";
import { watchNewArmySetup } from "@/lib/watchNewArmySetup";
import { watchNewAutoSave } from "@/lib/watchNewAutoSave";
import { watchNewScreenshot } from "@/lib/watchNewScreenshot";
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
    const unwatchPromisesFns = await Promise.allSettled([
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
    const unwatchFns = unwatchPromisesFns
      .filter((result) => {
        if (result.status === "fulfilled") {
          return true;
        } else {
          console.error("Error setting up watch:", result.reason);
          return false;
        }
      })
      .map((result) => {
        if (result.status === "fulfilled") {
          return result.value;
        } else {
          console.error("Error setting up watch:", result.reason);
          return () => {}; // Return a no-op function if the watch setup failed
        }
      });
    return unwatchFns;
  } catch (error) {
    console.error("asyncWatch error:", error);
  }
};

type StartRecordingHandlerProps = {
  screenshotsDirectory: PersistedState["screenshotsDirectory"];
  gameDirectory: PersistedState["gameDirectory"];
  addScreenshot: Action["addScreenshot"];
  addArmySetup: Action["addArmySetup"];
  setAutoSaveFile: Action["setAutoSaveFile"];
  setRecordingStartState: Action["setRecordingStartState"];
  setLatestRecordingNumberDb: DbActions["setLatestRecordingNumberDb"];
};

const startRecordingHandler = async ({
  screenshotsDirectory,
  gameDirectory,
  addScreenshot,
  addArmySetup,
  setAutoSaveFile,
  setRecordingStartState,
  setLatestRecordingNumberDb,
}: StartRecordingHandlerProps) => {
  const newRecordingUlid = ulid();
  // Start recording logic here
  try {
    const unwatchFns = await asyncWatch({
      newRecordingUlid,
      screenshotsDirectory,
      gameDirectory,
      addScreenshot,
      addArmySetup,
      setAutoSaveFile,
    });
    if (!unwatchFns) {
      throw new Error("recordingHandler unwatchFns not set up correctly");
    }
    setRecordingStartState({
      recordingUlid: newRecordingUlid,
      unwatchScreenshotFn: unwatchFns[0],
      unwatchAutoSaveFn: unwatchFns[1],
      unwatchArmySetup: unwatchFns[2],
    });
    setLatestRecordingNumberDb();
  } catch (error) {
    console.error("Error starting recording:", error);
  }
};

export default function RecordingStartButton() {
  const screenshotsDirectory = useZustandStore(
    (state) => state.screenshotsDirectory,
  );
  const gameDirectory = useZustandStore((state) => state.gameDirectory);

  const setRecordingStartState = useZustandStore(
    (state) => state.setRecordingStartState,
  );
  const addScreenshot = useZustandStore((state) => state.addScreenshot);
  const addArmySetup = useZustandStore((state) => state.addArmySetup);
  const setAutoSaveFile = useZustandStore((state) => state.setAutoSaveFile);
  const setLatestRecordingNumberDb = useZustandStore(
    (state) => state.setLatestRecordingNumberDb,
  );

  return (
    <Button
      type="button"
      variant={"ghost"}
      className="p-1 text-green-500 hover:text-green-300"
      onClick={() => {
        startRecordingHandler({
          screenshotsDirectory,
          gameDirectory,
          addScreenshot,
          addArmySetup,
          setAutoSaveFile,
          setRecordingStartState,
          setLatestRecordingNumberDb,
        });
      }}
    >
      <PlayIcon className="size-6 " />
    </Button>
  );
}
