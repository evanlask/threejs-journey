import { Pane } from 'tweakpane';
import * as EssentialsPlugin from '@tweakpane/plugin-essentials';

export default class Debug {
  constructor() {
    // this.enabled = window.location.hash === '#debug';
    this.enabled = true;

    if (!this.enabled) {
      return;
    }

    this.pane = new Pane({
      title: 'Debugging',
      expanded: true,
    });

    this.pane.registerPlugin(EssentialsPlugin);
  }

  destroy() {
    if (this.enabled) {
      this.pane.dispose();
    }
  }
}
