import { configure, observable, action, computed } from "mobx";

import { GhostPhase } from "../components/Ghost";
import { Direction } from "../components/Types";
import { PacManPhase } from "../components/PacMac";

export const SPEED = 2;

configure({ enforceActions: "observed" });

export class PacManStore {
  @observable
  timestamp = 0;

  @observable
  x = 16;

  @observable
  y = 16;

  @computed
  get phase(): PacManPhase {
    const step = Math.round(this.timestamp / 300) % 4;
    const phase = step === 3 ? 1 : step;
    return phase as PacManPhase;
  }

  @observable
  direction: Direction = "RIGHT";

  @observable
  pressedKey = "";

  @action.bound
  setPressedKey(pressedKey: string) {
    this.pressedKey = pressedKey;

    if (pressedKey === "ArrowLeft") {
      this.direction = "LEFT";
    } else if (pressedKey === "ArrowRight") {
      this.direction = "RIGHT";
    } else if (pressedKey === "ArrowUp") {
      this.direction = "UP";
    } else if (pressedKey === "ArrowDown") {
      this.direction = "DOWN";
    } else this.direction = "RIGHT";
  }

  @action.bound
  update(timestamp: number) {
    this.timestamp = timestamp;
    if (this.pressedKey) {
      if (this.direction === "LEFT") {
        this.x -= SPEED;
      }
      if (this.direction === "RIGHT") {
        this.x += SPEED;
      }
      if (this.direction === "UP") {
        this.y -= SPEED;
      }
      if (this.direction === "DOWN") {
        this.y += SPEED;
      }
    }
  }
}

export class GhostStore {
  @observable
  timestamp = 0;

  ghostNumber = 0;

  @observable
  x = 16;

  minX = 16;
  maxX = 17 * 16;

  @observable
  y = 16;

  minY = 16;
  maxY = 17 * 16;

  @observable
  vx = SPEED;

  @observable
  vy = 0;

  @computed
  get phase(): GhostPhase {
    return Math.round((this.timestamp + this.ghostNumber * 100) / 300) % 2 === 0
      ? 0
      : 1;
  }

  @computed
  get direction(): Direction {
    if (this.vx > 0) {
      return "RIGHT";
    }
    if (this.vx < 0) {
      return "LEFT";
    }
    if (this.vy > 0) {
      return "DOWN";
    }
    return "UP";
  }

  @action.bound
  update(timestamp: number) {
    this.timestamp = timestamp;

    this.x += this.vx;
    if (this.x > this.maxX) {
      this.x = this.maxX;
      this.vx = -1 * this.vx;
    }
    if (this.x <= this.minX) {
      this.x = this.minX;
      this.vx = -1 * this.vx;
    }

    this.y += this.vy;
    if (this.y > this.maxY) {
      this.y = this.maxY;
      this.vy = -1 * this.vy;
    }
    if (this.y <= this.minY) {
      this.y = this.minY;
      this.vy = -1 * this.vy;
    }
  }
}

export class GameStore {
  constructor() {
    this.ghosts[0].ghostNumber = 0;
    this.ghosts[0].x = 200;
    this.ghosts[0].y = 30 * 16;
    this.ghosts[0].vx = SPEED;
    this.ghosts[0].vy = 0;
    this.ghosts[0].minY = 20;
    this.ghosts[0].maxY = 1000;

    this.ghosts[1].ghostNumber = 1;
    this.ghosts[1].x = 50;
    this.ghosts[1].y = 25;
    this.ghosts[1].vx = SPEED;
    this.ghosts[1].vy = 0;

    this.ghosts[2].ghostNumber = 2;
    this.ghosts[2].maxX = 800;
    this.ghosts[2].minX = 16;
    this.ghosts[2].minY = 20;
    this.ghosts[2].maxY = 39 * 16;
    this.ghosts[2].x = 31 * 16;
    this.ghosts[2].y = 25 * 16;
    this.ghosts[2].vx = 0;
    this.ghosts[2].vy = SPEED;

    this.ghosts[3].ghostNumber = 3;
    this.ghosts[3].maxX = 8 + 38 * 16;
    this.ghosts[3].minX = 16;
    this.ghosts[3].minY = 20;
    this.ghosts[3].maxY = 82 * 16;
    this.ghosts[3].x = 31 * 16;
    this.ghosts[3].y = 10 + 43 * 16;
    this.ghosts[3].vx = SPEED;
    this.ghosts[3].vy = 0;
  }

  @observable
  gameRunning = true;

  ghosts = [
    new GhostStore(),
    new GhostStore(),
    new GhostStore(),
    new GhostStore()
  ];

  pacMan = new PacManStore();

  update(timestamp: number) {
    this.pacMan.update(timestamp);
    for (const ghost of this.ghosts) {
      ghost.update(timestamp);
    }
  }

  @action.bound
  setPressedKey(pressedKey: string) {
    this.pacMan.setPressedKey(pressedKey);
  }

  @action.bound
  stopGame() {
    this.gameRunning = false;
  }
}