import { Lightning } from '@lightningjs/sdk';
import { FONT_FAMILY } from '../constants/style';

export default class Fallback extends Lightning.Component {
  static _template() {
    return {
      Logo: {
        x: 960,
        y: 540,
        mount: 0.5,
        text: {
          text: 'This is a fallback page',
          fontFace: FONT_FAMILY,
          fontSize: 70
        }
      }
    };
  }
}
