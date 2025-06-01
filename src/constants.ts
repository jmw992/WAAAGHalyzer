export const HISTORY = "History";
export const SETTINGS = "Settings";
export const RECORD = "Record";
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
