"use client";

import { invoke } from "@tauri-apps/api/core";
import { useCallback, useState } from "react";
import { RoundedButton } from "@/components/RoundedButton";

export default function Home() {
  const [greeted, setGreeted] = useState<string | null>(null);
  const [gudgitzed, setGudgitzed] = useState<string | null>(null);
  const greet = useCallback((): void => {
    invoke<string>("greet")
      .then((s) => {
        setGreeted(s);
      })
      .catch((err: unknown) => {
        console.error(err);
      });
  }, []);
  const gudgitz = useCallback((): void => {
    invoke<string>("gudgitz")
      .then((s) => {
        setGudgitzed(s);
      })
      .catch((err: unknown) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col gap-2 items-start">
        <RoundedButton onClick={greet} title='Call "greet" from Rust' />
        <p className="break-words w-md">
          {greeted ?? "Click the button to call the Rust function"}
        </p>
      </div>

      <div className="flex flex-col gap-2 items-start">
        <RoundedButton onClick={gudgitz} title='Call "gudgitz" from Rust' />
        <p className="break-words w-md">
          {gudgitzed ?? "Click the button to call the Rust function"}
        </p>
      </div>
    </div>
  );
}
