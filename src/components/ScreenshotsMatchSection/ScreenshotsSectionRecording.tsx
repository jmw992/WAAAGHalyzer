import { ScreenshotsTable } from "@/components/ScreenshotsTable/ScreenshotsTable";
import { useZustandStore } from "@/lib/useZustandStore";
import { ScreenshotsSectionGeneric } from "./ScreenshotsSectionGeneric";

export const ScreenshotsSectionRecording = () => {
  const addScreenshot = useZustandStore((state) => state.addScreenshot);
  const recordingUlid = useZustandStore((state) => state.recordingUlid);

  return (
    <ScreenshotsSectionGeneric
      addScreenshot={addScreenshot}
      recordingUlid={recordingUlid}
      ScreenshotsTable={<ScreenshotsTable />}
    />
  );
};
