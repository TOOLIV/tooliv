import { iconsTypes } from '../common/iconsTypes';

export type functionButtonTypes = {
  icon: iconsTypes['icon'];
  exit?: boolean;
  onClick: () => void;
};
