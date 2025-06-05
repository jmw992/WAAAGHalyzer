"use client";
import { useZustandStore } from "@/lib/useZustandStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { FolderInput } from "@/components/FolderInputDialog";
import { SUPPORTED_GAMES } from "@/constants";
import { InputFile } from "@/components/InputFileDefault";

export default function Recording() {
  const recordingStartTime = useZustandStore(
    (state) => state.recordingStartTime,
  );
  const screenshotFiles = useZustandStore((state) => state.screenshotFiles);
  const recordingGame = useZustandStore((state) => state.recordingGame);
  const recordingMod = useZustandStore((state) => state.recordingMod);
  const autoSaveFile = useZustandStore((state) => state.autoSaveFile);

  console.log("jmw autoSaveFile", autoSaveFile);
  return (
    <div
      className="min-h-screen p-8 pb-20 gap-16 sm:p-20"
      // onSubmit={(e)}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        // maxWidth: 500,
      }}
    >
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
      <label htmlFor="screenshot-files">Screenshot Files</label>
      <div id="screenshot-files">
        {...screenshotFiles.map((files) => <p key={files}>{files}</p>)}
      </div>
      <div>
        <InputFile
          label={"Add a Screenshot"}
          id={"add-a-screenshot"}
          onChange={(val) => {
            console.log("jmw val", val);
          }}
        />
      </div>
      <div>
        <InputFile
          label={"Auto Save File"}
          id={"auto-save-file"}
          defaultValue={autoSaveFile ?? undefined}
          onChange={(val) => {
            console.log("jmw val", val);
          }}
        />
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
