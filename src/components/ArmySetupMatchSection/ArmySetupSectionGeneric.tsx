import { open } from "@tauri-apps/plugin-dialog";
import { PlusIcon } from "lucide-react";
import type { Action } from "@/lib/types";
import { copyArmySetupToMatchDir } from "@/lib/watchNewArmySetup";
import { Button } from "../ui/button";

interface ArmySetupMatchSectionGenericProps {
  addArmySetup: Action["addArmySetup"];
  recordingUlid: string | null;
  ArmySetupTable: React.ReactNode;
}

export const ArmySetupSectionGeneric = ({
  addArmySetup,
  recordingUlid,
  ArmySetupTable,
}: ArmySetupMatchSectionGenericProps) => {
  const onClickAsync = async () => {
    const file = await open({
      multiple: false,
      directory: false,
    });
    if (typeof file === "string") {
      await copyArmySetupToMatchDir({
        sourceFile: file,
        matchId: recordingUlid ?? "",
        onCopy: (file) => {
          addArmySetup(file);
        },
      });
    }
  };

  return (
    <>
      {ArmySetupTable}
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
