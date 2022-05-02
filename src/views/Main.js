import { Lightning } from '@lightningjs/sdk';
import Menu from '../components/Menu';

export default class Main extends Lightning.Component {
  static _template() {
    return {
      Menu: {
        x: 600,
        y: 400,
        type: Menu,
        items: [
          { label: 'START NEW GAME', action: 'start' },
          // { label: 'CONTINUE', action: 'continue' },
          // { label: 'ABOUT', action: 'about' },
          { label: 'EXIT', action: 'exit' }
        ]
      }
    };
  }
}
