import { ARMY_SETUPS, MATCHES } from "@/constants";
import { join } from "@tauri-apps/api/path";
import {
  BaseDirectory,
  type UnwatchFn,
  copyFile,
  exists,
  mkdir,
  watch,
} from "@tauri-apps/plugin-fs";
import { ulid } from "ulid";
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
  console.log("jmw matchDir", matchDir);
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
  console.log("jmw armySetupFile", armySetupFile);
  const origFilename = splitFilePath(armySetupFile).filename;
  console.log("jmw origFilename", origFilename);

  console.log("jmw fileNameRoot", fileNameRoot);

  const newFile = await join(destinationDir, `${fileNameRoot}.army_setup`);
  console.log("jmw army setup newFile", newFile);
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
  console.log("jmw armySetupsDir", armySetupsDir);
  const matchDir = await join(MATCHES, destinationDir);
  console.log("jmw armySetup matchDir ", matchDir);
  const unWatch = await watch(armySetupsDir, (event) => {
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
