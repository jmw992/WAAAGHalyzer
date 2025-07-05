import { join } from "@tauri-apps/api/path";
import {
  BaseDirectory,
  copyFile,
  exists,
  mkdir,
  type UnwatchFn,
  watch,
} from "@tauri-apps/plugin-fs";
import { ulid } from "ulid";
import { ARMY_SETUPS, MATCHES } from "@/constants";
import { splitFilePath } from "./fileHandling";
import type { WatchGameDirProps } from "./watchNewAutoSave";

export const copyAutoSaveToMatchDir = async ({
  sourceFile,
  matchId,
  onCopy,
}: {
  sourceFile: string;
  matchId: string;
  onCopy?: (ulid: string, origFilename?: string) => void;
}): Promise<void> => {
  const matchDir = await join(MATCHES, matchId);
  await copyArmySetupBase({
    gameDirectory: sourceFile,
    fileNameRoot: ulid(),
    destinationDir: matchDir,
    onCopy,
  });
};

const copyArmySetupBase = async ({
  gameDirectory: armySetupFile,
  fileNameRoot,
  destinationDir,
  onCopy,
}: WatchGameDirProps & {
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
  const origFilename = splitFilePath(armySetupFile).filename;
  const newFile = await join(destinationDir, `${fileNameRoot}.army_setup`);
  // Perform the copy operation
  await copyFile(armySetupFile, newFile, {
    toPathBaseDir: BaseDirectory.AppLocalData,
  });

  if (onCopy) {
    onCopy(fileNameRoot, origFilename);
  }
};

export const watchNewArmySetup = async ({
  gameDirectory,
  destinationDir,
  onCopy,
}: WatchGameDirProps): Promise<UnwatchFn> => {
  const seenFiles = new Set<string>();
  const armySetupsDir = await join(gameDirectory, ARMY_SETUPS);
  const matchDir = await join(MATCHES, destinationDir);
  const unWatch = await watch(armySetupsDir, (event) => {
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
      void copyArmySetupBase({
        gameDirectory: event.paths[0],
        fileNameRoot: ulid(),
        destinationDir: matchDir,
        onCopy,
      });
    }
  });
  return unWatch;
};
