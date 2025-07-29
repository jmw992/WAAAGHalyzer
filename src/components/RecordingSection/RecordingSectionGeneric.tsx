"use client";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import type { Action } from "@/lib/types";

export default function RecordingSectionGeneric({
  recordingUlid,
  autoSaveFile,
  setAutoSaveFile,
}: {
  recordingUlid: string | null;
  autoSaveFile: string | null;
  setAutoSaveFile: Action["setAutoSaveFile"];
}) {
  console.log("setAutoSaveFile", setAutoSaveFile);

  return (
    <div className="flex flex-row gap-2 pb-4">
      <div className="border rounded-md p-2 flex flex-col gap-1">
        <Label htmlFor="recordingUlid">Recording Id</Label>
        <p id="recordingUlid" className="pt-2">
          {recordingUlid ?? "-"}
        </p>
      </div>
      <div className="border rounded-md p-2 flex flex-col gap-1">
        <Label htmlFor="autosave">Autosave</Label>
        <div className="flex items-center gap-0.5">
          <Button variant={"ghost"} size="icon" onClick={() => {}}>
            <MoreHorizontal className="h-2 w-2" />
          </Button>
          <p id="autosave">{autoSaveFile ?? "-"}</p>
        </div>
      </div>
    </div>
  );
}
