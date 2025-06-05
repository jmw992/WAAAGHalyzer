"use client";
import History from "@/components/pages/History";
import Home from "@/components/pages/Home";
import Recording from "@/components/pages/Recording";
import Settings from "@/components/pages/Settings";
import { HISTORY, HOME, RECORD, SETTINGS } from "@/constants";
import { useZustandStore } from "@/lib/useZustandStore";
import type { Page } from "@/types";
import type React from "react";

const PageMap: Record<Page, React.FC> = {
  [HOME]: Home,
  [HISTORY]: History,
  [SETTINGS]: Settings,
  [RECORD]: Recording,
};

export default function RootPage() {
  const page = useZustandStore((state) => state.page);

  const PageComponent = PageMap[page];
  return <PageComponent />;
}
