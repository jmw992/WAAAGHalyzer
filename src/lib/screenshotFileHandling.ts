import { BaseDirectory, remove } from "@tauri-apps/plugin-fs";

import { MATCHES } from "@/constants";
import { join } from "@tauri-apps/api/path";
import { convertFileSrc } from "@tauri-apps/api/core";

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
  const file = await join(MATCHES, subDir, `${screenshotFile}.png`);
  const src = await convertFileSrc(file);
  return src;
};
