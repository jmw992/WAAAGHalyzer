import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const safeParseJson = <T>(jsonString: string | null, defaut: T): T => {
  if (!jsonString) return defaut;
  try {
    return JSON.parse(jsonString) as T;
  } catch (e) {
    console.error("Failed to parse JSON from DB:", jsonString, e);
    return defaut;
  }
};
