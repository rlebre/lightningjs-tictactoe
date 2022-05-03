import { Lightning, Utils } from '@lightningjs/sdk';
import { FONT_FAMILY } from './constants/style';
import About from './views/About';
import Fallback from './views/Fallback';
import Game from './views/Game';
import Main from './views/Main';
import Splash from './views/Splash';

export default class App extends Lightning.Component {
  static getFonts() {
    return [{ family: FONT_FAMILY, url: Utils.asset('fonts/Roboto-Regular.ttf') }];
  }

  static _template() {
    return {
      rect: true,
      w: 1920,
      h: 1080,
      src: Utils.asset('images/background.png'),

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
      },

      Game: {
        type: Game,
        alpha: 0,
        signals: { back: 'back' }
      },

      About: {
        type: About,
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

        start() {
          this._setState('Game');
        }

        about() {
          this._setState('About');
        }

        exit() {
          this.application.closeApp();
        }

        menuSelect({ item }) {
          if (this._hasMethod(item.action)) {
            return this[item.action]();
          } else {
            this._setState('Fallback');
          }
        }
      },

      class Game extends this {
        $enter() {
          this.tag('Game').setSmooth('alpha', 1);
        }

        $exit() {
          this.tag('Game').setSmooth('alpha', 0);
        }

        _getFocused() {
          return this.tag('Game');
        }

        back() {
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

        _getFocused() {
          return this.tag('Fallback');
        }

        _handleEnter() {
          this._setState('Main');
        }

        _handleMenu() {
          this._setState('Main');
        }
      },

      class About extends this {
        $enter() {
          this.tag('About').setSmooth('alpha', 1);
        }

        $exit() {
          this.tag('About').setSmooth('alpha', 0);
        }

        _handleEnter() {
          this._setState('Main');
        }

        _handleMenu() {
          this._setState('Main');
        }
      }
    ];
  }
}
