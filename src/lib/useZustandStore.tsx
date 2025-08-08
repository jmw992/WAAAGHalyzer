import type Database from "@tauri-apps/plugin-sql";
import { create } from "zustand";
import {
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
  ArmySetup,
  DbMatch,
  Link,
  RecordedMatch,
  RecordingState,
  Screenshot,
  StartRecordingProps,
  ZustandStateAction,
} from "@/lib/types";
import type { Page, SupportedGames } from "@/types";
import { transformDbMatchToRecordedMatch } from "./transform";

export const useZustandStore = create<ZustandStateAction>((set, get) => ({
  db: null,
  setDb: (db: Database) => {
    set({ db });
  },
  index: 0,
  page: HOME,
  matches: [],
  defaultMatchType: DOMINATION,
  demoMode: false,

  setPage: (value: Page) => {
    set({ page: value });
  },
  matchType: null,
  setMatchType(matchType: RecordingState["matchType"]) {
    set({ matchType });
  },
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
  recordingVersion: "1.0.0", // Default version if not set
  setRecordingVersion: (value: string) => {
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
  isRecording: false,
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
      recordingVersion: get().recordingVersion,
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
  addArmySetup: (filename: string) => {
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
  getPersistedState: () => ({
    game: get().game,
    mod: get().mod,
    defaultMatchType: get().defaultMatchType,
    gameDirectory: get().gameDirectory,
    screenshotsDirectory: get().screenshotsDirectory,
    playerId: get().playerId,
    version: get().version || "1.0.0", // Default version if not set
    demoMode: get().demoMode,
  }),
  setDemoMode: (demoMode) => {
    set({ demoMode });
  },

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
      ((await get().getLatestRecordingNumberDb()) ?? 0) + 1;
    console.log("Setting latest recording number to:", latestRecordingNumber);
    // Update the Zustand state with the latest
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
      version,
    } = match;
    const db = get().db;
    if (!db) {
      console.error("Database not initialized");
      return;
    }
    try {
      await db.execute(
        `INSERT INTO matches (match_type, player1_id, 
        player2_id, player1_faction, player2_faction, win, 
        map, game, mod, recording_ulid, auto_save_file, recording_start_time, 
        recording_end_time, notes, links, army_setups, screenshots, vrsn) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, 
        $15, $16, $17, $18)`,
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
          notes,
          links.length ? JSON.stringify(links) : null,
          armySetups.length ? JSON.stringify(armySetups) : null,
          screenshots.length ? JSON.stringify(screenshots) : null,
          version,
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
      await get().addMatchDb({
        matchType: get().matchType ?? DOMINATION,
        player1Id: get().player1Id,
        player2Id: get().player2Id,
        player1Faction: get().player1Faction,
        player2Faction: get().player2Faction,
        win: get().recordingWin ?? false,
        map: get().map,
        game: get().recordingGame ?? TOTAL_WAR_WARHAMMER_3,
        mod: get().recordingMod ?? DEFAULT,
        recordingUlid: get().recordingUlid ?? "",
        autoSaveFile: get().autoSaveFile,
        recordingStartTime: get().recordingStartTime ?? new Date(),
        recordingEndTime: new Date(),
        notes: get().notes,
        links: get().links,
        armySetups: get().armySetups,
        screenshots: get().screenshots,
        version: get().recordingVersion,
      });
    } catch (error) {
      console.error("Error adding recording:", error);
    }
  },

  getMatchesDb: async () => {
    const db = get().db;
    if (!db) {
      console.error("Database not initialized");
      return null;
    }
    try {
      const matches: DbMatch[] = await db.select("SELECT * FROM matches");
      return matches.map(transformDbMatchToRecordedMatch);
    } catch (error) {
      console.error("Error fetching matches:", error);
      return null;
    }
  },

  updateMatchDb: async (recordingUlid: string, match: RecordedMatch) => {
    const db = get().db;
    if (!db) {
      console.error("Database not initialized");
      return;
    }
    try {
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
        autoSaveFile,
        recordingStartTime,
        recordingEndTime,
        notes,
        links,
        armySetups,
        screenshots,
        version,
      } = match;
      await db.execute(
        `UPDATE matches SET match_type = $1, player1_id = $2, player2_id = $3, 
        player1_faction = $4, player2_faction = $5, win = $6, map = $7, game = $8, 
        mod = $9, auto_save_file = $10, recording_start_time = $11, recording_end_time = $12, 
        notes = $13, links = $14, army_setups = $15, screenshots = $16, vrsn = $17 
        WHERE recording_ulid = $18`,
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
          autoSaveFile,
          recordingStartTime.toISOString(),
          recordingEndTime.toISOString(),
          notes,
          links.length ? JSON.stringify(links) : null,
          armySetups.length ? JSON.stringify(armySetups) : null,
          screenshots.length ? JSON.stringify(screenshots) : null,
          version,
          recordingUlid,
        ],
      );
    } catch (error) {
      console.error("Error updating match:", error);
    }
  },
}));
