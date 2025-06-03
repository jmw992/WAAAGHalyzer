import {
  BaseDirectory,
  copyFile,
  exists,
  mkdir,
  watch,
  type UnwatchFn,
} from "@tauri-apps/plugin-fs";

import { appLocalDataDir, join } from "@tauri-apps/api/path";

interface WatchNewScreenshotProps {
  // The source file path to copy from the root
  replaysDir: string;
  /**  The destination file path to copy to, relative to the app's local data directory.  Will be ulid of recording */
  destinationDir: string;
  // Callback function to execute after the copy operation
  onCopy?: (ulid: string) => void;
}

const copyAutoSave = async ({
  replaysDir: screenshotFile,
  destinationDir,
  onCopy,
}: WatchNewScreenshotProps): Promise<void> => {
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

  const newFile = await join(destinationDir, `${destinationDir}.replay`);

  // Perform the copy operation
  await copyFile(screenshotFile, newFile, {
    toPathBaseDir: BaseDirectory.AppLocalData,
  });

  if (onCopy) {
    onCopy(destinationDir);
  }
};

export const watchNewAutoSave = async ({
  replaysDir,
  destinationDir,
  onCopy,
}: WatchNewScreenshotProps): Promise<UnwatchFn> => {
  const seenFiles = new Set<string>();
  const unWatch = await watch(replaysDir, (event) => {
    console.log("app.log event", event);
    // return;
    const isCreateEvent =
      typeof event.type === "object" && "create" in event.type;
    const isModifyEvent =
      typeof event.type === "object" && "modify" in event.type;
    if ((isCreateEvent || isModifyEvent) && !seenFiles.has(event.paths[0])) {
      seenFiles.add(event.paths[0]);
      void copyAutoSave({
        replaysDir: event.paths[0],
        destinationDir,
        onCopy,
      });
    }
  });
  // unWatch();
  return unWatch;
};
