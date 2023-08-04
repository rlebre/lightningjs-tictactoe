import { Lightning } from '@lightningjs/sdk';
import Logo from '../components/logo';
import { FONT_FAMILY } from '../constants/style';
import GameUtils from '../lib/GameUtils';

export default class Game extends Lightning.Component {
  static _template() {
    return {
      Game: {
        PlayerPosition: {
          rect: true,
          w: 250,
          h: 250,
          color: 0x40ffffff,
          x: 625,
          y: 125,
          shader: { type: Lightning.shaders.RoundedRectangle, radius: 25 }
        },

        Field: {
          x: 600,
          y: 100,
          children: [
            { rect: true, w: 1, h: 5, y: 300 },
            { rect: true, w: 1, h: 5, y: 600 },
            { rect: true, h: 1, w: 5, x: 300, y: 0 },
            { rect: true, h: 1, w: 5, x: 600, y: 0 }
          ]
        },

        Markers: {
          x: 600,
          y: 100
        },

        Logo: {
          type: Logo
        },

        ScoreBoard: {
          x: 100,
          y: 370,
          text: { text: 'Score', fontSize: 29, fontFace: FONT_FAMILY, fontStyle: 'bold' },

          Player: {
            y: 50,
            text: { text: 'Player 0', fontSize: 25, fontFace: FONT_FAMILY }
          },

          AI: {
            y: 100,
            text: { text: 'Computer 0', fontSize: 25, fontFace: FONT_FAMILY }
          }
        },

        NextPlaying: {
          x: 100,
          y: 670,
          text: { text: 'Next playing:      ', fontSize: 18, fontFace: FONT_FAMILY },

          Player: {
            x: 130,
            text: { text: '  Player', fontSize: 18, fontFace: FONT_FAMILY }
          }
        }
      },

      Notification: {
        x: 100,
        y: 170,
        text: { fontSize: 70, fontFace: FONT_FAMILY },
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
    let idx = this._playerIndex;
    if (idx - 3 >= 0) {
      this._setIndex(idx - 3);
    }
  }

  _handleDown() {
    let idx = this._playerIndex;
    if (idx + 3 <= this._tiles.length - 1) {
      this._setIndex(idx + 3);
    }
  }

  _handleLeft() {
    let idx = this._playerIndex;
    if (idx % 3) {
      this._setIndex(idx - 1);
    }
  }

  _handleRight() {
    const newIndex = this._playerIndex + 1;
    if (newIndex % 3) {
      this._setIndex(newIndex);
    }
  }

  _handleEnter() {
    if (this._tiles[this._playerIndex] === 'e') {
      if (this.place(this._playerIndex, 'X')) {
        this._setState('Computer');
      }
    }
  }

  _handleMenu() {
    this.signal('back');
  }

  _handleBack() {
    this.signal('back');
  }

  place(index, marker) {
    this._tiles[index] = marker;
    this.render(this._tiles);

    const winner = GameUtils.getWinner(this._tiles);
    if (winner) {
      this._setState('End.Winner', [{ winner }]);
      return false;
    }

    return true;
  }

  _setIndex(idx) {
    this.tag('PlayerPosition').patch({
      smooth: {
        x: (idx % 3) * 300 + 625,
        y: ~~(idx / 3) * 300 + 125
      }
    });
    this._playerIndex = idx;
  }

  static _states() {
    return [
      class Computer extends this {
        $enter() {
          this.patch({
            Game: {
              NextPlaying: {
                Player: {
                  text: { text: 'Computer' }
                }
              }
            }
          });

          const position = GameUtils.AI(this._tiles);
          if (position === -1) {
            this._setState('End.Tie');
            return false;
          }

          setTimeout(() => {
            if (this.place(position, '0')) {
              this._setState('');
            }
          }, ~~(Math.random() * 1200) + 200);

          this.tag('PlayerPosition').setSmooth('alpha', 0);
        }

        _captureKey() {}

        $exit() {
          this.patch({
            Game: {
              NextPlaying: {
                Player: {
                  text: { text: 'Player' }
                }
              }
            }
          });

          this.tag('PlayerPosition').setSmooth('alpha', 1);
        }
      },

      class End extends this {
        _handleEnter() {
          this._reset();
        }

        $exit() {
          this.patch({
            Game: {
              smooth: { alpha: 1 }
            },
            Notification: {
              text: { text: '' },
              smooth: { alpha: 0 }
            }
          });
        }

        static _states() {
          return [
            class Winner extends this {
              $enter(_, { winner }) {
                if (winner === 'X') {
                  this._playerScore += 1;
                } else {
                  this._aiScore += 1;
                }
                this.patch({
                  Game: {
                    smooth: { alpha: 0 },
                    ScoreBoard: {
                      Player: { text: { text: `Player ${this._playerScore}` } },
                      AI: { text: { text: `Computer ${this._aiScore}` } }
                    }
                  },
                  Notification: {
                    text: { text: `${winner === 'X' ? 'Player 1' : 'Computer'} wins (press enter to play again)` },
                    smooth: { alpha: 1 }
                  }
                });
              }
            },

            class Tie extends this {
              $enter() {
                this.patch({
                  Game: {
                    smooth: { alpha: 0 }
                  },
                  Notification: {
                    text: { text: 'Tie (press enter to try again)' },
                    smooth: { alpha: 1 }
                  }
                });
              }
            }
          ];
        }
      }
    ];
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
