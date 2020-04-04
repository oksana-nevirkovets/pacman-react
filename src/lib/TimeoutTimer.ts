import { MilliSeconds } from './Types';
import { observable, computed, action } from 'mobx';

export type TimeoutTimerCallback = () => void;

export class TimeoutTimer {
  duration: MilliSeconds;
  readonly onTimedOut: TimeoutTimerCallback | null;

  @observable
  running: boolean;

  @observable
  timeSpent: MilliSeconds;

  constructor(
    duration: MilliSeconds,
    onTimedOut: TimeoutTimerCallback | null = null
  ) {
    this.duration = duration;
    this.onTimedOut = onTimedOut;
    this.running = false;
    this.timeSpent = 0;
  }

  @action
  setDuration(duration: MilliSeconds) {
    this.duration = duration;
  }

  @action.bound
  start() {
    this.running = true;
    this.timeSpent = 0;
  }

  @action
  advance(timePassed: MilliSeconds) {
    if (!this.running) {
      return;
    }
    this.timeSpent += timePassed;
    if (this.isTimedOut) {
      this.onTimedOut?.();
      this.stop();
    }
  }

  @action
  stop() {
    this.running = false;
  }

  reset() {
    this.stop();
    this.start();
  }

  @computed
  get timeLeft() {
    return this.duration - this.timeSpent;
  }

  @computed
  get isTimedOut() {
    return this.timeSpent >= this.duration;
  }
}