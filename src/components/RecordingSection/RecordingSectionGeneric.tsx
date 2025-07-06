"use client";

export default function RecordingSectionGeneric({
  recordingUlid,
  autoSaveFile,
}: {
  recordingUlid: string | null;
  autoSaveFile: string | null;
}) {
  return (
    <div className="flex flex-row pb-4">
      <div className="border rounded-md px-2">
        <label htmlFor="recordingUlid">Recording Id</label>
        <p id="recordingUlid">{recordingUlid ?? "..."}</p>
      </div>
      <div className="border rounded-md ml-2 px-2">
        <label htmlFor="autoSaveFile">AutoSave</label>
        <p id="autoSaveFile">{autoSaveFile ?? "..."}</p>
      </div>
    </div>
  );
}
