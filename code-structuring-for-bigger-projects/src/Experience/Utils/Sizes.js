import EventEmitter from 'eventemitter3';

export default class Sizes extends EventEmitter {
  constructor() {
    super();

    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.pixelRatio = Math.min(window.devicePixelRatio, 2);

    this.handleResize = this.handleResize.bind(this);

    window.addEventListener('resize', this.handleResize);
  }

  handleResize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.pixelRatio = Math.min(window.devicePixelRatio, 2);

    this.emit('resize', {
      width: this.width,
      height: this.height,
      pixelRatio: this.pixelRatio,
    });
  }

  destroy() {
    window.removeEventListener('resize', this.handleResize);
    this.off('resize');
  }
}
