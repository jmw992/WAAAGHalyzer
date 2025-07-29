"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SUPPORTED_GAMES } from "@/constants";
import { STACKED_LABEL_CLASSNAME } from "@/constants/styles";

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
      <div className={STACKED_LABEL_CLASSNAME}>
        <Label className="pl-0.5" htmlFor="recording-game">
          Game
        </Label>
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

      <div className={STACKED_LABEL_CLASSNAME}>
        <Label className="pl-0.5" htmlFor="recording-mod">
          Mod
        </Label>
        <Input
          id="recording-mod"
          type="email"
          value={recordingMod}
          onChange={(e) => {
            setRecordingMod(e.target.value);
          }}
        />
      </div>

      <div className={STACKED_LABEL_CLASSNAME}>
        <Label className="pl-0.5" htmlFor="recording-version">
          Version
        </Label>
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
