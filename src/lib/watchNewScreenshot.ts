import {
  BaseDirectory,
  copyFile,
  exists,
  mkdir,
  watch,
} from "@tauri-apps/plugin-fs";
import { ulid } from "ulid";

import { appLocalDataDir } from "@tauri-apps/api/path";

interface WatchNewScreenshotProps {
  // The source file path to copy from the root
  screenshotsDir: string;
  // The destination file path to copy to, relative to the app's local data directory
  destinationDir: string;
  // Callback function to execute after the copy operation
  onCopy?: (ulid: string) => void;
}

const copyScreenshot = async ({
  screenshotsDir: screenshotFile,
  destinationDir,
  onCopy,
}: WatchNewScreenshotProps): Promise<void> => {
  console.log("jmw starting....");
  if (
    !(await exists(destinationDir, {
      baseDir: BaseDirectory.AppLocalData,
    }))
  ) {
    console.log(`making ${destinationDir}`);
    const appLocalData = await appLocalDataDir();
    console.log(`appLocalData ${appLocalData}`);
    await mkdir(destinationDir, {
      baseDir: BaseDirectory.AppLocalData,
      recursive: true,
    });
  }

  const newScreenshotUlid = ulid();
  const newFile = `${destinationDir}\\${newScreenshotUlid}.png`;
  console.log(`Saving ${screenshotFile} to ${newFile}`);
  // Perform the copy operation
  await copyFile(screenshotFile, newFile, {
    toPathBaseDir: BaseDirectory.AppLocalData,
  });

  if (onCopy) {
    onCopy(newScreenshotUlid);
  }
};

export const watchNewScreenshot = async ({
  screenshotsDir,
  destinationDir,
  onCopy,
}: WatchNewScreenshotProps): Promise<void> => {
  console.log("jmw watching screenshotsDir");
  await watch(
    screenshotsDir,
    (event) => {
      console.log("app.log event", event);
      const isCreateEvent =
        typeof event.type === "object" && "create" in event.type;
      if (isCreateEvent) {
        void copyScreenshot({
          screenshotsDir: event.paths[0],
          destinationDir,
          onCopy,
        });
      }
    },
    {
      baseDir: BaseDirectory.AppLog,
      delayMs: 1000, // Delay in milliseconds to wait for file changes
    }
  );
};
