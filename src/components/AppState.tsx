"use client";

import {
  DEFAULT_GAME_DIRECTORY,
  DEFAULT_SCREENSHOTS_DIRECTORY,
} from "@/constants";
import { getStorePersistedSettings } from "@/lib/persistStorage";
import {
  type ZustandStateAction,
  useZustandStore,
} from "@/lib/useZustandStore";
import type React from "react";
import { useEffect } from "react";

import { watch } from "@tauri-apps/plugin-fs";

import { configDir, pictureDir, join } from "@tauri-apps/api/path";

// /** These state items get persisted between app close & open */
// export type PersistedState = {
//   game: SupportedGames;
//   mod: string;
//   gameDirectory: string;
//   screenshotsDirectory: string;
// };

const asyncDirsUpdate = async ({
  gameDirectory,
  screenshotsDirectory,
  setScreenshotsDirectory,
  setGameDirectory,
}: Pick<
  ZustandStateAction,
  | "gameDirectory"
  | "screenshotsDirectory"
  | "setScreenshotsDirectory"
  | "setGameDirectory"
>) => {
  const promises: Promise<void>[] = [];
  if (gameDirectory === "") {
    promises.push(
      (async () => {
        const dirRoot = await configDir();
        const gameDirectory = await join(dirRoot, DEFAULT_GAME_DIRECTORY);
        setGameDirectory(gameDirectory);
      })(),
    );
  }
  if (screenshotsDirectory === "") {
    promises.push(
      (async () => {
        const dirRoot = await pictureDir();
        const screenshotsDirectory = await join(
          dirRoot,
          DEFAULT_SCREENSHOTS_DIRECTORY,
        );
        setScreenshotsDirectory(screenshotsDirectory);
      })(),
    );
  }
  await Promise.all(promises);
};

export default function RootPage({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const setPersistedState = useZustandStore((state) => state.setPersistedState);
  useEffect(() => {
    console.log("jmw RootPage useEffect started");
    watch(
      "/Users/jwilliams/Documents/GitHub/WAAAGHalyzer/test/mockScreenshots/appStart",
      (event) => {
        console.log("startup app.log event", event);
        const isCreateEvent =
          typeof event.type === "object" && "create" in event.type;
        if (isCreateEvent) {
          console.log("jmw event.paths", event.paths);
          // void copyScreenshot({
          //   screenshotsDir: event.paths[0],
          //   destinationDir,
          //   onCopy,
          // });
        }
      },
      {
        // baseDir: BaseDirectory.AppLog,
        // delayMs: 1000, // Delay in milliseconds to wait for file changes
      },
    );
    // Set default from localStorage on first load
    const persistedState = getStorePersistedSettings();

    setPersistedState(persistedState);
    if (
      persistedState.gameDirectory === "" ||
      persistedState.screenshotsDirectory === ""
    ) {
      // console.log();
      void asyncDirsUpdate({
        gameDirectory: persistedState.gameDirectory,
        screenshotsDirectory: persistedState.screenshotsDirectory,
        setGameDirectory: useZustandStore.getState().setGameDirectory,
        setScreenshotsDirectory:
          useZustandStore.getState().setScreenshotsDirectory,
      });
    }
  }, [setPersistedState]);

  return children;
}
