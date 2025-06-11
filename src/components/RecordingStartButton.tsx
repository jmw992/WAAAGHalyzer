"use client";
import { useZustandStore } from "@/lib/useZustandStore";
import type { Action, PersistedState } from "@/lib/useZustandStore";
import { watchNewAutoSave } from "@/lib/watchNewAutoSave";
import { watchNewScreenshot } from "@/lib/watchNewScreenshot";
import { PlayIcon } from "@heroicons/react/24/outline";
import { ulid } from "ulid";

interface AsyncWatchProps {
  newRecordingUlid: string;
  screenshotsDirectory: PersistedState["gameDirectory"];
  gameDirectory: PersistedState["gameDirectory"];
  addScreenshot: Action["addScreenshot"];
  setAutoSaveFile: Action["setAutoSaveFile"];
}
const asyncWatch = async ({
  newRecordingUlid,
  screenshotsDirectory,
  gameDirectory,
  addScreenshot,
  setAutoSaveFile,
}: AsyncWatchProps) => {
  try {
    const unwatchFns = await Promise.all([
      watchNewScreenshot({
        screenshotsDir: screenshotsDirectory,
        destinationDir: newRecordingUlid,
        onCopy: (ulid) => {
          console.log("jmw screenshot copied with ulid:", ulid);
          addScreenshot(ulid);
        },
      }),
      watchNewAutoSave({
        gameDirectory,
        destinationDir: newRecordingUlid,
        onCopy: (file) => {
          console.log("jmw autosave copied:", file);
          setAutoSaveFile(file);
        },
      }),
    ]);
    return unwatchFns;
  } catch (error) {
    console.error("jmw error setting up screenshot watch:", error);
  }
};

type RecordingHandlerProps = PersistedState & {
  addScreenshot: Action["addScreenshot"];
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
    setAutoSaveFile,
  })
    .then((unwatchFns) => {
      if (!unwatchFns) {
        throw new Error("jmw unwatchFns not set up correctly");
      }
      console.log("jmw recording started");
      console.log("jmw unwatchFns[0]", unwatchFns[0]);
      console.log("jmw unwatchFns[1]", unwatchFns[1]);
      setRecordingStartState({
        matchType: defaultMatchType,
        recordingUlid: newRecordingUlid,
        unwatchScreenshotFn: unwatchFns[0],
        unwatchAutoSaveFn: unwatchFns[1],
        recordingGame: game,
        recordingMod: mod,
      });
    })
    .catch((error: unknown) => {
      console.error("jmw error starting recording:", error);
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
  const setAutoSaveFile = useZustandStore((state) => state.setAutoSaveFile);

  return (
    <button
      type="button"
      className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
      onClick={() => {
        recordingHandler({
          screenshotsDirectory,
          gameDirectory,
          mod,
          game,
          defaultMatchType,
          addScreenshot,
          setAutoSaveFile,
          setRecordingStartState,
        });
      }}
    >
      <PlayIcon stroke="green" className="size-6" />
    </button>
  );
}
