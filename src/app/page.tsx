"use client";
import type React from "react";
import History from "@/components/pages/History";
import Home from "@/components/pages/Home";
import Match from "@/components/pages/Match";
import Settings from "@/components/pages/Settings";
import { HISTORY, HOME, MATCH, SETTINGS } from "@/constants";
import { useZustandStore } from "@/lib/useZustandStore";
import type { Page } from "@/types";

const PageMap: Record<Page, React.FC> = {
  [HOME]: Home,
  [HISTORY]: History,
  [SETTINGS]: Settings,
  [MATCH]: Match,
};

export default function RootPage() {
  const page = useZustandStore((state) => state.page);

  const PageComponent = PageMap[page];
  return <PageComponent />;
}
