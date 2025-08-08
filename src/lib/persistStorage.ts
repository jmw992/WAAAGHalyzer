import { DEFAULT, DOMINATION, TOTAL_WAR_WARHAMMER_3 } from "@/constants";
import type { MatchTypes, SupportedGames } from "@/types";
import type { PersistedState } from "./types";

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
    version_major: Number(localStorage.getItem("version_major")) || 1,
    version_minor: Number(localStorage.getItem("version_minor")) || 0,
    version_patch: Number(localStorage.getItem("version_patch")) || 0,
    demoMode: localStorage.getItem("demoMode") === "true",
  };
};

export const setStorePersistedSettings = (state: PersistedState) => {
  localStorage.setItem("game", state.game);
  localStorage.setItem("mod", state.mod);
  localStorage.setItem("gameDirectory", state.gameDirectory);
  localStorage.setItem("screenshotsDirectory", state.screenshotsDirectory);
  localStorage.setItem("defaultMatchType", state.defaultMatchType);
  localStorage.setItem("playerId", state.playerId ?? "");
  localStorage.setItem("version_major", state.version_major.toString());
  localStorage.setItem("version_minor", state.version_minor.toString());
  localStorage.setItem("version_patch", state.version_patch.toString());
  localStorage.setItem("demoMode", state.demoMode.toString());
};
