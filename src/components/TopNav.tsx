"use client";
import { Settings } from "lucide-react";
import RecordingButton from "@/components/RecordingButton";
import { HISTORY, HOME, MATCH, SETTINGS } from "@/constants";
import {
  copyArmySetupDebug,
  copyAutoSaveDebug,
  copyScreenshotDebug,
} from "@/lib/fileHandling";
import { useZustandStore } from "@/lib/useZustandStore";
import type { Page } from "@/types";

const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

const DEBUG = true;

export default function TopNav() {
  const page = useZustandStore((state) => state.page);
  const setPage = useZustandStore((state) => state.setPage);

  const navigation: Page[] = [HISTORY, MATCH];

  return (
    <>
      <div className="bg-gray-800 fixed top-0 left-0 w-full z-50 shadow">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => {
                  setPage(HOME);
                }}
              >
                <div className="shrink-0">
                  <img
                    alt="Waaaghlyzer logo"
                    src="/WA-NoBackground.svg"
                    // src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                    className="size-8"
                  />
                </div>
              </button>
              <div className="hidden md:block">
                <div className="ml-5 flex items-baseline space-x-4">
                  {/* Page Buttons */}
                  {navigation.map((name) => (
                    <button
                      key={name}
                      aria-current={name === page ? "page" : undefined}
                      type="button"
                      onClick={() => {
                        setPage(name);
                      }}
                      className={classNames(
                        name === page
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "rounded-md px-3 py-2 text-sm font-medium",
                      )}
                    >
                      {name}
                    </button>
                  ))}
                  {
                    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                    DEBUG ? (
                      <>
                        <button
                          className={classNames(
                            "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "rounded-md px-3 py-2 text-sm font-medium",
                          )}
                          type="button"
                          onClick={() => {
                            void copyAutoSaveDebug();
                          }}
                        >
                          Copy Replay
                        </button>
                        <button
                          className={classNames(
                            "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "rounded-md px-3 py-2 text-sm font-medium",
                          )}
                          type="button"
                          onClick={() => {
                            void copyScreenshotDebug();
                          }}
                        >
                          Copy Screenshot
                        </button>
                        <button
                          className={classNames(
                            "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "rounded-md px-3 py-2 text-sm font-medium",
                          )}
                          type="button"
                          onClick={() => {
                            void copyArmySetupDebug();
                          }}
                        >
                          Copy Army Setup
                        </button>
                      </>
                    ) : null
                  }
                </div>
              </div>
            </div>

            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <RecordingButton />
                <button
                  type="button"
                  className={classNames(
                    "relative rounded-full bg-gray-800 p-1 text-gray-400 ",
                    page === SETTINGS
                      ? "text-white"
                      : "hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden",
                  )}
                  onClick={() => {
                    setPage(SETTINGS);
                  }}
                >
                  <span className="absolute -inset-1.5" />
                  <Settings
                    aria-current={page === SETTINGS ? "page" : undefined}
                    aria-label={SETTINGS}
                    className="size-6"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/** Since top nav is fixed size need to give some room so page content don't get occluded */}
      <div className="pb-15" />
    </>
  );
}
