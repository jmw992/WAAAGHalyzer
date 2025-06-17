import {
  BaseDirectory,
  copyFile,
  remove,
  writeTextFile,
} from "@tauri-apps/plugin-fs";

import { MATCHES } from "@/constants";
import { convertFileSrc } from "@tauri-apps/api/core";
import { appLocalDataDir, join } from "@tauri-apps/api/path";
import { ulid } from "ulid";

interface FileProps {
  filename: string;
  subDir: string;
}

export const deleteArmySetupFile = async ({ filename, subDir }: FileProps) => {
  const file = await join(MATCHES, subDir, `${filename}.army_setup`);
  await remove(file, {
    baseDir: BaseDirectory.AppLocalData,
  });
};

export const deleteSreenshotFile = async ({ filename, subDir }: FileProps) => {
  const file = await join(MATCHES, subDir, `${filename}.png`);
  await remove(file, {
    baseDir: BaseDirectory.AppLocalData,
  });
};

export const getScreenshotSrc = async ({ filename, subDir }: FileProps) => {
  const file = await join(
    await appLocalDataDir(),
    MATCHES,
    subDir,
    `${filename}.png`,
  );
  console.log("jmw file", file);
  return convertFileSrc(file);
};

export const copyScreenshotDebug = async () => {
  const sourceFile =
    "/Users/jwilliams/Documents/GitHub/WAAAGHalyzer/test/mockScreenshots/mockScreenshot.png";
  const targetFile = `/Users/jwilliams/Documents/GitHub/WAAAGHalyzer/test/mockScreenshots/${ulid()}.png`;
  await copyFile(sourceFile, targetFile);
};

export const copyAutoSaveDebug = async () => {
  const targetFile =
    "/Users/jwilliams/Documents/GitHub/WAAAGHalyzer/test/mockTww3/replays/Auto-save.replay";
  await writeTextFile(targetFile, "debug auto-save");
};
