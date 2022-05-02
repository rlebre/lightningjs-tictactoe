import { Lightning } from '@lightningjs/sdk';
import { FONT_FAMILY } from '../../constants/style';
import MenuItem from '../main-menu/MenuItem';

export default class Menu extends Lightning.Component {
  static _template() {
    return {
      Items: {
        x: 40
      },
      FocusIndicator: {
        y: 5,
        text: { text: '>', fontFace: FONT_FAMILY }
      }
    };
  }

  set items(values) {
    this.tag('Items').children = values.map((el, idx) => {
      return { type: MenuItem, action: el.action, label: el.label, y: idx * 90 };
    });
  }

  get items() {
    return this.tag('Items').children;
  }

  get activeItem() {
    return this.items[this._index];
  }

  _setIndex(idx) {
    this.tag('FocusIndicator').setSmooth('y', idx * 90 + 5);
    this._index = idx;
  }

  _init() {
    this._blink = this.tag('FocusIndicator').animation({
      duration: 0.5,
      repeat: -1,
      actions: [{ p: 'x', v: { 0: 0, 0.5: -40, 1: 0 } }]
    });

    this._index = 0;
  }

  _active() {
    this._blink.start();
  }

  _inactive() {
    this._blink.stop();
  }

  _handleUp() {
    this._setIndex(Math.max(0, --this._index));
  }

  _handleDown() {
    this._setIndex(Math.min(++this._index, this.items.length - 1));
  }
}
