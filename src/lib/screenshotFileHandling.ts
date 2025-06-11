import { BaseDirectory, remove } from "@tauri-apps/plugin-fs";

import { MATCHES } from "@/constants";
import { convertFileSrc } from "@tauri-apps/api/core";
import { appLocalDataDir, join } from "@tauri-apps/api/path";

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
  return convertFileSrc(file);
};
