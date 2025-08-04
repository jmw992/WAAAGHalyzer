import { join } from "@tauri-apps/api/path";
import { open } from "@tauri-apps/plugin-dialog";
import { PlusIcon } from "lucide-react";
import { MATCHES } from "@/constants";
import { copyScreenshot } from "@/lib/watchNewScreenshot";
import { Button } from "../ui/button";

interface ScreenshotsSectionGenericProps {
  addScreenshot: (id: string) => void;
  recordingUlid: string | null;
  ScreenshotsTable: React.ReactNode;
}

export const ScreenshotsSectionGeneric = ({
  addScreenshot,
  recordingUlid,
  ScreenshotsTable,
}: ScreenshotsSectionGenericProps) => {
  const onClickAsync = async () => {
    const file = await open({
      multiple: false,
      directory: false,
    });
    console.log("Selected file:", file);
    if (typeof file === "string") {
      const destinationDir = await join(MATCHES, recordingUlid ?? "");
      await copyScreenshot({
        screenshotFile: file,
        destinationDir,
        onCopy: (ulid) => {
          addScreenshot(ulid);
        },
      });
    }
  };

  return (
    <>
      {ScreenshotsTable}
      <div className="flex justify-end mt-2">
        <Button
          disabled={recordingUlid === null}
          onClick={() => {
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
