"use client";
import RecordingStartButton from "@/components/RecordingStartButton";
import RecordingStopButton from "@/components/RecordingStopButton";
import { useZustandStore } from "@/lib/useZustandStore";

export default function RecordingButton() {
  const isRecording = useZustandStore((state) => state.isRecording);
  console.log("jmw RecordingButton", isRecording);
  return isRecording ? <RecordingStopButton /> : <RecordingStartButton />;
}
