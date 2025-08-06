"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DEFAULT, DOMINATION } from "@/constants";
import type { RecordedMatch } from "@/lib/types";
import { useZustandStore } from "@/lib/useZustandStore";
import { ArmySetupSectionGeneric } from "./ArmySetupMatchSection/ArmySetupSectionGeneric";
import { ArmySetupTableGeneric } from "./ArmySetupTable/ArmySetupTableGeneric";
import GameModSectionGeneric from "./GameModSection/GameModSectionGeneric";
import { LinksTableGeneric } from "./LinksTable/LinksTableGeneric";
import MatchTable from "./MatchTableGeneric/MatchTableGeneric";
import NotesGeneric from "./Notes/NotesGeneric";
import PreMatchTable from "./PreMatchTableGeneric/PreMatchTableGeneric";
import { ScreenshotsSectionGeneric } from "./ScreenshotsMatchSection/ScreenshotsSectionGeneric";
import { ScreenshotsTableGeneric } from "./ScreenshotsTable/ScreenshotsTableGeneric";

interface MatchDetailsDialogProps {
  match: RecordedMatch | null;
  isOpen: boolean;
  onClose: () => void;
}

export function MatchDetailsDialog({
  match,
  isOpen,
  onClose,
}: MatchDetailsDialogProps) {
  const state = useZustandStore((state) => state);

  if (!match) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Match Details</DialogTitle>
        </DialogHeader>
        <div>
          <PreMatchTable
            map={match.map ?? ""}
            matchType={match.matchType}
            matchNum={match.recordingNumber}
            player1Id={match.player1Id ?? ""}
            player2Id={match.player2Id ?? ""}
            setMap={(map) => {
              state.updateMatch({ ...match, map });
            }}
            setMatchType={(matchType) => {
              state.updateMatch({
                ...match,
                matchType: matchType ?? DOMINATION,
              });
            }}
            setPlayer1Id={(player1Id) => {
              state.updateMatch({ ...match, player1Id });
            }}
            setPlayer2Id={(player2Id) => {
              state.updateMatch({ ...match, player2Id });
            }}
          />
          <MatchTable
            player1Faction={match.player1Faction}
            player2Faction={match.player2Faction}
            recordingWin={match.win}
            setPlayer1Faction={(player1Faction) => {
              state.updateMatch({ ...match, player1Faction });
            }}
            setPlayer2Faction={(player2Faction) => {
              state.updateMatch({ ...match, player2Faction });
            }}
            setRecordingWin={(win) => {
              state.updateMatch({ ...match, win: win ?? false });
            }}
          />
          <ScreenshotsSectionGeneric
            addScreenshot={(screenshot) => {
              state.updateMatch({
                ...match,
                screenshots: [
                  ...match.screenshots,
                  { filename: screenshot, type: "Other" },
                ],
              });
            }}
            recordingUlid={match.recordingUlid}
            ScreenshotsTable={
              <ScreenshotsTableGeneric
                screenshots={match.screenshots}
                deleteScreenshot={(screenshot) => {
                  state.updateMatch({
                    ...match,
                    screenshots: match.screenshots.filter(
                      (s) => s.filename !== screenshot,
                    ),
                  });
                }}
                recordingUlid={match.recordingUlid}
                updateScreenshot={(index, screenshot) => {
                  state.updateMatch({
                    ...match,
                    screenshots: match.screenshots.map((s, i) =>
                      i === index ? screenshot : s,
                    ),
                  });
                }}
              />
            }
          />
          <ArmySetupSectionGeneric
            addArmySetup={(armySetup) => {
              state.updateMatch({
                ...match,
                armySetups: [
                  ...match.armySetups,
                  { filename: armySetup, type: "Other" },
                ],
              });
            }}
            recordingUlid={match.recordingUlid}
            ArmySetupTable={
              <ArmySetupTableGeneric
                armySetups={match.armySetups}
                deleteArmySetup={(armySetup) => {
                  state.updateMatch({
                    ...match,
                    armySetups: match.armySetups.filter(
                      (a) => a.filename !== armySetup,
                    ),
                  });
                }}
                recordingUlid={match.recordingUlid}
                updateArmySetup={(index, armySetup) => {
                  state.updateMatch({
                    ...match,
                    armySetups: match.armySetups.map((a, i) =>
                      i === index ? armySetup : a,
                    ),
                  });
                }}
              />
            }
          />
          <LinksTableGeneric
            links={match.links}
            deleteLink={(index) => {
              state.updateMatch({
                ...match,
                links: match.links.filter((_, i) => i !== index),
              });
            }}
            updateLink={(index, link) => {
              state.updateMatch({
                ...match,
                links: match.links.map((l, i) => (i === index ? link : l)),
              });
            }}
          />
          <GameModSectionGeneric
            recordingGame={match.game}
            recordingMod={match.mod}
            recordingVersion={match.version}
            setRecordingMod={(mod) => {
              state.updateMatch({ ...match, mod: mod ?? DEFAULT });
            }}
            setRecordingVersion={(version) => {
              state.updateMatch({ ...match, version });
            }}
          />
          <NotesGeneric
            notes={match.notes}
            setNotes={(notes) => {
              state.updateMatch({ ...match, notes });
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
