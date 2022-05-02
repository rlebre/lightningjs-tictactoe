import { Lightning } from '@lightningjs/sdk';
import { FONT_FAMILY } from '../constants/style';

export default class Game extends Lightning.Component {
  static _template() {
    return {
      Game: {
        PlayerPosition: {
          rect: true,
          w: 250,
          h: 250,
          color: 0x40ffffff,
          x: 425,
          y: 125
        },
        Field: {
          x: 400,
          y: 100,
          children: [
            { rect: true, w: 1, h: 5, y: 300 },
            { rect: true, w: 1, h: 5, y: 600 },
            { rect: true, h: 1, w: 5, x: 300, y: 0 },
            { rect: true, h: 1, w: 5, x: 600, y: 0 }
          ]
        },
        Markers: {
          x: 400,
          y: 100
        },
        ScoreBoard: {
          x: 100,
          y: 170,
          Player: {
            text: { text: 'Player 0', fontSize: 29, fontFace: FONT_FAMILY }
          },
          AI: {
            y: 40,
            text: { text: 'Computer 0', fontSize: 29, fontFace: FONT_FAMILY }
          }
        }
      },
      Notification: {
        x: 100,
        y: 170,
        text: { fontSize: 70, fontFace: 'Regular' },
        alpha: 0
      }
    };
  }

  _construct() {
    this._playerIndex = 0;
    this._aiScore = 0;
    this._playerScore = 0;
  }

  _active() {
    this._reset();

    this.tag('Field').children.forEach((el, idx) => {
      el.setSmooth(idx < 2 ? 'w' : 'h', 900, { duration: 0.7, delay: idx * 0.15 });
    });
  }

  _reset() {
    this._tiles = ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'];
    this.render(this._tiles);
    this._setState('');
  }

  _handleUp() {
    console.log('up');
    let idx = this._index;
    if (idx - 3 >= 0) {
      this._setIndex(idx - 3);
    }
  }

  _handleDown() {
    console.log('down');
    let idx = this._index;
    if (idx + 3 <= this._tiles.length - 1) {
      this._setIndex(idx + 3);
    }
  }

  _handleLeft() {
    console.log('left');
    let idx = this._index;
    if (idx % 3) {
      this._setIndex(idx - 1);
    }
  }

  _handleRight() {
    console.log('right');
    const newIndex = this._index + 1;
    if (newIndex % 3) {
      this._setIndex(newIndex);
    }
  }

  _setIndex(idx) {
    this.tag('PlayerPosition').patch({
      smooth: {
        x: (idx % 3) * 300 + 425,
        y: ~~(idx / 3) * 300 + 125
      }
    });
    this._index = idx;
  }

  render(tiles) {
    this.tag('Markers').children = tiles.map((el, idx) => {
      return {
        x: (idx % 3) * 300 + 110,
        y: ~~(idx / 3) * 300 + 90,
        text: { text: el === 'e' ? '' : `${el}`, fontSize: 100 }
      };
    });
  }
}
