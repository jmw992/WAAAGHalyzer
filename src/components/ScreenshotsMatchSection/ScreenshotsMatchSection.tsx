import { join } from "@tauri-apps/api/path";
import { open } from "@tauri-apps/plugin-dialog";
import { PlusIcon } from "lucide-react";
import { MATCHES } from "@/constants";
import { useZustandStore } from "@/lib/useZustandStore";
import { copyScreenshot } from "@/lib/watchNewScreenshot";
import { ScreenshotsTable } from "../ScreenshotsTable/ScreenshotsTable";
import { Button } from "../ui/button";

export const ScreenshotsMatchSection = () => {
  const recordingUlid = useZustandStore((state) => state.recordingUlid);
  const addScreenshot = useZustandStore((state) => state.addScreenshot);

  const onClickAsync = async () => {
    const file = await open({
      multiple: false,
      directory: false,
    });
    console.log("Selected file:", file);
    if (typeof file === "string") {
      const destinationDir = await join(MATCHES, recordingUlid ?? "");
      await copyScreenshot({
        screenshotsDir: file,
        destinationDir,
        onCopy: (ulid) => {
          addScreenshot(ulid);
        },
      });
    }
  };

  return (
    <>
      <ScreenshotsTable />
      <div className="flex justify-end mt-2">
        <Button
          disabled={recordingUlid === null}
          onClick={() => {
            console.log("Add Army setup");
            void onClickAsync();
          }}
          size="icon"
          variant={"secondary"}
        >
          <PlusIcon />
        </Button>
      </div>
    </>
  );
};
