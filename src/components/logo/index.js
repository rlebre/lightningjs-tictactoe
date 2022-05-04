import { Lightning } from '@lightningjs/sdk';

export default class Logo extends Lightning.Component {
  static _template() {
    return {
      x: 100,
      y: 100,
      w: 200,
      h: 200,
      src: 'logo.png'
      // texture: { type: Lightning.textures.ImageTexture, src: Utils.asset('logo2.svg') },
    };
  }
}
