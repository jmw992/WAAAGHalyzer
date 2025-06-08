export const HISTORY = "History";
export const SETTINGS = "Settings";
export const MATCH = "Match";
export const HOME = "Home";

/**  Appdate directory of default game Total War warhammer 3, relative to user config directory
 * https://v2.tauri.app/reference/javascript/api/namespacepath/#configdir
 */
export const DEFAULT_GAME_DIRECTORY = "The Creative Assembly\\Warhammer3";
/**  Windows Screenshots directory, relative to the the default user pictures directory
 https://v2.tauri.app/reference/javascript/api/namespacepath/#picturedir */
export const DEFAULT_SCREENSHOTS_DIRECTORY = "Screenshots";

export const AUTO_SAVE_REPLAY_NAME = "Auto-save.replay";

export const TOTAL_WAR_WARHAMMER_3 = "Total War Warhammer 3";

export const DEFAULT = "default";

export const REPLAYS = "replays";

export const SUPPORTED_GAMES = [TOTAL_WAR_WARHAMMER_3] as const;

export const MATCHES = "matches";

// Factions
export const BRETONNIA = "Bretonnia";
export const BEASTMEN = "Beastmen";
export const CHAOS_DEMONS = "Chaos Demons";
export const CHAOS_DWARFS = "Chaos Dwarfs";
export const DARK_ELVES = "Dark Elves";
export const DWARFS = "Dwarfs";
export const EMPIRE = "Empire";
export const GRAND_CATHAY = "Grand Cathay";
export const GREENSKINS = "Greenskins";
export const HIGH_ELVES = "High Elves";
export const KHORNE = "Khorne";
export const KISLEV = "Kislev";
export const LIZARDMEN = "Lizardmen";
export const NORSCA = "Norsca";
export const NURGLE = "Nurgle";
export const OGRE_KINGDOMS = "Ogre Kingdoms";
export const SKAVEN = "Skaven";
export const SLAANESH = "Slaanesh";
export const TOMB_KINGS = "Tomb Kings";
export const TZEENTCH = "Tzeentch";
export const VAMPIRE_COAST = "Vampire Coast";
export const VAMPIRE_COUNTS = "Vampire Counts";
export const WARRIORS_OF_CHAOS = "Warriors of Chaos";
export const WOOD_ELVES = "Wood Elves";

export const FACTIONS = [
  BRETONNIA,
  BEASTMEN,
  CHAOS_DEMONS,
  CHAOS_DWARFS,
  DARK_ELVES,
  DWARFS,
  EMPIRE,
  GRAND_CATHAY,
  GREENSKINS,
  HIGH_ELVES,
  KHORNE,
  KISLEV,
  LIZARDMEN,
  NORSCA,
  NURGLE,
  OGRE_KINGDOMS,
  SKAVEN,
  SLAANESH,
  TOMB_KINGS,
  TZEENTCH,
  VAMPIRE_COAST,
  VAMPIRE_COUNTS,
  WARRIORS_OF_CHAOS,
  WOOD_ELVES,
] as const;

export const WIN = "Win";
export const LOSS = "Loss";
export const RESULT_ARRAY = [WIN, LOSS];
