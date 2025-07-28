"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { configDir, join, pictureDir } from "@tauri-apps/api/path";
import Database from "@tauri-apps/plugin-sql";
import type React from "react";
import { useEffect, useState } from "react";
import {
  DEFAULT_GAME_DIRECTORY,
  DEFAULT_SCREENSHOTS_DIRECTORY,
} from "@/constants";
import { getStorePersistedSettings } from "@/lib/persistStorage";
import type { ZustandStateAction } from "@/lib/types";
import { useZustandStore } from "@/lib/useZustandStore";

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
  const [queryClient] = useState(() => new QueryClient());
  const setPersistedState = useZustandStore((state) => state.setPersistedState);
  const setMatchType = useZustandStore((state) => state.setMatchType);
  const setDb = useZustandStore((state) => state.setDb);

  useEffect(() => {
    // Set default from localStorage on first load
    const persistedState = getStorePersistedSettings();
    setPersistedState(persistedState);
    setMatchType(persistedState.defaultMatchType);
    if (
      persistedState.gameDirectory === "" ||
      persistedState.screenshotsDirectory === ""
    ) {
      void asyncDirsUpdate({
        gameDirectory: persistedState.gameDirectory,
        screenshotsDirectory: persistedState.screenshotsDirectory,
        setGameDirectory: useZustandStore.getState().setGameDirectory,
        setScreenshotsDirectory:
          useZustandStore.getState().setScreenshotsDirectory,
      });
    }

    // Initialize the database connection
    Database.load("sqlite:mydatabase.db")
      .then((db) => {
        setDb(db);
      })
      .catch((err: unknown) => {
        console.error("Failed to load database:", err);
      });
  }, [setPersistedState, setMatchType, setDb]);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
