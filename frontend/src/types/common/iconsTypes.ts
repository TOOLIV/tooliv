import { colorsTypes } from './colorsTypes';

export type iconsTypes = {
  icon:
    | 'lock'
    | 'public'
    | 'person'
    | 'setting'
    | 'plus'
    | 'videoOn'
    | 'videoOff'
    | 'monitor'
    | 'audioOn'
    | 'audioOff'
    | 'anglesLeft'
    | 'anglesRight'
    | 'addPerson'
    | 'shareMonitor'
    | 'xMark'
    | 'exit';
  color?: colorsTypes['color'];
  onClick?: () => void;
};

export type largeIconTypes = {
  icon: iconsTypes['icon'];
  color?: colorsTypes['color'];
};
