import { Lightning, Utils } from '@lightningjs/sdk';
import Splash from './views/Splash';

export default class App extends Lightning.Component {
  static getFonts() {
    return [{ family: 'Roboto-Regular', url: Utils.asset('fonts/Roboto-Regular.ttf') }];
  }

  static _template() {
    return {
      rect: true,
      color: 0xff000000,
      w: 1920,
      h: 1080,
      Splash: {
        type: Splash,
        signals: { loaded: true },
        alpha: 0
      }
    };
  }

  _setup() {
    this._setState('Splash');
  }

  static _states() {
    return [
      class Splash extends this {
        $enter() {
          this.tag('Splash').setSmooth('alpha', 1);
        }

        $exit() {
          this.tag('Splash').setSmooth('alpha', 0);
        }

        loaded() {
          // this._setState('Main');
          console.log('loaded');
        }
      }
    ];
  }
}
