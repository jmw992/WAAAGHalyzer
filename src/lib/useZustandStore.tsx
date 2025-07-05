import type { UnwatchFn } from "@tauri-apps/plugin-fs";
import { create } from "zustand";
import {
  BEASTMEN,
  DEFAULT,
  DOMINATION,
  END_BATTLE,
  HOME,
  OPPONENT,
  OTHER,
  PLAYER,
  RESULT,
  TOTAL_WAR_WARHAMMER_3,
} from "@/constants";
import type {
  ArmySetupType,
  Faction,
  MatchTypes,
  Page,
  ScreenshotType,
  SupportedGames,
} from "@/types";

/** These state items get persisted between app close & open */
export interface PersistedState {
  game: SupportedGames;
  defaultMatchType: MatchTypes;
  mod: string;
  gameDirectory: string;
  screenshotsDirectory: string;
}

export interface Screenshot {
  /** Filename without extension */
  filename: string;
  type: ScreenshotType;
}

export interface ArmySetup {
  /** Filename without extension */
  filename: string;
  origFilename: string;
  type: ArmySetupType;
}

export interface RecordedMatch {
  index: number;
  matchType: MatchTypes;
  playerFaction: Faction;
  opponentFaction: Faction;
  win: boolean;
  map: string;
  game: PersistedState["game"];
  mod: PersistedState["mod"];
  recordingUlid: string;
  autoSaveFile: string;
  recordingStartTime: Date;
  recordingEndTime: Date;
  notes: RecordingState["notes"];
  links: RecordingState["links"];
  armySetups: RecordingState["armySetups"];
  screenshots: RecordingState["screenshots"];
}

interface StartRecordingProps {
  recordingUlid: string | null;
  unwatchAutoSaveFn: UnwatchFn;
  unwatchScreenshotFn: UnwatchFn;
  unwatchArmySetup: UnwatchFn;
  recordingGame: SupportedGames | null;
  recordingMod: string | null;
  matchType: MatchTypes | null;
}

export type RecordingState = StartRecordingProps & {
  index: number;
  isRecording: boolean;
  recordingStartTime: Date | null;

  autoSaveFile: string | null;
  screenshots: Screenshot[];
  armySetups: ArmySetup[];
  recordingGame: SupportedGames | null;
  recordingMod: string | null;
  recordingWin: boolean | null;
  playerFaction: Faction | null;
  opponentFaction: Faction | null;
  map: string | null;
  notes: string | null;
  links: string[] | null;
};

/** Transient state items that get reset between app close & open */
export type TransientState = RecordingState & {
  page: Page;
  matches: RecordedMatch[];
};

/** Full application state */
type State = PersistedState & TransientState;

export interface Action {
  setPage: (page: State["page"]) => void;

  setMatchType: (matchType: RecordingState["matchType"]) => void;
  setMap: (map: RecordingState["map"]) => void;
  setPlayerFaction: (playerFaction: RecordingState["playerFaction"]) => void;
  setOpponentFaction: (
    opponentFaction: RecordingState["opponentFaction"],
  ) => void;
  setRecordingWin: (recordingWin: RecordingState["recordingWin"]) => void;
  setRecordingMod: (recordingWin: RecordingState["recordingMod"]) => void;
  setIsRecording: (isRecording: RecordingState["isRecording"]) => void;
  setRecordingStartTime: (
    startTime: RecordingState["recordingStartTime"],
  ) => void;
  setRecordingUlid: (ulid: StartRecordingProps["recordingUlid"]) => void;
  setRecordingState: (recordingState: RecordingState) => void;
  setRecordingStartState: (startRecordingProps: StartRecordingProps) => void;
  setNullRecordingStartState: () => void;
  setAutoSaveFile: (file: RecordingState["autoSaveFile"]) => void;
  updateScreenshot: (index: number, screenshot: Screenshot) => void;
  addScreenshot: (filename: string) => void;
  deleteScreenshot: (file: string) => void;
  addArmySetup: (filename: string, origFilename: string) => void;
  deleteArmySetup: (file: string) => void;
  updateArmySetup: (index: number, armySetup: ArmySetup) => void;
  addRecordedMatch: (match: RecordedMatch) => void;
  addRecordingToMatches: (recordingEndTime: Date) => void;
  setMatch: (ii: number, match: RecordedMatch) => void;

  setGame: (game: SupportedGames) => void;
  setGameDirectory: (gameDirectory: State["gameDirectory"]) => void;
  setMod: (mod: State["mod"]) => void;
  setNotes: (notes: State["notes"]) => void;
  setScreenshotsDirectory: (
    gameDirectory: State["screenshotsDirectory"],
  ) => void;
  setPersistedState: (value: PersistedState) => void;
  getPersistedState: () => PersistedState;
}

export type ZustandStateAction = State & Action;

