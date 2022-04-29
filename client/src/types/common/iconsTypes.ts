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
    | 'alert'
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
    | 'exit'
    | 'message'
    | 'image'
    | 'file'
    | 'search';

  onClick?: () => void;
  width?: string;
  height?: string;
  color?: colorsTypes['color'];
};
