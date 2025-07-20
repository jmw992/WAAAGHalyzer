import { DEFAULT, DOMINATION, TOTAL_WAR_WARHAMMER_3 } from "@/constants";
import type { MatchTypes, SupportedGames } from "@/types";
import type { PersistedState } from "./useZustandStore";

export const getStorePersistedSettings = (): PersistedState => {
  return {
    game: (localStorage.getItem("game") ??
      TOTAL_WAR_WARHAMMER_3) as SupportedGames,
    mod: localStorage.getItem("mod") ?? DEFAULT,
    defaultMatchType: (localStorage.getItem("defaultMatchType") ??
      DOMINATION) as MatchTypes,
    gameDirectory: localStorage.getItem("gameDirectory") ?? "",
    screenshotsDirectory: localStorage.getItem("screenshotsDirectory") ?? "",
    playerId: localStorage.getItem("playerId") ?? null,
    version: localStorage.getItem("version") ?? "",
  };
};

export const setStorePersistedSettings = (state: PersistedState) => {
  localStorage.setItem("game", state.game);
  localStorage.setItem("mod", state.mod);
  localStorage.setItem("gameDirectory", state.gameDirectory);
  localStorage.setItem("screenshotsDirectory", state.screenshotsDirectory);
  localStorage.setItem("defaultMatchType", state.defaultMatchType);
  localStorage.setItem("playerId", state.playerId ?? "");
  localStorage.setItem("version", state.version ?? "");
};
