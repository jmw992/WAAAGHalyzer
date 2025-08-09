"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DEFAULT, DOMINATION, OTHER } from "@/constants";
import type { RecordedMatch } from "@/lib/types";
import { useZustandStore } from "@/lib/useZustandStore";
import { ArmySetupSectionGeneric } from "./ArmySetupMatchSection/ArmySetupSectionGeneric";
import { ArmySetupTableGeneric } from "./ArmySetupTable/ArmySetupTableGeneric";
import GameModSectionGeneric from "./GameModSection/GameModSectionGeneric";
import { LinksTableGeneric } from "./LinksTable/LinksTableGeneric";
import MatchTableGeneric from "./MatchTableGeneric/MatchTableGeneric";
import NotesGeneric from "./Notes/NotesGeneric";
import PreMatchTable from "./PreMatchTableGeneric/PreMatchTableGeneric";
import { ScreenshotsSectionGeneric } from "./ScreenshotsMatchSection/ScreenshotsSectionGeneric";
import { ScreenshotsTableGeneric } from "./ScreenshotsTable/ScreenshotsTableGeneric";
import { Button } from "./ui/button";
import VersionSectionGeneric from "./VersionSection/VersionSectionGeneric";

interface MatchDetailsDialogProps {
  match: RecordedMatch | null;
  isOpen: boolean;
  onClose: () => void;
}

export function MatchDetailsDialog({
  match: initialMatch,
  isOpen,
  onClose,
}: MatchDetailsDialogProps) {
  const queryClient = useQueryClient();
  const updateMatchDb = useZustandStore((state) => state.updateMatchDb);
  const [match, setMatch] = useState<RecordedMatch | null>(initialMatch);

  const mutation = useMutation({
    mutationFn: (match: RecordedMatch) =>
      updateMatchDb(match.recordingUlid, match),
    onSuccess: () => {
      toast.success("Match updated successfully!");
      void queryClient.invalidateQueries({ queryKey: ["matches"] });
      onClose();
    },
    onError: (error) => {
      console.error("Error updating match:", error);
      toast.error("Failed to update match.");
    },
  });

  useEffect(() => {
    setMatch(initialMatch);
  }, [initialMatch]);

  if (!match) {
    return null;
  }

  const handleSubmit = () => {
    mutation.mutate(match);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] h-[95vh] overflow-y-auto">
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
              setMatch({ ...match, map });
            }}
            setMatchType={(matchType) => {
              setMatch({
                ...match,
                matchType: matchType ?? DOMINATION,
              });
            }}
            setPlayer1Id={(player1Id) => {
              setMatch({ ...match, player1Id });
            }}
            setPlayer2Id={(player2Id) => {
              setMatch({ ...match, player2Id });
            }}
          />
          <MatchTableGeneric
            player1Faction={match.player1Faction}
            player2Faction={match.player2Faction}
            recordingWin={match.win}
            setPlayer1Faction={(player1Faction) => {
              setMatch({ ...match, player1Faction });
            }}
            setPlayer2Faction={(player2Faction) => {
              setMatch({ ...match, player2Faction });
            }}
            setRecordingWin={(win) => {
              setMatch({ ...match, win: win ?? false });
            }}
          />
          <ScreenshotsSectionGeneric
            addScreenshot={(screenshot) => {
              setMatch({
                ...match,
                screenshots: [
                  ...match.screenshots,
                  { filename: screenshot, type: OTHER },
                ],
              });
            }}
            recordingUlid={match.recordingUlid}
            ScreenshotsTable={
              <ScreenshotsTableGeneric
                screenshots={match.screenshots}
                deleteScreenshot={(screenshot) => {
                  setMatch({
                    ...match,
                    screenshots: match.screenshots.filter(
                      (s) => s.filename !== screenshot,
                    ),
                  });
                }}
                recordingUlid={match.recordingUlid}
                updateScreenshot={(index, screenshot) => {
                  setMatch({
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
              setMatch({
                ...match,
                armySetups: [
                  ...match.armySetups,
                  { filename: armySetup, type: OTHER },
                ],
              });
            }}
            recordingUlid={match.recordingUlid}
            ArmySetupTable={
              <ArmySetupTableGeneric
                armySetups={match.armySetups}
                deleteArmySetup={(armySetup) => {
                  setMatch({
                    ...match,
                    armySetups: match.armySetups.filter(
                      (a) => a.filename !== armySetup,
                    ),
                  });
                }}
                recordingUlid={match.recordingUlid}
                updateArmySetup={(index, armySetup) => {
                  setMatch({
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
              setMatch({
                ...match,
                links: match.links.filter((_, i) => i !== index),
              });
            }}
            updateLink={(index, link) => {
              setMatch({
                ...match,
                links: match.links.map((l, i) => (i === index ? link : l)),
              });
            }}
          />
          <GameModSectionGeneric
            recordingGame={match.game}
            recordingMod={match.mod}
            setRecordingMod={(mod) => {
              setMatch({ ...match, mod: mod ?? DEFAULT });
            }}
          />
          <VersionSectionGeneric
            versionMajor={match.versionMajor}
            versionMinor={match.versionMinor}
            versionPatch={match.versionPatch}
            setVersion={(versionMajor, versionMinor, versionPatch) => {
              setMatch({ ...match, versionMajor, versionMinor, versionPatch });
            }}
            idPrefix="match-details"
          />
          <NotesGeneric
            notes={match.notes}
            setNotes={(notes) => {
              setMatch({ ...match, notes });
            }}
          />
        </div>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogContent>
    </Dialog>
  );
}
