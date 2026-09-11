import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** shadcn/magicui's standard `cn` helper — merges conditional class names and
 * resolves conflicting Tailwind utilities (e.g. two `bg-*` or `px-*` classes)
 * by keeping the one that appears last, instead of leaving both in the DOM. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
