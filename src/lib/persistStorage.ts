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
    versionMajor: Number(localStorage.getItem("versionMajor")) || 1,
    versionMinor: Number(localStorage.getItem("versionMinor")) || 0,
    versionPatch: Number(localStorage.getItem("versionPatch")) || 0,
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
  localStorage.setItem("versionMajor", state.versionMajor.toString());
  localStorage.setItem("versionMinor", state.versionMinor.toString());
  localStorage.setItem("versionPatch", state.versionPatch.toString());
  localStorage.setItem("demoMode", state.demoMode.toString());
};
