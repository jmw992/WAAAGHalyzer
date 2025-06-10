import type {
  HISTORY,
  HOME,
  MATCH,
  SETTINGS,
  TOTAL_WAR_WARHAMMER_3,
  BEASTMEN,
  BRETONNIA,
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
  CONQUEST,
  DOMINATION,
  LAND_BATTLE,
  OTHER,
  END_BATTLE,
  LOADING,
  VICTORY,
} from "@/constants";

export type Page =
  | typeof HISTORY
  | typeof SETTINGS
  | typeof HOME
  | typeof MATCH;

export type SupportedGames = typeof TOTAL_WAR_WARHAMMER_3;

export type MatchTypes =
  | typeof CONQUEST
  | typeof DOMINATION
  | typeof LAND_BATTLE;

export type Faction =
  | typeof BEASTMEN
  | typeof BRETONNIA
  | typeof CHAOS_DEMONS
  | typeof CHAOS_DWARFS
  | typeof DARK_ELVES
  | typeof DWARFS
  | typeof EMPIRE
  | typeof GRAND_CATHAY
  | typeof GREENSKINS
  | typeof HIGH_ELVES
  | typeof KHORNE
  | typeof KISLEV
  | typeof LIZARDMEN
  | typeof NORSCA
  | typeof NURGLE
  | typeof OGRE_KINGDOMS
  | typeof SKAVEN
  | typeof SLAANESH
  | typeof TOMB_KINGS
  | typeof TZEENTCH
  | typeof VAMPIRE_COAST
  | typeof VAMPIRE_COUNTS
  | typeof WARRIORS_OF_CHAOS
  | typeof WOOD_ELVES;

export type ScreenshotType =
  | typeof OTHER
  | typeof END_BATTLE
  | typeof LOADING
  | typeof VICTORY;
