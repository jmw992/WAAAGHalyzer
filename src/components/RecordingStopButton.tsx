import { Square } from "lucide-react";
import MatchSaveButtonBase from "./MatchSaveButtonBase";

export default function RecordingStopButton() {
  return (
    <MatchSaveButtonBase
      variant="ghost"
      type="button"
      buttonClassName="relative text-red-500 hover:text-red-300 p-1"
    >
      <Square className="size-6 " />
    </MatchSaveButtonBase>
  );
}
