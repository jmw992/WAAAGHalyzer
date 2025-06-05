"use client";
import { useZustandStore } from "@/lib/useZustandStore";
import type {
  Action,
  PersistedState,
  RecordingState,
} from "@/lib/useZustandStore";
import { watchNewAutoSave } from "@/lib/watchNewAutoSave";
import { watchNewScreenshot } from "@/lib/watchNewScreenshot";
import { PlayIcon, StopIcon } from "@heroicons/react/24/outline";
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
  isRecording: RecordingState["isRecording"];
  screenshotFiles: RecordingState["screenshotFiles"];
  unwatchAutoSaveFn: RecordingState["unwatchAutoSaveFn"];
  unwatchScreenshotFn: RecordingState["unwatchScreenshotFn"];
  autoSaveFile: RecordingState["autoSaveFile"];

  setRecordingState: Action["setRecordingState"];
  addScreenshotFile: Action["addScreenshotFile"];
  setAutoSaveFile: Action["setAutoSaveFile"];
  addRecordedMatch: Action["addRecordedMatch"];
  addRecordingToMatches: Action["addRecordingToMatches"];
};

const recordingHandler = ({
  setRecordingState,
  isRecording,
  screenshotsDirectory,
  gameDirectory,
  screenshotFiles,
  unwatchScreenshotFn,
  unwatchAutoSaveFn,
  addScreenshotFile,
  setAutoSaveFile,
  mod,
  autoSaveFile,
  game,
  addRecordingToMatches,
}: RecordingHandlerProps) => {
  const newIsRecording = !isRecording;
  const recordingStartTime = newIsRecording ? new Date() : null;

  if (newIsRecording) {
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
        setRecordingState({
          recordingStartTime,
          recordingUlid: newRecordingUlid,
          isRecording: newIsRecording,
          unwatchScreenshotFn: unwatchFns[0],
          unwatchAutoSaveFn: unwatchFns[1],
          autoSaveFile: null,
          screenshotFiles: [],
          recordingGame: game,
          recordingMod: mod,
        });
      })
      .catch((error: unknown) => {
        console.error("jmw error starting recording:", error);
      });
  } else {
    // Stop recording logic here
    unwatchScreenshotFn();
    unwatchAutoSaveFn();
    // Only add recorded match if files were captured
    if (autoSaveFile || screenshotFiles.length > 0) {
      // addRecordedMatch({
      //   game: recordingGame ?? TOTAL_WAR_WARHAMMER_3,
      //   mod: recordingMod ?? DEFAULT,
      //   screenshotFiles,
      //   recordingUlid,
      //   autoSaveFile,
      //   recordingStartTime,
      //   recordingEndTime: new Date(),
      // });
      if (autoSaveFile !== null) {
        addRecordingToMatches(new Date());
      }
    }

    setRecordingState({
      recordingStartTime: null,
      recordingUlid: null,
      isRecording: newIsRecording,
      unwatchScreenshotFn: () => {},
      unwatchAutoSaveFn: () => {},
      autoSaveFile: null,
      screenshotFiles: [],
      recordingGame: null,
      recordingMod: null,
    });
  }
};

export default function RecordingButton() {
  const isRecording = useZustandStore((state) => state.isRecording);
  const screenshotsDirectory = useZustandStore(
    (state) => state.screenshotsDirectory,
  );
  const gameDirectory = useZustandStore((state) => state.gameDirectory);
  const screenshotFiles = useZustandStore((state) => state.screenshotFiles);
  const autoSaveFile = useZustandStore((state) => state.autoSaveFile);
  const game = useZustandStore((state) => state.game);
  const mod = useZustandStore((state) => state.mod);

  const setRecordingState = useZustandStore((state) => state.setRecordingState);
  const unwatchAutoSaveFn = useZustandStore((state) => state.unwatchAutoSaveFn);
  const unwatchScreenshotFn = useZustandStore(
    (state) => state.unwatchScreenshotFn,
  );
  const addRecordingToMatches = useZustandStore(
    (state) => state.addRecordingToMatches,
  );
  const addScreenshotFile = useZustandStore((state) => state.addScreenshotFile);
  const setAutoSaveFile = useZustandStore((state) => state.setAutoSaveFile);
  const addRecordedMatch = useZustandStore((state) => state.addRecordedMatch);

  return (
    <button
      type="button"
      className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
      onClick={() => {
        recordingHandler({
          autoSaveFile,
          setRecordingState,
          isRecording,
          screenshotsDirectory,
          gameDirectory,
          unwatchScreenshotFn,
          unwatchAutoSaveFn,
          addScreenshotFile,
          setAutoSaveFile,
          mod,
          game,
          addRecordedMatch,
          screenshotFiles: screenshotFiles,
          addRecordingToMatches,
        });
      }}
    >
      {/* <span className="absolute -inset-1.5" />
      <span className="sr-only">View notifications</span> */}
      {isRecording ? (
        <StopIcon className="size-6 text-red-500" />
      ) : (
        <PlayIcon stroke="green" className="size-6" />
      )}
    </button>
  );
}
