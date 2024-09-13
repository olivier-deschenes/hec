import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const ToNumber = (value: any) => {
  if (value === null || value === undefined) {
    return "";
  }

  return Number(value);
};
