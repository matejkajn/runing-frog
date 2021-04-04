class Frog {
  constructor() {
    this.r = 150;
    this.x = this.r ;
    this.y = height - (this.r + 30);
    this.vy = 0;
    this.gravity = 2;
  }

  jump() {
    if(this.y == height - (this.r + 30)) {
      this.vy = -35;
      return true;
    }
  }

  hits(obstacle) {
    let x1 = this.x + this.r * 0.5;
    let y1 = this.y + this.r * 0.5;
    let x2 = obstacle.x + obstacle.r * 0.5;
    let y2 = obstacle.y + obstacle.r * 0.5;

    return collideRectCircle(this.x + 15, this.y + 10, this.r - 70, this.r - 30, x2, y2, obstacle.r - 20);
  }

  move() {
    this.y += this.vy;
    this.vy += this.gravity;
    this.y = constrain(this.y, 0, height - (this.r + 30));
  }

  show() {
    image(frogImg, this.x, this.y, this.r, this.r);
  }

  resetPosition() {
    this.x = this.r;
    this.y = height - (this.r + 30);
  }

  getX() {
    return this.x;
  }
}
