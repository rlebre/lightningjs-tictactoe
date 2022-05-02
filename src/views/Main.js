import { Lightning } from '@lightningjs/sdk';
import Menu from '../components/main-menu/Menu';

export default class Main extends Lightning.Component {
  static _template() {
    return {
      Menu: {
        x: 600,
        y: 400,
        type: Menu,
        items: [
          { label: 'New game', action: 'start' },
          { label: 'Continue last game', action: 'continue' },
          { label: 'About', action: 'about' },
          { label: 'Exit', action: 'exit' }
        ]
      }
    };
  }

  _getFocused() {
    return this.tag('Menu');
  }

  _handleEnter() {
    this.signal('select', { item: this.tag('Menu').activeItem });
  }
}
