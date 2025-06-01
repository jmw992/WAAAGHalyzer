import { DEFAULT, HOME } from "@/constants";
import type { Page, SupportedGames } from "@/types";
import { create } from "zustand";

/** These state items get persisted between app close & open */
export interface PersistedState {
  game: SupportedGames;
  mod: string;
  gameDirectory: string;
  screenshotsDirectory: string;
}

/** Transient state items that get reset between app close & open */
export interface TransientState {
  page: Page;
  isRecording: boolean;
  recordingStartTime: Date | null;
  recordingUlid: string | null;
}

/** Full application state */
type State = PersistedState & TransientState;

interface Action {
  setPage: (page: State["page"]) => void;
  setIsRecording: (isRecording: State["isRecording"]) => void;
  setRecordingStartTime: (startTime: State["recordingStartTime"]) => void;
  setRecordingUlid: (ulid: string | null) => void;
  setGame: (game: SupportedGames) => void;
  setGameDirectory: (gameDirectory: State["gameDirectory"]) => void;
  setMod: (mod: State["mod"]) => void;
  setScreenshotsDirectory: (
    gameDirectory: State["screenshotsDirectory"],
  ) => void;
  setPersistedState: (value: PersistedState) => void;
  getPersistedState: () => PersistedState;
}

export type ZustandStateAction = State & Action;

export const useZustandStore = create<ZustandStateAction>((set, get) => ({
  page: HOME,
  setPage: (value: Page) => {
    set({ page: value });
  },
  isRecording: false,
  setIsRecording: (value: boolean) => {
    set({ isRecording: value });
  },
  mod: DEFAULT,
  setMod(value: string) {
    set({ mod: value });
  },
  game: "Total War Warhammer 3",
  setGame(value: SupportedGames) {
    set({ game: value });
  },
  gameDirectory: "",
  setGameDirectory: (value: string) => {
    set({ gameDirectory: value });
  },
  screenshotsDirectory: "",
  setScreenshotsDirectory: (value: string) => {
    set({ screenshotsDirectory: value });
  },
  recordingStartTime: null,
  setRecordingStartTime: (value: Date | null) => {
    set({ recordingStartTime: value });
  },
  recordingUlid: null,
  setRecordingUlid: (ulid: string | null) => {
    set({ recordingUlid: ulid });
  },
  setPersistedState(value) {
    set(value);
  },
  getPersistedState: () => ({
    game: get().game,
    mod: get().mod,
    gameDirectory: get().gameDirectory,
    screenshotsDirectory: get().screenshotsDirectory,
  }),
}));
