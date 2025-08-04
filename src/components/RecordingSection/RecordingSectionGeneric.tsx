"use client";
import { open } from "@tauri-apps/plugin-dialog";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { splitFilePath } from "@/lib/fileHandling";
import type { Action } from "@/lib/types";
import { copyAutoSaveBase } from "@/lib/watchNewAutoSave";

const onClick = async ({
  setAutoSaveFile,
  recordingUlid,
}: {
  recordingUlid: string | null;
  setAutoSaveFile: Action["setAutoSaveFile"];
}) => {
  const file = await open({
    multiple: false,
    directory: false,
  });
  if (typeof file === "string") {
    const fileRoot = splitFilePath(file).filename;
    await copyAutoSaveBase({
      // sourceFile: file,
      srcAutoSave: file,
      fileNameRoot: fileRoot,
      destinationDir: recordingUlid ?? "",
      onCopy: (origFilename) => {
        setAutoSaveFile(origFilename);
      },
    });
  }
};

export default function RecordingSectionGeneric({
  recordingUlid,
  autoSaveFile,
  setAutoSaveFile,
}: {
  recordingUlid: string | null;
  autoSaveFile: string | null;
  setAutoSaveFile: Action["setAutoSaveFile"];
}) {
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
          <Button
            disabled={recordingUlid === null}
            variant={"ghost"}
            size="icon"
            onClick={() =>
              void onClick({
                recordingUlid,
                setAutoSaveFile,
              })
            }
          >
            <MoreHorizontal className="h-2 w-2" />
          </Button>
          <p id="autosave">{autoSaveFile ?? "-"}</p>
        </div>
      </div>
    </div>
  );
}
