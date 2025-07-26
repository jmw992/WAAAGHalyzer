import { useZustandStore } from "@/lib/useZustandStore";
import { PlusIcon } from "lucide-react";
import { LinksTableGeneric } from "./LinksTableGeneric";
import { Button } from "@/components/ui/button";

export function LinksTableRecording() {
  const links = useZustandStore((s) => s.links);
  const addLink = useZustandStore((s) => s.addLink);
  const deleteLink = useZustandStore((s) => s.deleteLink);
  const updateLink = useZustandStore((s) => s.updateLink);
  const recordingUlid = useZustandStore((s) => s.recordingUlid);

  return (
    <>
      <LinksTableGeneric
        links={links}
        deleteLink={deleteLink}
        updateLink={updateLink}
      />
      <div className="flex justify-end mt-2">
        <Button
          onClick={() => addLink({ url: "", title: "" })}
          size="icon"
          variant={"secondary"}
          disabled={recordingUlid === null}
        >
          <PlusIcon />
        </Button>
      </div>
    </>
  );
}
