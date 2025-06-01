import {
  BaseDirectory,
  copyFile,
  exists,
  mkdir,
  watch,
} from "@tauri-apps/plugin-fs";

interface WatchNewAutoSaveProps {
  // The source file path to copy from the root
  autoSaveFile: string;
  // The destination file path to copy to, relative to the app's local data directory
  destinationDir: string;
  // The root name of the new save
  newSaveRoot: string;
  // Callback function to execute after the copy operation
  onCopy?: () => void;
}

const copyAutoSaveFile = async ({
  autoSaveFile,
  destinationDir,
  newSaveRoot,
  onCopy,
}: WatchNewAutoSaveProps): Promise<void> => {
  if (!(await exists(destinationDir))) {
    await mkdir(destinationDir, {
      baseDir: BaseDirectory.AppLocalData,
      recursive: true,
    });
  }

  // Perform the copy operation
  await copyFile(autoSaveFile, `${destinationDir}\\${newSaveRoot}`, {
    toPathBaseDir: BaseDirectory.AppLocalData,
  });

  if (onCopy) {
    onCopy();
  }
};

export const watchNewAutoSave = async ({
  autoSaveFile,
  destinationDir,
  newSaveRoot,
  onCopy,
}: WatchNewAutoSaveProps): Promise<void> => {
  await watch(
    autoSaveFile,
    (event) => {
      console.log("app.log event", event);
      const isCreateEvent =
        typeof event.type === "object" && "create" in event.type;
      const isModifyEvent =
        typeof event.type === "object" && "modify" in event.type;
      if (
        (isCreateEvent || isModifyEvent) &&
        event.paths.length === 1 &&
        event.paths[0] === autoSaveFile
      ) {
        void copyAutoSaveFile({
          autoSaveFile: autoSaveFile,
          destinationDir,
          newSaveRoot,
          onCopy,
        })
          .then(() => {
            console.log(
              `Auto-save file copied to ${destinationDir}\\${newSaveRoot}`,
            );
          })
          .catch((error: unknown) => {
            console.error("Error copying auto-save file:", error);
          });
      }
    },
    {
      baseDir: BaseDirectory.AppLog,
      delayMs: 1000, // Delay in milliseconds to wait for file changes
    },
  );
};
