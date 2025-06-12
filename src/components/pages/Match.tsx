"use client";
import { InputFile } from "@/components/InputFileDefault";
import MatchTable from "@/components/MatchTable";
import { ScreenshotsTable } from "@/components/ScreenshotsTable";
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
  const autoSaveFile = useZustandStore((state) => state.autoSaveFile);
  const recordingWin = useZustandStore((state) => state.recordingWin);
  const recordingStartTime = useZustandStore(
    (state) => state.recordingStartTime,
  );
  const playerFaction = useZustandStore((state) => state.playerFaction);
  const opponentFaction = useZustandStore((state) => state.opponentFaction);
  const map = useZustandStore((state) => state.map);
  const links = useZustandStore((state) => state.links);
  const notes = useZustandStore((state) => state.notes);

  return (
    <div>
      <MatchTable />
      <ScreenshotsTable />
      <Notes />
      <div>
        <InputFile
          label={"Add a Screenshot"}
          id={"add-a-screenshot"}
          onChange={(val) => {
            console.log("jmw val", val);
          }}
        />
      </div>

      <label htmlFor="autosave-file">Auto Save File</label>
      <div id="autosave-file">{autoSaveFile}</div>
      <div>
        <InputFile
          label={"Change Auto Save"}
          id={"auto-save-file"}
          // defaultValue={autoSaveFile ?? undefined}
          onChange={(val) => {
            console.log("jmw val", val);
          }}
        />
      </div>

      <div className="flex flex-row pb-4">
        <div className="pr-8">
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

        <div>
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
      </div>

      <Button
        onClick={() => {
          console.log("Submitting recording");
        }}
        size="lg"
        type="submit"
        style={{ alignSelf: "flex-end" }}
      >
        Save to History
      </Button>
    </div>
  );
}
