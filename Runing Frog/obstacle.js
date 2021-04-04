class Obstacle {

  constructor(velX, obstacleImage) {
    this.r = 130;
    this.x =  width;
    this.y = height - (this.r + 30);
    this.velX = velX;
    this.image = obstacleImage;
  }

  move() {
    this.x -= this.velX;
  }

  show() {
    image(this.image, this.x, this.y, this.r, this.r);
  }

  getX() {
    return this.x;
  }

  getSize() {
  return this.r;
}
}
