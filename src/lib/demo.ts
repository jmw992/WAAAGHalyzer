import { faker } from "@faker-js/faker";
import type { RecordedMatch } from "./types";
import type { Faction, MatchTypes } from "@/types";
import { FACTIONS, MATCH_TYPES } from "@/constants";

export const createRandomMatch = (
  faction?: Faction,
): Omit<RecordedMatch, "recordingNumber"> => {
  return {
    matchType: faker.helpers.arrayElement(MATCH_TYPES) as MatchTypes,
    player1Id: faker.string.uuid(),
    player2Id: faker.string.uuid(),
    player1Faction: faction || faker.helpers.arrayElement(FACTIONS),
    player2Faction: faction || faker.helpers.arrayElement(FACTIONS),
    autoSaveFile: null,
    map: faker.location.city(),
    win: faker.datatype.boolean(),
    game: "Total War Warhammer 3",
    mod: "Default",
    recordingUlid: faker.string.ulid(),
    recordingStartTime: faker.date.past(),
    recordingEndTime: faker.date.recent(),
    notes: faker.lorem.sentence(),
    links: [],
    armySetups: [],
    screenshots: [],
    versionMajor: 5,
    versionMinor: 1,
    versionPatch: 0,
  };
};
