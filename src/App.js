import { Lightning, Utils } from '@lightningjs/sdk';
import { FONT_FAMILY } from './constants/style';
import Fallback from './views/Fallback';
import Main from './views/Main';
import Splash from './views/Splash';

export default class App extends Lightning.Component {
  static getFonts() {
    return [{ family: FONT_FAMILY, url: Utils.asset('fonts/Roboto-Regular.ttf') }];
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
      },
      Main: {
        type: Main,
        alpha: 0,
        signals: { select: 'menuSelect' }
      },
      Fallback: {
        type: Fallback,
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
          this._setState('Main');
        }
      },

      class Fallback extends this {
        $enter() {
          this.tag('Fallback').setSmooth('alpha', 1);
        }

        $exit() {
          this.tag('Fallback').setSmooth('alpha', 0);
        }
      },

      class Main extends this {
        $enter() {
          this.tag('Main').patch({
            smooth: { alpha: 1, y: 0 }
          });
        }

        $exit() {
          this.tag('Main').patch({
            smooth: { alpha: 0, y: 100 }
          });
        }

        _getFocused() {
          return this.tag('Main');
        }
      }
    ];
  }
}
