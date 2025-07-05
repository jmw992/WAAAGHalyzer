import { open } from "@tauri-apps/plugin-dialog";
import { PlusIcon } from "lucide-react";
import { ulid } from "ulid";
import { splitFilePath } from "@/lib/fileHandling";
import { useZustandStore } from "@/lib/useZustandStore";
import { copyAutoSaveToMatchDir } from "@/lib/watchNewArmySetup";
import { ArmySetupTable } from "./ArmySetupTable";
import { Button } from "./ui/button";

export const ArmySetupMatchSection = () => {
  const addArmySetup = useZustandStore((state) => state.addArmySetup);
  const recordingUlid = useZustandStore((state) => state.recordingUlid);

  const onClickAsync = async () => {
    const file = await open({
      multiple: false,
      directory: false,
    });
    console.log("Selected file:", file);
    if (typeof file === "string") {
      const originalFile = splitFilePath(file).filename;
      await copyAutoSaveToMatchDir({
        sourceFile: file,
        matchId: recordingUlid ?? "",
      });
      addArmySetup(ulid(), originalFile);
    }
  };

  return (
    <>
      <ArmySetupTable />
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
