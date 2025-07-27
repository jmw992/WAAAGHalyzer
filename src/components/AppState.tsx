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
  const [queryClient] = useState(() => new QueryClient());
  const setPersistedState = useZustandStore((state) => state.setPersistedState);
  const setMatchType = useZustandStore((state) => state.setMatchType);
  const setDb = useZustandStore((state) => state.setDb);
  const db = useZustandStore((state) => state.db);
  const setLatestRecordingNumberDb = useZustandStore(
    (state) => state.setLatestRecordingNumberDb,
  );
  const getMatchesDb = useZustandStore((state) => state.getMatchesDb);
  const setMatches = useZustandStore((state) => state.setMatches);

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

  useEffect(() => {
    if (db) {
      void setLatestRecordingNumberDb();
      void getMatchesDb().then((matches) => {
        if (matches) {
          setMatches(matches);
        }
      });
    }
  }, [db, setLatestRecordingNumberDb, getMatchesDb, setMatches]);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
