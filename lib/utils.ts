import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import stc from "string-to-color";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const stringToColor = (s: string) => stc(s);

export const baseUrl = process.env.NODE_ENV === 'development' ? "http://localhost:3000" : "https://thelivebit.xyz";