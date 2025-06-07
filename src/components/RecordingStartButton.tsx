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
  addScreenshotFile: Action["addScreenshotFile"];
  setAutoSaveFile: Action["setAutoSaveFile"];
}
const asyncWatch = async ({
  newRecordingUlid,
  screenshotsDirectory,
  gameDirectory,
  addScreenshotFile,
  setAutoSaveFile,
}: AsyncWatchProps) => {
  try {
    const unwatchFns = await Promise.all([
      watchNewScreenshot({
        screenshotsDir: screenshotsDirectory,
        destinationDir: newRecordingUlid,
        onCopy: (ulid) => {
          console.log("jmw screenshot copied with ulid:", ulid);
          addScreenshotFile(ulid);
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
  setRecordingState: Action["setRecordingState"];
  addScreenshotFile: Action["addScreenshotFile"];
  setAutoSaveFile: Action["setAutoSaveFile"];
};

const recordingHandler = ({
  screenshotsDirectory,
  gameDirectory,
  mod,
  game,

  setRecordingState,
  addScreenshotFile,
  setAutoSaveFile,
}: RecordingHandlerProps) => {
  const recordingStartTime = new Date();
  const newRecordingUlid = ulid();
  // Start recording logic here

  asyncWatch({
    newRecordingUlid,
    screenshotsDirectory,
    gameDirectory,
    addScreenshotFile,
    setAutoSaveFile,
  })
    .then((unwatchFns) => {
      if (!unwatchFns) {
        throw new Error("jmw unwatchFns not set up correctly");
      }
      console.log("jmw recording started");
      console.log("jmw unwatchFns[0]", unwatchFns[0]);
      console.log("jmw unwatchFns[1]", unwatchFns[1]);
      setRecordingState({
        recordingStartTime,
        recordingUlid: newRecordingUlid,
        isRecording: true,
        unwatchScreenshotFn: unwatchFns[0],
        unwatchAutoSaveFn: unwatchFns[1],
        autoSaveFile: null,
        screenshotFiles: [],
        recordingGame: game,
        recordingMod: mod,
        recordingWin: null,
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

  const setRecordingState = useZustandStore((state) => state.setRecordingState);
  const addScreenshotFile = useZustandStore((state) => state.addScreenshotFile);
  const setAutoSaveFile = useZustandStore((state) => state.setAutoSaveFile);

  return (
    <button
      type="button"
      className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
      onClick={() => {
        recordingHandler({
          setRecordingState,
          screenshotsDirectory,
          gameDirectory,
          addScreenshotFile,
          setAutoSaveFile,
          mod,
          game,
        });
      }}
    >
      <PlayIcon stroke="green" className="size-6" />
    </button>
  );
}
