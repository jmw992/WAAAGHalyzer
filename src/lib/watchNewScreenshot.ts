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
import { splitFilePath } from "./fileHandling";

interface WatchNewScreenshotProps {
  // The source file path to copy from the root
  screenshotsDir: string;
  // The destination file path to copy to, relative to the app's local data directory
  destinationDir: string;
  // Callback function to execute after the copy operation
  onCopy?: (filename: string) => void;
}

export const copyScreenshot = async ({
  screenshotFile,
  destinationDir,
  onCopy,
}: Omit<WatchNewScreenshotProps, "screenshotsDir"> & {
  screenshotFile: string;
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
  const { filename, extension } = splitFilePath(screenshotFile);
  const newFile = await join(destinationDir, `${filename}.${extension}`);

  // Perform the copy operation
  await copyFile(screenshotFile, newFile, {
    toPathBaseDir: BaseDirectory.AppLocalData,
  });

  if (onCopy) {
    onCopy(filename);
  }
};

export const watchNewScreenshot = async ({
  screenshotsDir,
  destinationDir,
  onCopy,
}: WatchNewScreenshotProps): Promise<UnwatchFn> => {
  const createdFiles = new Set<string>();
  const matchDir = await join(MATCHES, destinationDir);
  const unWatch = await watch(screenshotsDir, (event) => {
    const isCreateEvent =
      typeof event.type === "object" && "create" in event.type;
    if (isCreateEvent && !createdFiles.has(event.paths[0])) {
      createdFiles.add(event.paths[0]);
      void copyScreenshot({
        screenshotFile: event.paths[0],
        destinationDir: matchDir,
        onCopy,
      });
    }
  });
  return unWatch;
};
