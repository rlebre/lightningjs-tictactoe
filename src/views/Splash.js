import { Lightning } from '@lightningjs/sdk';
import { FONT_FAMILY } from '../constants/style';

export default class Splash extends Lightning.Component {
  static _template() {
    return {
      Logo: {
        x: 960,
        y: 540,
        mount: 0.5,
        text: {
          text: 'Loading...',
          fontFace: FONT_FAMILY
        }
      }
    };
  }

  _init() {
    // create animation and store a reference, so we can start / stop / pause in the fututre
    this._pulse = this.tag('Logo').animation({
      duration: 3,
      repeat: 1,
      actions: [{ p: 'alpha', v: { 0: 0, 0.5: 1, 1: 0 } }]
    });

    // add a finish eventlistener, so we can send a signal
    // to the parent when the animation is completed
    this._pulse.on('finish', () => {
      this.signal('loaded');
    });

    // start the animation
    this._pulse.start();
  }

  _active() {
    this._pulse.start();
  }
}
