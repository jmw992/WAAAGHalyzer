import { DEFAULT, HOME, TOTAL_WAR_WARHAMMER_3 } from "@/constants";
import type { Page, SupportedGames } from "@/types";
import type { UnwatchFn } from "@tauri-apps/plugin-fs";
import { create } from "zustand";

/** These state items get persisted between app close & open */
export interface PersistedState {
  game: SupportedGames;
  mod: string;
  gameDirectory: string;
  screenshotsDirectory: string;
}

export interface RecordingState {
  isRecording: boolean;
  recordingStartTime: Date | null;
  recordingUlid: string | null;
  unwatchAutoSaveFn: UnwatchFn;
  unwatchScreenshotFn: UnwatchFn;
  autoSaveFile: string | null;
  screenshotFiles: string[];
  recordingGame: SupportedGames | null;
  recordingMod: string | null;
}

export interface RecordedMatch {
  game: PersistedState["game"];
  mod: PersistedState["mod"];
  screenshotFiles: RecordingState["screenshotFiles"];
  recordingUlid: string;
  autoSaveFile: string;
  recordingStartTime: Date;
  recordingEndTime: Date;
}

/** Transient state items that get reset between app close & open */
export type TransientState = RecordingState & {
  page: Page;
  matches: RecordedMatch[];
};

/** Full application state */
type State = PersistedState & TransientState;

export interface Action {
  setPage: (page: State["page"]) => void;

  setIsRecording: (isRecording: State["isRecording"]) => void;
  setRecordingStartTime: (startTime: State["recordingStartTime"]) => void;
  setRecordingUlid: (ulid: State["recordingUlid"]) => void;
  setRecordingState: (recordingState: RecordingState) => void;
  setAutoSaveFile: (file: State["autoSaveFile"]) => void;
  addScreenshotFile: (file: string) => void;
  addRecordedMatch: (match: RecordedMatch) => void;
  addRecordingToMatches: (recordingEndTime: Date) => void;

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
  matches: [],
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
  game: TOTAL_WAR_WARHAMMER_3,
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
  autoSaveFile: null,
  screenshotFiles: [],
  unwatchAutoSaveFn: () => {},
  unwatchScreenshotFn: () => {},
  recordingGame: TOTAL_WAR_WARHAMMER_3,
  recordingMod: DEFAULT,
  setRecordingState: (state: RecordingState) => {
    set({
      isRecording: state.isRecording,
      recordingStartTime: state.recordingStartTime,
      recordingUlid: state.recordingUlid,
      unwatchAutoSaveFn: state.unwatchAutoSaveFn,
      unwatchScreenshotFn: state.unwatchScreenshotFn,
      autoSaveFile: state.autoSaveFile,
      screenshotFiles: state.screenshotFiles,
      recordingGame: state.recordingGame,
      recordingMod: state.recordingMod,
    });
  },

  setAutoSaveFile: (file: string | null) => {
    set({ autoSaveFile: file });
  },
  addScreenshotFile: (file: string) => {
    set((state) => ({
      screenshotFiles: [...state.screenshotFiles, file],
    }));
  },
  setPersistedState(value) {
    set(value);
  },
  addRecordedMatch: (match: RecordedMatch) => {
    set((state) => ({
      matches: [...state.matches, match],
    }));
  },
  addRecordingToMatches: (recordingEndTime: Date) => {
    set((state) => {
      return {
        matches: [
          ...state.matches,
          {
            game: state.recordingGame ?? TOTAL_WAR_WARHAMMER_3,
            mod: state.recordingMod ?? DEFAULT,
            screenshotFiles: state.screenshotFiles,
            recordingUlid: state.recordingUlid ?? "",
            autoSaveFile: state.autoSaveFile ?? "",
            recordingStartTime: state.recordingStartTime ?? recordingEndTime,
            recordingEndTime: recordingEndTime ?? new Date(),
          },
        ],
      };
    });
  },
  getPersistedState: () => ({
    game: get().game,
    mod: get().mod,
    gameDirectory: get().gameDirectory,
    screenshotsDirectory: get().screenshotsDirectory,
  }),
}));
