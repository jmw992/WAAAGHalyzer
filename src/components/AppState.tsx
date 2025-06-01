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

import { configDir, pictureDir } from "@tauri-apps/api/path";

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
        setGameDirectory(`${dirRoot}\\${DEFAULT_GAME_DIRECTORY}`);
      })()
    );
  }
  if (screenshotsDirectory === "") {
    promises.push(
      (async () => {
        const dirRoot = await pictureDir();
        setScreenshotsDirectory(`${dirRoot}\\${DEFAULT_SCREENSHOTS_DIRECTORY}`);
      })()
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
    // Set default from localStorage on first load
    const persistedState = getStorePersistedSettings();
    persistedState.gameDirectory = "";
    persistedState.screenshotsDirectory = "";
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
