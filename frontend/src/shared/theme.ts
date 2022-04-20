import { Theme } from "@emotion/react";
import { colors } from "./color";

export const light: Theme = {
  bgColor: "#FFFFFF",
  sideBgColor: "#F4F4F4",
  pointColor: colors.primary,
  secondPointColor: colors.darkPrimary,
};

export const dark: Theme = {
  bgColor: "#31363B",
  sideBgColor: "#292D32",
  pointColor: colors.secondary,
  secondPointColor: colors.lightSecondary,
};
