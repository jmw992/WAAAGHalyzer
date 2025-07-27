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
import { setStorePersistedSettings } from "@/lib/persistStorage";
import { type PersistedState, useZustandStore } from "@/lib/useZustandStore";
import { FolderInput } from "./FolderInputDialog";

export const SettingsForm = ({
  initialState,
}: {
  initialState: PersistedState;
}) => {
  const setPersistedState = useZustandStore((state) => state.setPersistedState);

  // Local state for form
  const [form, setForm] = useState<PersistedState>(initialState);

  const handleChange = (key: keyof PersistedState, value: unknown) => {
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
      <div>
        <label htmlFor="settings-game">Game</label>
        <Select
          value={form.game}
          onValueChange={(value) => {
            handleChange("game", value);
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

      <div>
        <label htmlFor="settings-mod">Mod</label>
        <Input
          id="settings-mod"
          type="text"
          value={form.mod}
          autoCapitalize="off"
          onChange={(e) => {
            handleChange("mod", e.target.value);
          }}
        />
      </div>

      <div>
        <label htmlFor="settings-version">Version</label>
        <Input
          id="settings-version"
          type="text"
          value={form.version}
          onChange={(e) => {
            handleChange("version", e.target.value);
          }}
        />
      </div>

      <div>
        <label htmlFor="settings-playerId">Player ID</label>
        <Input
          id="settings-playerId"
          className="normal-case"
          type="text"
          value={form.playerId ?? ""}
          autoCapitalize="none"
          onChange={(e) => {
            handleChange("playerId", e.target.value);
          }}
        />
      </div>

      <div>
        <label htmlFor="settings-defaultMatchType">Default Match Type</label>
        <Select
          value={form.defaultMatchType}
          onValueChange={(value) => {
            handleChange("defaultMatchType", value);
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

      <div>
        <label htmlFor="settings-game-dir">Game Directory</label>
        <FolderInput
          initialValue={form.gameDirectory}
          onChange={(val) => {
            handleChange("gameDirectory", val);
          }}
        />
      </div>

      <div>
        <label htmlFor="settings-screenshots-dir">Screenshots Directory</label>
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
        <Label htmlFor="demo-mode">Demo Mode</Label>
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
