import { convertFileSrc } from "@tauri-apps/api/core";
import { appLocalDataDir, join } from "@tauri-apps/api/path";
import {
  BaseDirectory,
  copyFile,
  remove,
  writeTextFile,
} from "@tauri-apps/plugin-fs";
import { ulid } from "ulid";
import { MATCHES } from "@/constants";

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
  return convertFileSrc(file);
};
const WINDOWS_DEBUG_ROOT =
  "C:\\Users\\jmw99\\OneDrive\\Documents\\BayswaterPC\\WAAAGHalyzer\\test";
const MAC_DEBUG_ROOT = "/Users/jwilliams/Documents/GitHub/WAAAGHalyzer/test";

const onWindows = false;

// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
const DEBUG_GAME_ROOT = onWindows ? WINDOWS_DEBUG_ROOT : MAC_DEBUG_ROOT;

export const copyScreenshotDebug = async () => {
  const sourceFile = await join(
    DEBUG_GAME_ROOT,
    "mockScreenshots",
    "mockScreenshot.png",
  );
  // const targetFile = `${DEBUG_GAME_ROOT}/mockScreenshots/${ulid()}.png`;
  const targetFile = await join(
    DEBUG_GAME_ROOT,
    "mockScreenshots",
    `${ulid()}.png`,
  );

  await copyFile(sourceFile, targetFile);
};

export const copyAutoSaveDebug = async () => {
  // const targetFile = `${DEBUG_GAME_ROOT}/mockTww3/replays/Auto-save.replay`;
  const targetFile = await join(
    DEBUG_GAME_ROOT,
    "mockTww3",
    "replays",
    "Auto-save.replay",
  );
  await writeTextFile(targetFile, "debug auto-save copied...");
};

export const copyArmySetupDebug = async () => {
  // const sourceFile = `${DEBUG_GAME_ROOT}/mockTww3/army_setups/mock.army_setup`;
  const sourceFile = await join(
    DEBUG_GAME_ROOT,
    "mockTww3",
    "army_setups",
    "mock.army_setup",
  );
  // const targetFile = `${DEBUG_GAME_ROOT}/mockTww3/army_setups/${ulid()}.army_setup`;
  const targetFile = await join(
    DEBUG_GAME_ROOT,
    "mockTww3",
    "army_setups",
    `${ulid()}.army_setup`,
  );
  await copyFile(sourceFile, targetFile);
};

/**
 * Splits a file path string into its directory path, filename, and file extension.
 *
 * @param filePath The complete file path string.
 * @returns An object containing:
 * - `directory`: The path to the directory containing the file (empty string if no directory).
 * - `filename`: The name of the file without its extension.
 * - `extension`: The file extension (e.g., ".txt", ".jpg"), including the dot, or an empty string if no extension.
 */
export const splitFilePath = (
  filePath: string,
): {
  directory: string;
  filename: string;
  extension: string;
} => {
  const lastSlashIndex = filePath.lastIndexOf("/");
  const lastBackslashIndex = filePath.lastIndexOf("\\");
  const lastSeparatorIndex = Math.max(lastSlashIndex, lastBackslashIndex);

  let directory = "";
  let fullFilename = filePath;

  if (lastSeparatorIndex !== -1) {
    directory = filePath.substring(0, lastSeparatorIndex);
    fullFilename = filePath.substring(lastSeparatorIndex + 1);
  }

  const lastDotIndex = fullFilename.lastIndexOf(".");

  let filename = fullFilename;
  let extension = "";

  if (lastDotIndex !== -1) {
    filename = fullFilename.substring(0, lastDotIndex);
    extension = fullFilename.substring(lastDotIndex);
  }

  return { directory, filename, extension };
};