export const useZustandStore = create<ZustandStateAction>((set, get) => ({
  index: 0,
  page: HOME,
  matches: [],
  defaultMatchType: DOMINATION,
  setPage: (value: Page) => {
    set({ page: value });
  },
  matchType: null,
  setMatchType(matchType: RecordingState["matchType"]) {
    set({ matchType });
  },
  isRecording: false,
  setIsRecording: (value: boolean) => {
    set({ isRecording: value });
  },
  mod: DEFAULT,
  setMod(value) {
    set({ mod: value });
  },
  setNotes(value) {
    set({ notes: value });
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
  setRecordingWin: (recordingWin) => {
    set({ recordingWin });
  },
  setRecordingMod: (recordingMod) => {
    set({ recordingMod });
  },
  recordingUlid: null,
  setRecordingUlid: (ulid: string | null) => {
    set({ recordingUlid: ulid });
  },
  autoSaveFile: null,
  screenshots: [],
  armySetups: [],
  unwatchAutoSaveFn: () => {},
  unwatchScreenshotFn: () => {},
  unwatchArmySetup: () => {},
  recordingGame: TOTAL_WAR_WARHAMMER_3,
  recordingMod: DEFAULT,
  recordingWin: null,
  playerFaction: null,
  opponentFaction: null,
  map: null,
  notes: null,
  links: null,
  setMap: (map) => {
    set({ map });
  },
  setPlayerFaction: (playerFaction) => {
    set({ playerFaction });
  },
  setOpponentFaction: (opponentFaction) => {
    set({ opponentFaction });
  },
  setRecordingState: (state: RecordingState) => {
    set({
      isRecording: state.isRecording,
      recordingStartTime: state.recordingStartTime,
      recordingUlid: state.recordingUlid,
      unwatchAutoSaveFn: state.unwatchAutoSaveFn,
      unwatchScreenshotFn: state.unwatchScreenshotFn,
      autoSaveFile: state.autoSaveFile,
      recordingGame: state.recordingGame,
      recordingMod: state.recordingMod,
      recordingWin: state.recordingWin,
      playerFaction: state.playerFaction,
      opponentFaction: state.opponentFaction,
      map: state.map,
      notes: state.notes,
      links: state.links,
    });
  },
  setRecordingStartState: (state: StartRecordingProps) => {
    set({
      index: get().matches.length + 1,
      recordingStartTime: new Date(),
      recordingUlid: state.recordingUlid,
      unwatchAutoSaveFn: state.unwatchAutoSaveFn,
      unwatchScreenshotFn: state.unwatchScreenshotFn,
      isRecording: true,
      recordingGame: state.recordingGame,
      recordingMod: state.recordingMod,
      autoSaveFile: null,
      recordingWin: null,
      playerFaction: null,
      opponentFaction: null,
      map: null,
      notes: null,
      links: null,
      screenshots: [],
      armySetups: [],
    });
  },
  setNullRecordingStartState: () => {
    set({
      index: get().matches.length + 1,
      recordingStartTime: new Date(),
      recordingUlid: null,
      unwatchAutoSaveFn: () => {},
      unwatchScreenshotFn: () => {},
      recordingGame: get().game,
      recordingMod: get().mod,
      autoSaveFile: null,
      recordingWin: null,
      playerFaction: null,
      opponentFaction: null,
      map: null,
      notes: null,
      links: null,
      screenshots: [],
      armySetups: [],
    });
  },
  // setNullRecordingStartState
  setAutoSaveFile: (file: string | null) => {
    set({ autoSaveFile: file });
  },
  updateScreenshot: (index: number, screenshot: Screenshot) => {
    set((state) => ({
      screenshots: state.screenshots.map((scrn, ii) =>
        ii === index ? screenshot : scrn,
      ),
    }));
  },
  updateArmySetup: (index: number, armySetup: ArmySetup) => {
    set((state) => ({
      armySetups: state.armySetups.map((aS, ii) =>
        ii === index ? armySetup : aS,
      ),
    }));
  },
  addScreenshot: (filename: string) => {
    set((state) => {
      const type =
        state.screenshots.length === 0
          ? RESULT
          : state.screenshots.length === 1
            ? END_BATTLE
            : OTHER;
      return {
        screenshots: [
          ...state.screenshots,
          {
            filename,
            type,
          },
        ],
      };
    });
  },
  addArmySetup: (filename: string, origFilename: string) => {
    set((state) => {
      const type =
        state.armySetups.length === 0
          ? PLAYER
          : state.armySetups.length === 1
            ? OPPONENT
            : OTHER;
      return {
        armySetups: [
          ...state.armySetups,
          {
            origFilename,
            filename,
            type,
          },
        ],
      };
    });
  },
  deleteArmySetup: (delFile: string) => {
    set((state) => {
      return {
        armySetups: state.armySetups.filter(
          ({ filename }) => filename !== delFile,
        ),
      };
    });
  },
  deleteScreenshot: (delFile: string) => {
    set((state) => {
      return {
        screenshots: state.screenshots.filter(
          ({ filename }) => filename !== delFile,
        ),
      };
    });
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
            index: state.index,
            game: state.recordingGame ?? TOTAL_WAR_WARHAMMER_3,
            mod: state.recordingMod ?? DEFAULT,
            recordingUlid: state.recordingUlid ?? "",
            autoSaveFile: state.autoSaveFile ?? "",
            recordingStartTime: state.recordingStartTime ?? recordingEndTime,
            recordingEndTime: recordingEndTime,
            win: state.recordingWin ?? false,
            playerFaction: state.playerFaction ?? BEASTMEN,
            opponentFaction: state.opponentFaction ?? BEASTMEN,
            notes: state.notes,
            map: state.map ?? "",
            links: state.links,
            screenshots: state.screenshots,
            armySetups: state.armySetups,
            matchType: state.matchType ?? DOMINATION,
          },
        ],
      };
    });
  },
  setMatch: (ii: number, match: RecordedMatch) => {
    set((state) => {
      const matches = [...state.matches];
      matches[ii] = match;
      return { matches };
    });
  },
  // getPersistedState
  getPersistedState: () => ({
    game: get().game,
    mod: get().mod,
    defaultMatchType: get().defaultMatchType,
    gameDirectory: get().gameDirectory,
    screenshotsDirectory: get().screenshotsDirectory,
  }),
}));
