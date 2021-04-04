class Animation {
  constructor() {
    this.xA1 = 1300;
    this.xA2 = -300;
    this.y = 120;
    this.r = 100;
    this.picture;
    this.angle = 0;
    this.scale = 0;

    this.sinX = this.xA2;
    this.sinY = this.y;
    this.a = 90;
    this.sinAngle = 0;
  }

  animation1(animationImage) {
    translate(this.xA1, this.y);
    rotate(this.angle);
    imageMode(CENTER);
    image(animationImage, 0, 0, this.r, this.r);
    this.xA1 = this.xA1 - 1.5;
    this.angle = this.angle - 2;
    if (this.xA1 < -300) {
      isAnimationON = false;
      this.resetValues();
    }
  }

  animation2(animationImage) {
    translate(this.xA2, this.y);
    rotate(this.angle);
    imageMode(CENTER);
    image(animationImage, 0, 0, this.r, this.r);
    var vect = this.getSinMovement();
    this.xA2 = vect.x;
    this.y = vect.y;
    //this.angle = this.angle + 2;
    if (this.xA2 > 1050) {
      isAnimationON = false;
      this.resetValues();
    }
  }

  getPositionX() {
    return this.xA1;
  }

  getPositionY() {
    return this.y;
  }

  getSinMovement() {
    var func_sin = this.a * sin(this.sinAngle);
    var positionVector = createVector(this.sinX, 180 - func_sin);
    this.sinX++;
    this.sinY++;
    this.sinAngle++;
    return positionVector;
  }

  resetValues() {
    this.xA1 = 1300;
    this.xA2 = -300;
    this.y = 120;
    this.r = 100;
    this.angle = 0;
    this.scale = 0;

    this.sinX = this.xA2;
    this.sinY = this.y;
    this.a = 90;
    this.sinAngle = 0;
  }
}
