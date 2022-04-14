import EventEmitter from 'eventemitter3';

export default class Time extends EventEmitter {
  constructor() {
    super();

    this.start = Date.now();
    this.current = this.start;
    this.elapsed = 0;
    this.delta = 16;

    window.requestAnimationFrame(() => {
      this.tick();
    });
  }

  tick() {
    const current = Date.now();

    this.delta = current - this.current;
    this.current = current;
    this.elapsed = this.current - this.start;

    this.emit('tick', {
      start: this.start,
      current: this.current,
      elapsed: this.elapsed,
      delta: this.delta,
    });

    window.requestAnimationFrame(() => {
      this.tick();
    });
  }

  destroy() {
    this.off('tick');
  }
}
