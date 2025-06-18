import { PlusIcon } from "lucide-react";
import { ScreenshotsTable } from "./ScreenshotsTable";
import { Button } from "./ui/button";

export const ScreenshotsMatchSection = () => {
  return (
    <>
      <ScreenshotsTable />
      <div className="flex justify-end mt-2">
        <Button
          onClick={() => {
            console.log("Add Army setup");
          }}
          size="icon"
        >
          <PlusIcon />
        </Button>
      </div>
    </>
  );
};
