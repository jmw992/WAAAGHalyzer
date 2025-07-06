import { useZustandStore } from "@/lib/useZustandStore";
import { ArmySetupTable } from "../ArmySetupTable/ArmySetupTable";
import { ArmySetupSectionGeneric } from "./ArmySetupSectionGeneric";

export const ArmySetupSectionRecording = () => {
  const addArmySetup = useZustandStore((state) => state.addArmySetup);
  const recordingUlid = useZustandStore((state) => state.recordingUlid);

  return (
    <ArmySetupSectionGeneric
      addArmySetup={addArmySetup}
      recordingUlid={recordingUlid}
      ArmySetupTable={<ArmySetupTable />}
    />
  );
};
