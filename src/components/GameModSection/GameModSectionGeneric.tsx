"use client";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SUPPORTED_GAMES } from "@/constants";

import type { Action, RecordingState } from "@/lib/types";

interface GameModSectionGenericProps {
  recordingGame: RecordingState["recordingGame"];
  recordingMod: string;
  recordingVersion: string;
  setRecordingMod: Action["setRecordingMod"];
  setRecordingVersion: Action["setVersion"];
}

export default function GameModSectionGeneric({
  recordingGame,
  recordingMod,
  setRecordingMod,
  recordingVersion,
  setRecordingVersion,
}: GameModSectionGenericProps) {
  return (
    <div className="flex flex-row pb-4 gap-2">
      <div>
        <label htmlFor="recording-game">Game</label>
        <Select
          value={recordingGame ?? undefined}
          onValueChange={(value) => {
            console.log("TODO value", value);
          }}
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
          type="email"
          value={recordingMod}
          onChange={(e) => {
            setRecordingMod(e.target.value);
          }}
        />
      </div>

      <div>
        <label htmlFor="recording-version">Version</label>
        <Input
          id="recording-version"
          type="email"
          value={recordingVersion}
          onChange={(e) => {
            setRecordingVersion(e.target.value);
          }}
        />
      </div>
    </div>
  );
}
