import { useZustandStore } from "@/lib/useZustandStore";
import { ArmySetupTableGeneric } from "./ArmySetupTableGeneric";

export function ArmySetupTable() {
  const armySetups = useZustandStore((s) => s.armySetups);
  const recordingUlid = useZustandStore((s) => s.recordingUlid);
  const deleteArmySetup = useZustandStore((s) => s.deleteArmySetup);
  const updateArmySetup = useZustandStore((s) => s.updateArmySetup);

  return (
    <ArmySetupTableGeneric
      armySetups={armySetups}
      recordingUlid={recordingUlid}
      deleteArmySetup={deleteArmySetup}
      updateArmySetup={updateArmySetup}
    />
  );
}
