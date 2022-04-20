import { colorsTypes } from './colorsTypes';

export type iconsTypes = {
  icon:
    | 'anglesLeft'
    | 'anglesRight'
    | 'arrowLeft'
    | 'arrowRight'
    | 'setting'
    | 'download'
    | 'check'
    | 'dropdown'
    | 'plus'
    | 'xMark'
    | 'alret'
    | 'star'
    | 'solidStar'
    | 'lock'
    | 'public'
    | 'addPerson'
    | 'solidPerson'
    | 'person'
    | 'personGroup'
    | 'building'
    | 'audioOn'
    | 'audioOff'
    | 'videoOn'
    | 'videoOff'
    | 'monitor'
    | 'shareMonitor'
    | 'exit';

  onClick?: () => void;
  large?: boolean;
  color?: colorsTypes['color'];
};
