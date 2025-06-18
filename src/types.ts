import type {
  BEASTMEN,
  BRETONNIA,
  CHAOS_DEMONS,
  CHAOS_DWARFS,
  CONQUEST,
  DARK_ELVES,
  DOMINATION,
  DWARFS,
  EMPIRE,
  END_BATTLE,
  GRAND_CATHAY,
  GREENSKINS,
  HIGH_ELVES,
  HISTORY,
  HOME,
  KHORNE,
  KISLEV,
  LAND_BATTLE,
  LIZARDMEN,
  LOADING,
  MATCH,
  NORSCA,
  NURGLE,
  OGRE_KINGDOMS,
  OPPONENT,
  OTHER,
  PLAYER,
  RESULT,
  SETTINGS,
  SKAVEN,
  SLAANESH,
  TOMB_KINGS,
  TOTAL_WAR_WARHAMMER_3,
  TZEENTCH,
  VAMPIRE_COAST,
  VAMPIRE_COUNTS,
  WARRIORS_OF_CHAOS,
  WOOD_ELVES,
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
  | typeof RESULT;

export type ArmySetupType = typeof OTHER | typeof PLAYER | typeof OPPONENT;
