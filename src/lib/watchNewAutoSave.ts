import {
  BaseDirectory,
  type UnwatchFn,
  copyFile,
  exists,
  mkdir,
  watch,
} from "@tauri-apps/plugin-fs";

import { MATCHES } from "@/constants";
import { appLocalDataDir, join } from "@tauri-apps/api/path";

interface WatchNewScreenshotProps {
  // The source file path to copy from the root
  gameDirectory: string;
  /**  The destination file path to copy to, relative to the app's local data directory.  Will be ulid of recording */
  destinationDir: string;
  // Callback function to execute after the copy operation
  onCopy?: (ulid: string) => void;
}

const copyAutoSave = async ({
  gameDirectory: screenshotFile,
  fileNameRoot,
  destinationDir,
  onCopy,
}: WatchNewScreenshotProps & {
  fileNameRoot: string;
}): Promise<void> => {
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

  const newFile = await join(destinationDir, `${fileNameRoot}.replay`);
  console.log("jmw autosave newFile", newFile);
  // Perform the copy operation
  await copyFile(screenshotFile, newFile, {
    toPathBaseDir: BaseDirectory.AppLocalData,
  });

  if (onCopy) {
    onCopy(fileNameRoot);
  }
};

export const watchNewAutoSave = async ({
  gameDirectory,
  destinationDir,
  onCopy,
}: WatchNewScreenshotProps): Promise<UnwatchFn> => {
  const seenFiles = new Set<string>();
  const gameAutoSaveFile = await join(
    gameDirectory,
    "replays",
    "Auto-save.replay",
  );
  console.log("jmw gameAutoSaveFile", gameAutoSaveFile);
  const matchDir = await join(MATCHES, destinationDir);
  console.log("jmw auto-save matchDir ", matchDir);
  const unWatch = await watch(gameAutoSaveFile, (event) => {
    console.log("watchNewAutoSave event", event);
    // return;
    const isCreateEvent =
      typeof event.type === "object" && "create" in event.type;
    const isModifyDataEvent =
      typeof event.type === "object" &&
      "modify" in event.type &&
      event.type.modify.kind !== "metadata";
    if (
      (isCreateEvent || isModifyDataEvent) &&
      !seenFiles.has(event.paths[0])
    ) {
      seenFiles.add(event.paths[0]);
      void copyAutoSave({
        gameDirectory: event.paths[0],
        fileNameRoot: destinationDir,
        destinationDir: matchDir,
        onCopy,
      });
    }
  });
  // unWatch();
  return unWatch;
};
