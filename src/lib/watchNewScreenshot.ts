import {
  BaseDirectory,
  copyFile,
  exists,
  mkdir,
  watch,
} from "@tauri-apps/plugin-fs";
import { ulid } from "ulid";

interface WatchNewScreenshotProps {
  // The source file path to copy from the root
  screenshotsDir: string;
  // The destination file path to copy to, relative to the app's local data directory
  destinationDir: string;
  // Callback function to execute after the copy operation
  onCopy?: (ulid: string) => void;
}

const copyScreenshot = async ({
  screenshotsDir: austoSaveFile,
  destinationDir,
  onCopy,
}: WatchNewScreenshotProps): Promise<void> => {
  if (!(await exists(destinationDir))) {
    await mkdir(destinationDir, {
      baseDir: BaseDirectory.AppLocalData,
      recursive: true,
    });
  }

  const newScreenshotUlid = ulid();

  // Perform the copy operation
  await copyFile(austoSaveFile, `destinationDir\\${newScreenshotUlid}`, {
    toPathBaseDir: BaseDirectory.AppLocalData,
  });

  if (onCopy) {
    onCopy(newScreenshotUlid);
  }
};

export const watchNewAutoSave = async ({
  screenshotsDir,
  destinationDir,
  onCopy,
}: WatchNewScreenshotProps): Promise<void> => {
  await watch(
    screenshotsDir,
    (event) => {
      console.log("app.log event", event);
      const isCreateEvent =
        typeof event.type === "object" && "create" in event.type;
      if (isCreateEvent) {
        void copyScreenshot({
          screenshotsDir,
          destinationDir,
          onCopy,
        });
      }
    },
    {
      baseDir: BaseDirectory.AppLog,
      delayMs: 1000, // Delay in milliseconds to wait for file changes
    },
  );
};
