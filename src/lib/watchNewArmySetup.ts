import { join } from "@tauri-apps/api/path";
import {
  BaseDirectory,
  copyFile,
  exists,
  mkdir,
  type UnwatchFn,
  watch,
} from "@tauri-apps/plugin-fs";
import { ARMY_SETUPS, MATCHES } from "@/constants";
import { splitFilePath } from "./fileHandling";
import type { WatchGameDirProps } from "./watchNewAutoSave";

export const copyArmySetupToMatchDir = async ({
  sourceFile,
  matchId,
  onCopy,
}: {
  sourceFile: string;
  matchId: string;
  onCopy?: (origFilename: string) => void;
}): Promise<void> => {
  const matchDir = await join(MATCHES, matchId);
  await copyArmySetupBase({
    armySetupFile: sourceFile,
    destinationDir: matchDir,
    onCopy,
  });
};

const copyArmySetupBase = async ({
  destinationDir,
  onCopy,
  armySetupFile,
}: Omit<WatchGameDirProps, "gameDirectory"> & {
  armySetupFile: string;
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
  const { filename, extension } = splitFilePath(armySetupFile);
  const newFile = await join(destinationDir, `${filename}.${extension}`);
  // Perform the copy operation
  await copyFile(armySetupFile, newFile, {
    toPathBaseDir: BaseDirectory.AppLocalData,
  });

  if (onCopy) {
    onCopy(filename);
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
        armySetupFile: event.paths[0],
        destinationDir: matchDir,
        onCopy,
      });
    }
  });
  return unWatch;
};
