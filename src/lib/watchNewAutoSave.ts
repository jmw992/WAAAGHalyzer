import { join } from "@tauri-apps/api/path";
import {
  BaseDirectory,
  copyFile,
  exists,
  mkdir,
  type UnwatchFn,
  watch,
} from "@tauri-apps/plugin-fs";
import { MATCHES } from "@/constants";

export interface WatchGameDirProps {
  /**  The source file path to copy from the root */
  gameDirectory: string;
  /**  The destination file path to copy to, relative to the app's local data directory.  Will be ulid of recording */
  destinationDir: string;
  /**  Callback function to execute after the copy operation*/
  onCopy?: (origFilename: string) => void;
}

export const copyAutoSaveBase = async ({
  srcAutoSave,
  fileNameRoot,
  destinationDir,
  onCopy,
}: Omit<WatchGameDirProps, "gameDirectory"> & {
  fileNameRoot: string;
  srcAutoSave: string;
}): Promise<void> => {
  if (
    !(await exists(destinationDir, {
      baseDir: BaseDirectory.AppLocalData,
    }))
  ) {
    await mkdir(destinationDir, {
      baseDir: BaseDirectory.AppLocalData,
      recursive: true,
    });
  }

  const newFile = await join(destinationDir, `${fileNameRoot}.replay`);
  // Perform the copy operation
  await copyFile(srcAutoSave, newFile, {
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
}: WatchGameDirProps): Promise<UnwatchFn> => {
  const seenFiles = new Set<string>();
  const gameAutoSaveFile = await join(
    gameDirectory,
    "replays",
    "Auto-save.replay",
  );
  const matchDir = await join(MATCHES, destinationDir);
  const unWatch = await watch(gameAutoSaveFile, (event) => {
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
      void copyAutoSaveBase({
        srcAutoSave: event.paths[0],
        fileNameRoot: "Auto-save",
        destinationDir: matchDir,
        onCopy,
      });
    }
  });
  // unWatch();
  return unWatch;
};
