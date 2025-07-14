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

import type { Action, StartRecordingProps } from "@/lib/useZustandStore";

interface GameModSectionGenericProps {
  recordingGame: StartRecordingProps["recordingGame"];
  recordingMod: StartRecordingProps["recordingMod"];
  setRecordingMod: Action["setRecordingMod"];
  recordingVersion: StartRecordingProps["recordingVersion"];
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
    <div className="flex flex-row pb-4">
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

      <div className="pl-2">
        <label htmlFor="recording-mod">Mod</label>
        <Input
          id="recording-mod"
          type="text"
          value={recordingMod ?? undefined}
          onChange={(e) => {
            console.log("mod", e.target.value);
            setRecordingMod(e.target.value);
          }}
        />
      </div>
      <div className="pl-2">
        <label htmlFor="recording-version">Version</label>
        <Input
          id="recording-version"
          type="text"
          value={recordingVersion ?? undefined}
          onChange={(e) => {
            setRecordingVersion(e.target.value);
          }}
        />
      </div>
    </div>
  );
}
