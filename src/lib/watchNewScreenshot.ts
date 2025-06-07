import { MATCHES } from "@/constants";
import { appLocalDataDir, join } from "@tauri-apps/api/path";
import {
  BaseDirectory,
  type UnwatchFn,
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
  screenshotsDir: screenshotFile,
  destinationDir,
  onCopy,
}: WatchNewScreenshotProps): Promise<void> => {
  console.log("jmw starting copy....");
  if (
    !(await exists(destinationDir, {
      baseDir: BaseDirectory.AppLocalData,
    }))
  ) {
    console.log(`making ${destinationDir}`);
    await mkdir(destinationDir, {
      baseDir: BaseDirectory.AppLocalData,
      recursive: true,
    });
  }

  const newScreenshotUlid = ulid();
  const newFile = await join(destinationDir, `${newScreenshotUlid}.png`);

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
}: WatchNewScreenshotProps): Promise<UnwatchFn> => {
  const createdFiles = new Set<string>();
  const matchDir = await join(MATCHES, destinationDir);
  const unWatch = await watch(screenshotsDir, (event) => {
    console.log("app.log event", event);
    // return;
    const isCreateEvent =
      typeof event.type === "object" && "create" in event.type;
    if (isCreateEvent && !createdFiles.has(event.paths[0])) {
      createdFiles.add(event.paths[0]);
      void copyScreenshot({
        screenshotsDir: event.paths[0],
        destinationDir: matchDir,
        onCopy,
      });
    }
  });
  // unWatch();
  return unWatch;
};
