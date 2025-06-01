import * as path from "@tauri-apps/api/path";
import {
  BaseDirectory,
  copyFile,
  exists,
  mkdir,
  open,
} from "@tauri-apps/plugin-fs";

interface CopyNewAutoSaveProps {
  // The source file path to copy from the root
  sourceFromRoot: string;
  // The destination file path to copy to, relative to the app's local data directory
  destinationRelative: string;
  // The time when the recording started, used to check if the file is newer
  recordStartTime: Date;
  // The root name of the new save
  newSaveRoot: string;
  // Callback function to execute after the copy operation
  onCopy?: () => void;
}

export const copyNewAutoSave = async ({
  sourceFromRoot,
  destinationRelative,
  recordStartTime,
  newSaveRoot,
  onCopy,
}: CopyNewAutoSaveProps): Promise<void> => {
  const configDir = await path.configDir();
  const documentDir = await path.documentDir();
  const downloadDir = await path.downloadDir();
  console.log("jmw ", {
    configDir,
    documentDir,
    downloadDir,
  });
  const fileExists = await exists(sourceFromRoot);
  if (!fileExists) {
    return;
  }
  const file = await open(sourceFromRoot, {
    read: true,
  });
  const info = await file.stat();
  if (info.mtime && info.mtime > recordStartTime) {
    const targetDirExists = await exists(newSaveRoot, {
      baseDir: BaseDirectory.AppLocalData,
    });
    if (!targetDirExists) {
      await mkdir(newSaveRoot, {
        baseDir: BaseDirectory.AppLocalData,
      });
    }

    await copyFile(sourceFromRoot, destinationRelative, {
      toPathBaseDir: BaseDirectory.AppLocalData,
    });
    if (onCopy) {
      onCopy();
    }
  }
};
