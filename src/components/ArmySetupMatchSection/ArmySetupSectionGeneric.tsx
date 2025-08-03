import { open } from "@tauri-apps/plugin-dialog";
import { PlusIcon } from "lucide-react";
import { splitFilePath } from "@/lib/fileHandling";
import { copyArmySetupToMatchDir } from "@/lib/watchNewArmySetup";
// import { ArmySetupTable } from "../ArmySetupTable/ArmySetupTable";
import { Button } from "../ui/button";

interface ArmySetupMatchSectionGenericProps {
  addArmySetup: (id: string, filename: string) => void;
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
      const originalFile = splitFilePath(file).filename;
      await copyArmySetupToMatchDir({
        sourceFile: file,
        matchId: recordingUlid ?? "",
        onCopy: (ulid, origFilename) => {
          addArmySetup(ulid, origFilename ?? originalFile);
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
