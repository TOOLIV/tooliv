import { atom } from "recoil";

export type ThemeMode = "light" | "dark";

export const appThemeMode = atom<ThemeMode>({
  key: "AppThemeMode",
  default: "light",
});
