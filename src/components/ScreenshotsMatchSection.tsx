import { PlusIcon } from "lucide-react";
import { ScreenshotsTable } from "./ScreenshotsTable";
import { Button } from "./ui/button";
import { useZustandStore } from "@/lib/useZustandStore";

export const ScreenshotsMatchSection = () => {
  const recordingUlid = useZustandStore((state) => state.recordingUlid);

  return (
    <>
      <ScreenshotsTable />
      <div className="flex justify-end mt-2">
        <Button
          disabled={recordingUlid === null}
          onClick={() => {
            console.log("Add Army setup");
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
