import {
  BaseDirectory,
  remove,
  copyFile,
  writeTextFile,
} from "@tauri-apps/plugin-fs";

import { MATCHES } from "@/constants";
import { convertFileSrc } from "@tauri-apps/api/core";
import { appLocalDataDir, join } from "@tauri-apps/api/path";
import { ulid } from "ulid";

interface FileProps {
  screenshotFile: string;
  subDir: string;
}

export const deleteSreenshotFile = async ({
  screenshotFile,
  subDir,
}: FileProps) => {
  const file = await join(MATCHES, subDir, `${screenshotFile}.png`);
  await remove(file, {
    baseDir: BaseDirectory.AppLocalData,
  });
};

export const getScreenshotSrc = async ({
  screenshotFile,
  subDir,
}: FileProps) => {
  const file = await join(
    await appLocalDataDir(),
    MATCHES,
    subDir,
    `${screenshotFile}.png`,
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
