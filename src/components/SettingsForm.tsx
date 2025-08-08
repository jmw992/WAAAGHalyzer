import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { MATCH_TYPES, SUPPORTED_GAMES } from "@/constants";
import { STACKED_LABEL_CLASSNAME } from "@/constants/styles";
import { setStorePersistedSettings } from "@/lib/persistStorage";
import type { PersistedState } from "@/lib/types";
import { useZustandStore } from "@/lib/useZustandStore";
import { FolderInput } from "./FolderInputDialog";

export const SettingsForm = ({
  initialState,
}: {
  initialState: PersistedState;
}) => {
  const setPersistedState = useZustandStore((state) => state.setPersistedState);

  // Local state for form
  const [form, setForm] = useState<PersistedState>(initialState);

  const handleChange = <K extends keyof PersistedState>(
    key: K,
    value: PersistedState[K],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };
  const handleSubmit = () => {
    setPersistedState(form);
    setStorePersistedSettings(form);
    toast.success("Settings saved successfully!");
  };

  return (
    <div
      // onSubmit={(e)}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        // maxWidth: 500,
      }}
    >
      <div className={STACKED_LABEL_CLASSNAME}>
        <Label className="pl-0.5" htmlFor="settings-game">
          Game
        </Label>
        <Select
          value={form.game}
          onValueChange={(value) => {
            handleChange("game", value as PersistedState["game"]);
          }}
          defaultValue={form.game}
        >
          <SelectTrigger id="settings-game">
            <SelectValue placeholder={form.game} />
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
        <Label className="pl-0.5" htmlFor="settings-mod">
          Mod
        </Label>
        <Input
          id="settings-mod"
          type="email"
          value={form.mod}
          autoCapitalize="off"
          onChange={(e) => {
            handleChange("mod", e.target.value);
          }}
        />
      </div>

      <div className="flex flex-row pb-4 gap-2">
        <div className={STACKED_LABEL_CLASSNAME}>
          <Label className="pl-0.5" htmlFor="settings-version-major">
            Major
          </Label>
          <Input
            id="settings-version-major"
            type="number"
            value={form.version_major}
            onChange={(e) => {
              handleChange("version_major", Number(e.target.value));
            }}
          />
        </div>
        <div className={STACKED_LABEL_CLASSNAME}>
          <Label className="pl-0.5" htmlFor="settings-version-minor">
            Minor
          </Label>
          <Input
            id="settings-version-minor"
            type="number"
            value={form.version_minor}
            onChange={(e) => {
              handleChange("version_minor", Number(e.target.value));
            }}
          />
        </div>
        <div className={STACKED_LABEL_CLASSNAME}>
          <Label className="pl-0.5" htmlFor="settings-version-patch">
            Patch
          </Label>
          <Input
            id="settings-version-patch"
            type="number"
            value={form.version_patch}
            onChange={(e) => {
              handleChange("version_patch", Number(e.target.value));
            }}
          />
        </div>
      </div>

      <div className={STACKED_LABEL_CLASSNAME}>
        <Label className="pl-0.5" htmlFor="settings-playerId">
          Player ID
        </Label>
        <Input
          id="settings-playerId"
          type="email"
          value={form.playerId ?? ""}
          autoCapitalize="none"
          onChange={(e) => {
            handleChange("playerId", e.target.value);
          }}
        />
      </div>

      <div className={STACKED_LABEL_CLASSNAME}>
        <Label className="pl-0.5" htmlFor="settings-defaultMatchType">
          Default Match Type
        </Label>
        <Select
          value={form.defaultMatchType}
          onValueChange={(value) => {
            handleChange(
              "defaultMatchType",
              value as PersistedState["defaultMatchType"],
            );
          }}
          defaultValue={form.defaultMatchType}
        >
          <SelectTrigger id="settings-defaultMatchType">
            <SelectValue placeholder={form.defaultMatchType} />
          </SelectTrigger>
          <SelectContent>
            {...MATCH_TYPES.map((matchType) => (
              <SelectItem key={matchType} value={matchType}>
                {matchType}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className={STACKED_LABEL_CLASSNAME}>
        <Label className="pl-0.5" htmlFor="settings-game-dir">
          Game Directory
        </Label>
        <FolderInput
          initialValue={form.gameDirectory}
          onChange={(val) => {
            handleChange("gameDirectory", val);
          }}
        />
      </div>

      <div className={STACKED_LABEL_CLASSNAME}>
        <Label className="pl-0.5" htmlFor="settings-screenshots-dir">
          Screenshots Directory
        </Label>
        <FolderInput
          initialValue={form.screenshotsDirectory}
          onChange={(val) => {
            handleChange("screenshotsDirectory", val);
          }}
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="demo-mode"
          checked={form.demoMode}
          onCheckedChange={(checked: boolean) => {
            handleChange("demoMode", checked);
          }}
        />
        <Label className="pl-0.5" htmlFor="demo-mode">
          Demo Mode
        </Label>
      </div>

      <Button
        onClick={handleSubmit}
        size="lg"
        type="submit"
        style={{ alignSelf: "flex-end" }}
      >
        Save
      </Button>
    </div>
  );
};
