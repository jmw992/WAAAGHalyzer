"use client";
import { ArmySetupMatchSection } from "@/components/ArmySetupMatchSection";
import MatchTable from "@/components/MatchTable";
import { ScreenshotsMatchSection } from "@/components/ScreenshotsMatchSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
// import { FolderInput } from "@/components/FolderInputDialog";
import { SUPPORTED_GAMES } from "@/constants";
import { useZustandStore } from "@/lib/useZustandStore";

export function Notes() {
  return (
    <>
      <label htmlFor="notesInput">Notes</label>
      <Textarea id="notesInput" placeholder="Type your message here." />{" "}
    </>
  );
}

export default function Match() {
  const screenshots = useZustandStore((state) => state.screenshots);
  const recordingGame = useZustandStore((state) => state.recordingGame);
  const recordingMod = useZustandStore((state) => state.recordingMod);
  const recordingUlid = useZustandStore((state) => state.recordingUlid);
  const autoSaveFile = useZustandStore((state) => state.autoSaveFile);
  const recordingStartTime = useZustandStore(
    (state) => state.recordingStartTime,
  );
  const links = useZustandStore((state) => state.links);
  const notes = useZustandStore((state) => state.notes);
  const setNotes = useZustandStore((state) => state.setNotes);

  return (
    <div>
      <MatchTable />
      <ScreenshotsMatchSection />
      <ArmySetupMatchSection />

      <div className="flex flex-row pb-4">
        <div>
          <label htmlFor="recording-game">Game</label>
          <Select
            value={recordingGame ?? undefined}
            onValueChange={(value) => {
              console.log("jmw value", value);
            }}
            // defaultValue={form.game}
          >
            <SelectTrigger id="recording-game">
              <SelectValue placeholder={recordingGame} />
            </SelectTrigger>
            <SelectContent>
              {...SUPPORTED_GAMES.map((game) => (
                <SelectItem key={game} value={game}>
                  {game}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="pl-2">
          <label htmlFor="recording-mod">Mod</label>
          <Input
            id="recording-mod"
            type="text"
            value={recordingMod ?? undefined}
            onChange={(e) => {
              console.log("mod", e.target.value);
            }}
          />
        </div>
        <div className="pl-2">
          <label htmlFor="recordingUlid">Recording Id</label>
          <Input
            id="recordingUlid"
            type="text"
            readOnly
            value={recordingUlid ?? undefined}
          />
        </div>
        <div className="pl-2">
          <label htmlFor="recordingUlid">AutoSave</label>
          <Input
            id="recordingUlid"
            type="text"
            readOnly
            value={autoSaveFile ?? undefined}
          />
        </div>
      </div>
      <>
        <label htmlFor="notesInput">Notes</label>
        <Textarea
          id="notesInput"
          placeholder="Type your message here."
          value={notes ?? "Type your message here."}
          onChange={(event) => {
            setNotes(event.target.value);
          }}
        />
      </>

      <Button
        onClick={() => {
          console.log("Submitting recording");
        }}
        size="lg"
        type="submit"
        style={{ alignSelf: "flex-end" }}
      >
        Save
      </Button>
    </div>
  );
}
