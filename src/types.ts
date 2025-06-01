import type {
  HISTORY,
  HOME,
  RECORD,
  SETTINGS,
  TOTAL_WAR_WARHAMMER_3,
} from "@/constants";

export type Page =
  | typeof HISTORY
  | typeof SETTINGS
  | typeof HOME
  | typeof RECORD;

export type SupportedGames = typeof TOTAL_WAR_WARHAMMER_3;
