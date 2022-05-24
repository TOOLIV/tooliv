import { colorsTypes } from './colorsTypes';

export type buttonTypes = {
  width?: string;
  height?: string;
  text: string;
  disabled?: boolean;
  bgColor?: colorsTypes['color'];
  textColor?: colorsTypes['color'];
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
};

export type editorProps = {
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  sendMessage?: () => void;
  isButton?: boolean;
};
