import { colorsTypes } from './colorsTypes';

export type textType = {
  size: number;
  color?: colorsTypes['color'];
  weight?: string;
  children: string;
  onClick?: () => void;
};
