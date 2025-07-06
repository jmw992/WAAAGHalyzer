import { useZustandStore } from "@/lib/useZustandStore";
import { ScreenshotsTableGeneric } from "./ScreenshotsTableGeneric";

export function ScreenshotsTable() {
  const screenshots = useZustandStore((s) => s.screenshots);
  const recordingUlid = useZustandStore((s) => s.recordingUlid);
  const deleteScreenshot = useZustandStore((s) => s.deleteScreenshot);
  const updateScreenshot = useZustandStore((s) => s.updateScreenshot);

  return (
    <ScreenshotsTableGeneric
      screenshots={screenshots}
      recordingUlid={recordingUlid}
      deleteScreenshot={deleteScreenshot}
      updateScreenshot={updateScreenshot}
    />
  );
}
