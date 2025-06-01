import { DEFAULT, TOTAL_WAR_WARHAMMER_3 } from "@/constants";
import type { SupportedGames } from "@/types";
import type { PersistedState } from "./useZustandStore";

export const getStorePersistedSettings = (): PersistedState => {
  return {
    game: (localStorage.getItem("game") ??
      TOTAL_WAR_WARHAMMER_3) as SupportedGames,
    mod: localStorage.getItem("mod") ?? DEFAULT,
    gameDirectory: localStorage.getItem("gameDirectory") ?? "",
    screenshotsDirectory: localStorage.getItem("screenshotsDirectory") ?? "",
  };
};

export const setStorePersistedSettings = (state: PersistedState) => {
  localStorage.setItem("game", state.game);
  localStorage.setItem("mod", state.mod);
  localStorage.setItem("gameDirectory", state.gameDirectory);
  localStorage.setItem("screenshotsDirectory", state.screenshotsDirectory);
};
