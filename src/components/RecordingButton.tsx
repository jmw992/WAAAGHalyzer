"use client";
import { useZustandStore } from "@/lib/useZustandStore";
import { PlayIcon, StopIcon } from "@heroicons/react/24/outline";
import { ulid } from "ulid";

export default function RecordingButton() {
  const isRecording = useZustandStore((state) => state.isRecording);
  const setIsRecording = useZustandStore((state) => state.setIsRecording);
  const setRecordingStartTime = useZustandStore(
    (state) => state.setRecordingStartTime,
  );
  const setRecordingUlid = useZustandStore((state) => state.setRecordingUlid);

  const recordingHandler = () => {
    const newIsRecording = !isRecording;
    setIsRecording(newIsRecording);
    if (newIsRecording) {
      // Start recording logic here
      setRecordingStartTime(new Date());
      setRecordingUlid(ulid());
    } else {
      // Stop recording logic here
      setRecordingStartTime(null);
    }
  };

  return (
    <button
      type="button"
      className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
      onClick={recordingHandler}
    >
      <span className="absolute -inset-1.5" />
      <span className="sr-only">View notifications</span>
      {isRecording ? (
        <StopIcon className="size-6 text-red-500" />
      ) : (
        <PlayIcon stroke="green" className="size-6" />
      )}
    </button>
  );
}
