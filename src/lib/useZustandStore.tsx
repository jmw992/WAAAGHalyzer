import type { UnwatchFn } from "@tauri-apps/plugin-fs";
import { create } from "zustand";
import {
  BEASTMEN,
  DEFAULT,
  DOMINATION,
  END_BATTLE,
  HOME,
  OTHER,
  PLAYER1,
  PLAYER2,
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
import Database from "@tauri-apps/plugin-sql";

export interface AppMeta {
  db: Database | null;
}

/** These state items get persisted between app close & open */
export interface PersistedState {
  game: SupportedGames;
  mod: string;
  version: string;
  gameDirectory: string;
  screenshotsDirectory: string;
  playerId: string | null;
  defaultMatchType: MatchTypes;
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

export interface Link {
  title: string;
  url: string;
}

export interface RecordedMatch {
  recordingNumber: number;
  matchType: MatchTypes;
  player1Id: string;
  player2Id: string;
  player1Faction: Faction;
  player2Faction: Faction;
  /** Whether Player 1 won the match.*/
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

export interface StartRecordingProps {
  recordingUlid: string | null;
  unwatchAutoSaveFn: UnwatchFn;
  unwatchScreenshotFn: UnwatchFn;
  unwatchArmySetup: UnwatchFn;
}

export type RecordingState = StartRecordingProps & {
  isRecording: boolean;
  recordingStartTime: Date | null;

  autoSaveFile: string | null;
  screenshots: Screenshot[];
  armySetups: ArmySetup[];
  recordingGame: SupportedGames | null;
  recordingMod: string | null;
  recordingWin: boolean | null;
  matchType: MatchTypes | null;
  recordingVersion: string | null;
  player1Id: string | null;

  player2Id: string | null;
  player1Faction: Faction | null;
  player2Faction: Faction | null;
  map: string | null;
  notes: string | null;
  links: Link[];
  recordingNumber: number | null;
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
  setRecordingNumber: (recordingNumber: number) => void;
  setMatchType: (matchType: RecordingState["matchType"]) => void;
  setMap: (map: RecordingState["map"]) => void;
  setPlayer1Faction: (player1Faction: RecordingState["player1Faction"]) => void;
  setPlayer2Faction: (player2Faction: RecordingState["player2Faction"]) => void;
  setRecordingWin: (recordingWin: RecordingState["recordingWin"]) => void;
  setRecordingMod: (recordingWin: RecordingState["recordingMod"]) => void;
  setRecordingVersion: (
    recordingVersion: RecordingState["recordingVersion"],
  ) => void;
  setIsRecording: (isRecording: RecordingState["isRecording"]) => void;
  setRecordingStartTime: (
    startTime: RecordingState["recordingStartTime"],
  ) => void;
  setRecordingUlid: (ulid: StartRecordingProps["recordingUlid"]) => void;

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
  setPlayer1Id: (player1Id: string | null) => void;
  setPlayer2Id: (player2Id: string | null) => void;

  addLink: (link: Link) => void;
  deleteLink: (index: number) => void;
  updateLink: (index: number, link: Link) => void;

  setGame: (game: SupportedGames) => void;
  setVersion: (version: string) => void;
  setPlayerId: (playerId: string) => void;
  setGameDirectory: (gameDirectory: State["gameDirectory"]) => void;
  setMod: (mod: State["mod"]) => void;
  setNotes: (notes: State["notes"]) => void;
  setScreenshotsDirectory: (
    gameDirectory: State["screenshotsDirectory"],
  ) => void;
  setPersistedState: (value: PersistedState) => void;
  getPersistedState: () => PersistedState;

  setDb: (db: Database) => void;
}

export interface DbActions {
  getLatestRecordingNumberDb: () => Promise<number | null>;
  setLatestRecordingNumberDb: () => Promise<void>;
  /** Adds Match to Db, rely on Db to auto-increment */
  addMatchDb: (match: Omit<RecordedMatch, "recordingNumber">) => Promise<void>;
  addRecordingMatchDb: () => Promise<void>;
}

export type ZustandStateAction = State & Action & AppMeta & DbActions;

export const useZustandStore = create<ZustandStateAction>((set, get) => ({
  db: null,
  setDb: (db: Database) => {
    set({ db });
  },
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
  playerId: null,
  setPlayerId: (playerId) => {
    set({ playerId });
  },
  version: "1.0.0", // Default version if not set
  setVersion: (value: string) => {
    set({ version: value });
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
  recordingVersion: null,
  setRecordingVersion: (value: string | null) => {
    set({ recordingVersion: value });
  },
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
  recordingNumber: 0,
  setRecordingNumber: (recordingNumber: number) => {
    set({ recordingNumber });
  },
  recordingGame: TOTAL_WAR_WARHAMMER_3,
  recordingMod: DEFAULT,
  recordingWin: null,
  player1Id: null,
  player2Id: null,
  player1Faction: null,
  player2Faction: null,
  map: null,
  notes: null,
  links: [],
  addLink: (link: Link) => {
    set((state) => ({
      links: [...state.links, link],
    }));
  },
  deleteLink: (index: number) => {
    set((state) => ({
      links: state.links.filter((_, i) => i !== index),
    }));
  },
  updateLink: (index: number, link: Link) => {
    set((state) => ({
      links: state.links.map((l, i) => (i === index ? link : l)),
    }));
  },
  setMap: (map) => {
    set({ map });
  },
  setPlayer1Id: (player1Id) => {
    set({ player1Id });
  },
  setPlayer2Id: (player2Id) => {
    set({ player2Id });
  },
  setPlayer1Faction: (player1Faction) => {
    set({ player1Faction });
  },
  setPlayer2Faction: (player2Faction) => {
    set({ player2Faction });
  },
  setRecordingStartState: (state: StartRecordingProps) => {
    set({
      recordingStartTime: new Date(),
      recordingUlid: state.recordingUlid,
      unwatchAutoSaveFn: state.unwatchAutoSaveFn,
      unwatchScreenshotFn: state.unwatchScreenshotFn,
      unwatchArmySetup: state.unwatchArmySetup,
      isRecording: true,
      autoSaveFile: null,
      recordingWin: null,
      recordingVersion: get().version,
      player1Id: get().playerId,
      player2Id: null,
      player1Faction: null,
      player2Faction: null,
      map: null,
      notes: null,
      links: [],
      screenshots: [],
      armySetups: [],
    });
  },
  setNullRecordingStartState: () => {
    set({
      recordingNumber: null,
      recordingStartTime: new Date(),
      recordingUlid: null,
      unwatchAutoSaveFn: () => {},
      unwatchScreenshotFn: () => {},
      recordingGame: get().game,
      recordingMod: get().mod,
      autoSaveFile: null,
      recordingWin: null,
      player1Faction: null,
      player2Faction: null,
      map: null,
      notes: null,
      links: [],
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
          ? PLAYER1
          : state.armySetups.length === 1
            ? PLAYER2
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
            recordingNumber: state.recordingNumber ?? 0,
            game: state.recordingGame ?? TOTAL_WAR_WARHAMMER_3,
            mod: state.recordingMod ?? DEFAULT,
            recordingUlid: state.recordingUlid ?? "",
            autoSaveFile: state.autoSaveFile ?? "",
            recordingStartTime: state.recordingStartTime ?? recordingEndTime,
            recordingEndTime: recordingEndTime,
            win: state.recordingWin ?? false,
            player1Id: state.player1Id ?? "",
            player2Id: state.player2Id ?? "",
            player1Faction: state.player1Faction ?? BEASTMEN,
            player2Faction: state.player2Faction ?? BEASTMEN,
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
  getPersistedState: () => ({
    game: get().game,
    mod: get().mod,
    defaultMatchType: get().defaultMatchType,
    gameDirectory: get().gameDirectory,
    screenshotsDirectory: get().screenshotsDirectory,
    playerId: get().playerId,
    version: get().version || "1.0.0", // Default version if not set
  }),

  getLatestRecordingNumberDb: async () => {
    const db = get().db;
    if (!db) {
      console.error("Database not initialized");
      return null;
    }
    try {
      const result: Record<string, number | null>[] = await db.select(
        "SELECT MAX(id) FROM matches",
      );
      console.log("Latest match result:", result);
      const latestMatchId = result[0]["MAX(id)"] ?? 0;
      return latestMatchId;
    } catch (error) {
      console.error("Error fetching latest match:", error);
      return null;
    }
  },
  setLatestRecordingNumberDb: async () => {
    const latestRecordingNumber =
      (await get().getLatestRecordingNumberDb()) ?? 0 + 1;
    set({ recordingNumber: latestRecordingNumber });
  },
  addMatchDb: async (match: Omit<RecordedMatch, "recordingNumber">) => {
    const {
      matchType,
      player1Id,
      player2Id,
      player1Faction,
      player2Faction,
      win,
      map,
      game,
      mod,
      recordingUlid,
      autoSaveFile,
      recordingStartTime,
      recordingEndTime,
      notes,
      links,
      armySetups,
      screenshots,
    } = match;
    const db = get().db;
    if (!db) {
      console.error("Database not initialized");
      return;
    }
    try {
      await db.execute(
        "INSERT INTO matches (match_type, " +
          "player1_id, player2_id, player1_faction, player2_faction, " +
          "win, map, game, mod, recording_ulid, auto_save_file, " +
          "recording_start_time, recording_end_time, notes, links, army_setups, screenshots) " +
          "VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)",
        [
          matchType,
          player1Id,
          player2Id,
          player1Faction,
          player2Faction,
          win,
          map,
          game,
          mod,
          recordingUlid,
          autoSaveFile,
          recordingStartTime.toISOString(),
          recordingEndTime.toISOString(),
          notes ?? "",
          JSON.stringify(links),
          JSON.stringify(armySetups),
          JSON.stringify(screenshots),
        ],
      );
    } catch (error) {
      console.error("Error adding match:", error);
    }
  },
  addRecordingMatchDb: async () => {
    const db = get().db;
    if (!db) {
      console.error("Database not initialized");
      return;
    }
    try {
      get().addMatchDb({
        matchType: get().matchType ?? DOMINATION,
        player1Id: get().player1Id ?? "",
        player2Id: get().player2Id ?? "",
        player1Faction: get().player1Faction ?? BEASTMEN,
        player2Faction: get().player2Faction ?? BEASTMEN,
        win: get().recordingWin ?? false,
        map: get().map ?? "",
        game: get().recordingGame ?? TOTAL_WAR_WARHAMMER_3,
        mod: get().recordingMod ?? DEFAULT,
        recordingUlid: get().recordingUlid ?? "",
        autoSaveFile: get().autoSaveFile ?? "",
        recordingStartTime: get().recordingStartTime ?? new Date(),
        recordingEndTime: new Date(),
        notes: get().notes,
        links: get().links,
        armySetups: get().armySetups,
        screenshots: get().screenshots,
      });
    } catch (error) {
      console.error("Error adding recording:", error);
    }
  },
}));
