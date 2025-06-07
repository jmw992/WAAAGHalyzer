import type {
  HISTORY,
  HOME,
  MATCH,
  SETTINGS,
  TOTAL_WAR_WARHAMMER_3,
} from "@/constants";

export type Page =
  | typeof HISTORY
  | typeof SETTINGS
  | typeof HOME
  | typeof MATCH;

export type SupportedGames = typeof TOTAL_WAR_WARHAMMER_3;
