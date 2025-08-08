import type { UnwatchFn } from "@tauri-apps/plugin-fs";
import type Database from "@tauri-apps/plugin-sql";
import type {
  ArmySetupType,
  Faction,
  MatchTypes,
  Page,
  ScreenshotType,
  SupportedGames,
} from "@/types";

export interface AppMeta {
  db: Database | null;
}

export interface DbMatch {
  id: number;
  match_type: string;
  player1_id: string | null;
  player2_id: string | null;
  player1_faction: string | null;
  player2_faction: string | null;
  win: boolean;
  map: string | null;
  game: string;
  mod: string;
  recording_ulid: string;
  auto_save_file: string | null;
  recording_start_time: string;
  recording_end_time: string;
  notes: string | null;
  links: string | null;
  army_setups: string | null;
  screenshots: string | null;
  version_major: number;
  version_minor: number;
  version_patch: number;
}

/** These state items get persisted between app close & open */
export interface PersistedState {
  game: SupportedGames;
  mod: string;
  version_major: number;
  version_minor: number;
  version_patch: number;
  gameDirectory: string;
  screenshotsDirectory: string;
  playerId: string | null;
  defaultMatchType: MatchTypes;
  demoMode: boolean;
}

export interface Screenshot {
  /** Filename without extension */
  filename: string;
  type: ScreenshotType;
}

export interface ArmySetup {
  /** Filename without extension */
  filename: string;
  type: ArmySetupType;
}

export interface Link {
  title: string;
  url: string;
}

export interface RecordedMatch {
  recordingNumber: number;
  matchType: MatchTypes;
  player1Id: string | null;
  player2Id: string | null;
  player1Faction: Faction | null;
  player2Faction: Faction | null;
  autoSaveFile: string | null;
  map: string | null;
  /** Whether Player 1 won the match.*/
  win: boolean;
  game: PersistedState["game"];
  mod: PersistedState["mod"];
  recordingUlid: string;
  recordingStartTime: Date;
  recordingEndTime: Date;
  notes: RecordingState["notes"];
  links: RecordingState["links"];
  armySetups: RecordingState["armySetups"];
  screenshots: RecordingState["screenshots"];
  version_major: number;
  version_minor: number;
  version_patch: number;
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
  recordingGame: SupportedGames | null;
  recordingMod: string | null;
  recordingWin: boolean | null;
  matchType: MatchTypes | null;
  version_major: number;
  version_minor: number;
  version_patch: number;
  player1Id: string | null;

  player2Id: string | null;
  player1Faction: Faction | null;
  player2Faction: Faction | null;
  map: string | null;
  notes: string | null;
  recordingNumber: number | null;

  links: Link[];
  screenshots: Screenshot[];
  armySetups: ArmySetup[];
};

/** Transient state items that get reset between app close & open */
export type TransientState = RecordingState & {
  page: Page;
};

/** Full application state */
export type State = PersistedState & TransientState;

export interface Action {
  setPage: (page: State["page"]) => void;
  setMatchType: (matchType: RecordingState["matchType"]) => void;
  setMap: (map: RecordingState["map"]) => void;
  setPlayer1Faction: (player1Faction: RecordingState["player1Faction"]) => void;
  setPlayer2Faction: (player2Faction: RecordingState["player2Faction"]) => void;
  setRecordingWin: (recordingWin: RecordingState["recordingWin"]) => void;
  setRecordingMod: (recordingWin: RecordingState["recordingMod"]) => void;
  setVersionMajor: (version_major: number) => void;
  setVersionMinor: (version_minor: number) => void;
  setVersionPatch: (version_patch: number) => void;
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
  addArmySetup: (filename: string) => void;
  deleteArmySetup: (file: string) => void;
  updateArmySetup: (index: number, armySetup: ArmySetup) => void;
  setPlayer1Id: (player1Id: string | null) => void;
  setPlayer2Id: (player2Id: string | null) => void;

  addLink: (link: Link) => void;
  deleteLink: (index: number) => void;
  updateLink: (index: number, link: Link) => void;

  setGame: (game: SupportedGames) => void;
  setPlayerId: (playerId: string) => void;
  setGameDirectory: (gameDirectory: State["gameDirectory"]) => void;
  setMod: (mod: State["mod"]) => void;
  setNotes: (notes: State["notes"]) => void;
  setScreenshotsDirectory: (
    gameDirectory: State["screenshotsDirectory"],
  ) => void;
  setPersistedState: (value: PersistedState) => void;
  getPersistedState: () => PersistedState;
  setDemoMode: (demoMode: boolean) => void;

  setDb: (db: Database) => void;
}

export interface DbActions {
  getLatestRecordingNumberDb: () => Promise<number | null>;
  setLatestRecordingNumberDb: () => Promise<void>;
  /** Adds Match to Db, rely on Db to auto-increment */
  addMatchDb: (match: Omit<RecordedMatch, "recordingNumber">) => Promise<void>;
  addRecordingMatchDb: () => Promise<void>;
  getMatchesDb: () => Promise<RecordedMatch[] | null>;
  updateMatchDb: (recordingUlid: string, match: RecordedMatch) => Promise<void>;
}

export type ZustandStateAction = State & Action & AppMeta & DbActions;
