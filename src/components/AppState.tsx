"use client";

import { configDir, join, pictureDir } from "@tauri-apps/api/path";
import type React from "react";
import { useEffect } from "react";
import {
  DEFAULT_GAME_DIRECTORY,
  DEFAULT_SCREENSHOTS_DIRECTORY,
} from "@/constants";
import { getStorePersistedSettings } from "@/lib/persistStorage";
import {
  useZustandStore,
  type ZustandStateAction,
} from "@/lib/useZustandStore";

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
  const setMatchType = useZustandStore((state) => state.setMatchType);
  useEffect(() => {
    // Set default from localStorage on first load
    const persistedState = getStorePersistedSettings();
    setPersistedState(persistedState);
    setMatchType(persistedState.defaultMatchType);
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
  }, [setPersistedState, setMatchType]);

  return children;
}
