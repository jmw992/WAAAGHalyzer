"use client";
import { useZustandStore } from "@/lib/useZustandStore";
import { PlayIcon, StopIcon } from "@heroicons/react/24/outline";
import { ulid } from "ulid";
import { watchNewAutoSave } from "@/lib/watchNewAutoSave";
import { watchNewScreenshot } from "@/lib/watchNewScreenshot";

const asyncWatch = async (
  newRecordingUlid: string,
  screenshotsDirectory: string,
  autosaveDirectory: string,
) => {
  try {
    const unwatchFns = await Promise.all([
      watchNewScreenshot({
        screenshotsDir: screenshotsDirectory,
        destinationDir: newRecordingUlid,
        onCopy: (ulid) => {
          console.log("jmw screenshot copied with ulid:", ulid);
        },
      }),
      watchNewAutoSave({
        replaysDir: autosaveDirectory,
        destinationDir: newRecordingUlid,
      }),
    ]);
    return unwatchFns;
  } catch (error) {
    console.error("jmw error setting up screenshot watch:", error);
  }
};

const recordingHandler = ({
  setRecordingState,
  isRecording,
  screenshotsDirectory,
  gameDirectory,
  unwatchScreenshotFn,
  unwatchAutoSaveFn,
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
}: any) => {
  const newIsRecording = !isRecording;
  const recordingStartTime = newIsRecording ? new Date() : null;
  const newRecordingUlid = newIsRecording ? ulid() : null;

  if (newIsRecording) {
    const newRecordingUlid = ulid();
    // Start recording logic here

    asyncWatch(newRecordingUlid, screenshotsDirectory, gameDirectory)
      .then((unwatchFns) => {
        if (!unwatchFns || unwatchFns.length !== 2) {
          throw new Error("jmw unwatchFns not set up correctly");
        }
        console.log("jmw recording started");
        setRecordingState({
          recordingStartTime,
          recordingUlid: newRecordingUlid,
          isRecording: newIsRecording,
          unwatchScreenshotFn: unwatchFns[0],
          unwatchAutoSaveFn: unwatchFns[1],
        });
      })
      .catch((error) => {
        console.error("jmw error starting recording:", error);
      });
  } else {
    // Stop recording logic here
    unwatchScreenshotFn();
    unwatchAutoSaveFn();

    setRecordingState({
      recordingStartTime,
      recordingUlid: newRecordingUlid,
      isRecording: newIsRecording,
      unwatchScreenshotFn: () => {},
      unwatchAutoSaveFn: () => {},
    });
  }
};

export default function RecordingButton() {
  const isRecording = useZustandStore((state) => state.isRecording);
  const setRecordingState = useZustandStore((state) => state.setRecordingState);
  const screenshotsDirectory = useZustandStore(
    (state) => state.screenshotsDirectory,
  );
  const gameDirectory = useZustandStore((state) => state.gameDirectory);
  const unwatchAutoSaveFn = useZustandStore((state) => state.unwatchAutoSaveFn);
  const unwatchScreenshotFn = useZustandStore(
    (state) => state.unwatchScreenshotFn,
  );

  return (
    <button
      type="button"
      className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
      onClick={() =>
        recordingHandler({
          setRecordingState,
          isRecording,
          screenshotsDirectory,
          gameDirectory,
          unwatchScreenshotFn,
          unwatchAutoSaveFn,
        })
      }
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
