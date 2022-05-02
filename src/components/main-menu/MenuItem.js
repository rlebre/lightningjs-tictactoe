import { Lightning } from '@lightningjs/sdk';
import { FONT_FAMILY } from '../../constants/style';

export default class MenuItem extends Lightning.Component {
  static _template() {
    return {
      text: { text: '', fontFace: FONT_FAMILY, fontSize: 50 }
    };
  }

  set label(label) {
    this.text.text = label;
  }

  set action(action) {
    this._action = action;
  }

  get action() {
    return this._action;
  }
}
