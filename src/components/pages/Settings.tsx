"use client";

import { FolderInput } from "@/components/FolderInputDialog";
import { SettingsForm } from "@/components/SettingsForm";
import {
  setGameDirectoryStore,
  setScreenshotsDirectoryStore,
} from "@/lib/persistStorage";
import { useZustandStore } from "@/lib/useZustandStore";

export default function Settings() {
  const getPersistedState = useZustandStore((state) => state.getPersistedState);
  const persistedState = getPersistedState();

  return (
    <>
      <h1 className="text-center text-xl">Settings</h1>
      <SettingsForm initialState={persistedState} />
    </>
  );
}
