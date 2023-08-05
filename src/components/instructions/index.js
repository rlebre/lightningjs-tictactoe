import { Lightning } from '@lightningjs/sdk';

export default class Instructions extends Lightning.Component {
  static _template() {
    return {
      Logo: {
        x: 0,
        y: 0,
        h: 100,
        text: {
          text: 'Navigation',
          fontSize: 16
        },

        Directions: {
          y: 30,
          w: 100,
          h: 55,
          src: 'images/lua-remote-arrows.png'
        },

        Return: {
          x: 110,
          y: 50,
          w: 30,
          h: 30,
          src: 'images/lua-remote-select.png'
        },

        Esc: {
          x: 150,
          y: 50,
          w: 30,
          h: 30,
          src: 'images/lua-remote-back.png'
        }
      }
    };
  }
}
