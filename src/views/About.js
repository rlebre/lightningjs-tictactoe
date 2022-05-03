import { Lightning } from '@lightningjs/sdk';
import { FONT_FAMILY } from '../constants/style';

export default class About extends Lightning.Component {
  static _template() {
    return {
      Logo: {
        y: 200,
        x: 960,

        Title: {
          mountX: 0.5,
          text: {
            text: 'About',
            fontFace: FONT_FAMILY,
            fontStyle: 'bold',
            fontSize: 36
          }
        },

        Description: {
          mountX: 0.5,
          y: 100,
          w: 750,
          text: {
            text:
              'This work was developed using LightningJS (https://lightningjs.io) by Rui Lebre (https://ruilebre.com and https://github.com/rlebre).\n\nFor the purpose of learning the open-source project TicTacToe LightningJS example was used - available at https://github.com/mlapps/lightning-getting-started-docs.\n\nThe source code of this project is available at https://github.com/rlebre/lightningjs-tictactoe. If you want to contribute to this project, please, fork it and send a pull request. If you want to report any bug or have any suggestion, please, open an issue on the project page.',
            fontSize: 25,
            lineHeight: 55,
            paddingLeft: 0,
            fontFace: FONT_FAMILY,
            fontStyle: 'bold',
            wordWrap: true
          }
        }
      }
    };
  }
}
