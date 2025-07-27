"use client";
import { Clipboard, DownloadIcon } from "lucide-react";
import { ArmySetupSectionRecording } from "@/components/ArmySetupMatchSection/ArmySetupSectionRecording";
import { GameModSectionRecording } from "@/components/GameModSection/GameModSectionRecording";
import { LinksTableRecording } from "@/components/LinksTable/LinksTableRecord";
import MatchSaveButton from "@/components/MatchSaveButton";
import { MatchTableRecordingMatch } from "@/components/MatchTableGeneric/MatchTableRecording";
import NotesRecording from "@/components/Notes/NotesRecording";
// import PreMatchTable from "@/components/PreMatchTable";
import { PreMatchTableRecording } from "@/components/PreMatchTableGeneric/PreMatchTableRecording";
import RecordingSectionRecording from "@/components/RecordingSection/RecordingSectionRecording";
import { ScreenshotsSectionRecording } from "@/components/ScreenshotsMatchSection/ScreenshotsSectionRecording";
import { Button } from "@/components/ui/button";

export default function Match() {
  return (
    <div>
      <PreMatchTableRecording />
      <MatchTableRecordingMatch />
      <ScreenshotsSectionRecording />
      <ArmySetupSectionRecording />
      <LinksTableRecording />
      <GameModSectionRecording />
      <RecordingSectionRecording />
      <NotesRecording />
      <div className="flex justify-between mt-4">
        <MatchSaveButton />

        <div className="flex items-start">
          <Button
            onClick={() => {
              console.log("Copying recording to clipboard");
            }}
            size="sm"
            type="button"
            variant={"secondary"}
          >
            <Clipboard />
          </Button>
          <Button
            className="ml-1"
            onClick={() => {
              console.log("Downloading Icon");
            }}
            size="sm"
            type="reset"
            variant={"secondary"}
          >
            <DownloadIcon />
          </Button>
          <Button
            className="ml-1"
            onClick={() => {
              console.log("Submitting recording");
            }}
            size="sm"
            type="reset"
            variant={"destructive"}
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}
