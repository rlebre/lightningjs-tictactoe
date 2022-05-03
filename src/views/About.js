import { Lightning } from '@lightningjs/sdk';
import { FONT_FAMILY } from '../constants/style';

export default class About extends Lightning.Component {
  static _template() {
    return {
      Logo: {
        x: 960,
        y: 540,
        mount: 0.5,
        text: {
          text: 'About',
          fontFace: FONT_FAMILY,
          fontStyle: 'bold'
        }
      }
    };
  }
}
