"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { STACKED_LABEL_CLASSNAME } from "@/constants/styles";

import type { Action } from "@/lib/types";

interface VersionSectionGenericProps {
  versionMajor: number;
  versionMinor: number;
  versionPatch: number;
  setVersion: Action["setVersion"];
}

export default function VersionSectionGeneric({
  versionMajor,
  versionMinor,
  versionPatch,
  setVersion,
}: VersionSectionGenericProps) {
  return (
    <div className={STACKED_LABEL_CLASSNAME}>
      <Label className="pl-0.5" htmlFor="recording-version-major">
        Version
      </Label>
      <div className="flex flex-row pb-4 gap-2">
        <div className={STACKED_LABEL_CLASSNAME}>
          <Label className="pl-0.5" htmlFor="recording-version-major">
            Major
          </Label>
          <Input
            id="recording-version-major"
            type="number"
            value={versionMajor}
            onChange={(e) => {
              setVersion(Number(e.target.value), versionMinor, versionPatch);
            }}
          />
        </div>
        <div className={STACKED_LABEL_CLASSNAME}>
          <Label className="pl-0.5" htmlFor="recording-version-minor">
            Minor
          </Label>
          <Input
            id="recording-version-minor"
            type="number"
            value={versionMinor}
            onChange={(e) => {
              setVersion(versionMajor, Number(e.target.value), versionPatch);
            }}
          />
        </div>
        <div className={STACKED_LABEL_CLASSNAME}>
          <Label className="pl-0.5" htmlFor="recording-version-patch">
            Patch
          </Label>
          <Input
            id="recording-version-patch"
            type="number"
            value={versionPatch}
            onChange={(e) => {
              setVersion(versionMajor, versionMinor, Number(e.target.value));
            }}
          />
        </div>
      </div>
    </div>
  );
}
