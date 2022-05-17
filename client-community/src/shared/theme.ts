import { Theme } from '@emotion/react';
import { colors } from './color';

export const light: Theme = {
  bgColor: '#FFFFFF',
  sideBgColor: '#F4F4F4',
  pointColor: colors.primary,
  secondPointColor: colors.darkPrimary,
  lightPointColor: colors.lightPrimary,
  darkPointColor: colors.darkPrimary,
  textColor: colors.black,
  borderColor: colors.gray100,
  hoverColor: colors.lightPrimary,
  loginBgColor: colors.lightPrimary,
  loginFormBgColor: '#FFFFFF',
  dropdownHoverColor: colors.gray100,
  selectedItemColor: colors.gray200,
  notiColor: colors.gray700
};

export const dark: Theme = {
  bgColor: '#53585B',
  sideBgColor: '#3A3E43',
  pointColor: colors.secondary,
  secondPointColor: colors.lightSecondary,
  lightPointColor: colors.lightSecondary,
  darkPointColor: colors.darkSecondary,
  textColor: colors.white,
  borderColor: colors.lightGray,
  hoverColor: colors.lightGray,
  loginBgColor: colors.gray800,
  loginFormBgColor: colors.gray600,
  dropdownHoverColor: 'rgba(255, 255, 255, 0.3)',
  selectedItemColor: colors.gray500,
  notiColor: colors.secondary
};
