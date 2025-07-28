import type { Faction, MatchTypes, SupportedGames } from "@/types";
import type { DbMatch, RecordedMatch } from "./types";
import { safeParseJson } from "./utils";

export const transformDbMatchToRecordedMatch = (
  dbMatch: DbMatch,
): RecordedMatch => {
  return {
    recordingNumber: dbMatch.id,
    matchType: dbMatch.match_type as MatchTypes,
    player1Id: dbMatch.player1_id,
    player2Id: dbMatch.player2_id,
    player1Faction: dbMatch.player1_faction as Faction,
    player2Faction: dbMatch.player2_faction as Faction,
    win: dbMatch.win,
    map: dbMatch.map,
    game: dbMatch.game as SupportedGames,
    mod: dbMatch.mod,
    recordingUlid: dbMatch.recording_ulid,
    autoSaveFile: dbMatch.auto_save_file,
    recordingStartTime: new Date(dbMatch.recording_start_time),
    recordingEndTime: new Date(dbMatch.recording_end_time),
    notes: dbMatch.notes,
    version: dbMatch.vrsn,
    links: safeParseJson(dbMatch.links, []),
    armySetups: safeParseJson(dbMatch.army_setups, []),
    screenshots: safeParseJson(dbMatch.screenshots, []),
  };
};
