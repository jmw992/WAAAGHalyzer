"use client";
import { useZustandStore } from "@/lib/useZustandStore";
import RecordingStopButton from "@/components/RecordingStopButton";
import RecordingStartButton from "@/components/RecordingStartButton";

export default function RecordingButton() {
  const isRecording = useZustandStore((state) => state.isRecording);
  console.log("jmw RecordingButton", isRecording);
  return isRecording ? <RecordingStopButton /> : <RecordingStartButton />;
}
