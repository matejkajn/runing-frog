var canvas = document.getElementById("divID");
var canvasHeight = document.getElementById("divID").clientHeight;
var canvasWidth = document.getElementById("divID").clientWidth;
var scoreLabel = document.getElementById("lbl_score");

//Funkcionalita
var started = false;
var gameOver = false;
var score;
var x1 = 0;
var x2;
var bSpeed = 4;
var currentSpeed;

let bImg;
let b2Img;
let forestImage;
let frogImg;
let mushroomImg;
let cat1Img;
let cat2Img;
let menuImg;
let font1;
let font2;
let mushrooms = [];

//Animace
let animationPictures = [];
let song;
let jumpSound;

let isAnimationON = false;
let animationInt;
let imageOfAnimation;

//Houby na tripu
let obstaclePictures = [];

function preload() {
  //overlay
  bImg = loadImage('img/background1.png');
  b2Img = loadImage('img/background2.png');
  frogImg = loadImage('img/frog.png');
  mushroomImg = loadImage('img/mushroom1.png');
  menuImg = loadImage('img/background3.png');
  rptImg = loadImage('img/repeat.png');

  //fonty
  font1 = loadFont('img/Pirulen.ttf');
  font2 = loadFont('img/Play-Regular.ttf');

  //load pro animace
  song = loadSound('img/soundtrack.mp3');
  song.setVolume(0.05);

  jumpSound = loadSound('img/jump_v2.wav');
  jumpSound.setVolume(0.05);

  for (var i = 1; i < 12; i++) {
    animationPictures.push(loadImage('img/animal' + i + '.png'));
  }

  //Load pro překážky
  for (var i = 1; i < 10; i++) {
    obstaclePictures.push(loadImage('img/mushroom' + i + '.png'));
  }
}

//sestavení
function setup() {
  let cnvs = createCanvas(canvasWidth, canvasHeight);
  cnvs.parent('divID');
  angleMode(DEGREES);
  reset();
  noLoop();
}

//ovládání
function keyPressed() {
  if (!started) {
    if (keyCode === ENTER) {
      start();
      song.play();
      song.loop();
    }
  }

  if (started && gameOver) {
    if (key == ' ') {
      reset();
      song.play();
      song.loop();
    }
  }

  if (!gameOver && started) {
    if (key == ' ') {
      if (frog.jump()) {
        jumpSound.play();
      }
    }
  }
}

//vykreslování hry
function draw() {
  if (started) {
    obs = new Obstacle(currentSpeed, getRandomPictureOfObstacle()); // přidá prvek na začátek pole
    spawnOptimizer();
    background(bImg);
    
    image(b2Img, x1, height-canvasHeight, canvasWidth, canvasHeight);
    image(b2Img, x2, height-canvasHeight, canvasWidth, canvasHeight);

    x1 -= bSpeed;
    x2 -= bSpeed;

    if (x1 < -width) {
      x1 = width-10;
    }
    if (x2 < -width) {
      x2 = width-10;
    }

    for (let o of mushrooms) {
      if (o.getX() < frog.getX()) {
        if (o.getX() < (-o.getSize())) {
          score++;
          mushrooms.pop();
          increaseSpeed();
        }
      }
      if (frog.hits(o)) {
        gameOver = true;
        noLoop();
      }
      o.show();
      o.move();
    }
    
    
    frog.move();

    addScore();
    push();
    if (isAnimationON) {

      if (animationInt >= 50) {
        animation.animation1(imageOfAnimation);
      } else {
        animation.animation2(imageOfAnimation);
      }

    } else {
      isAnimationON = true;
      imageOfAnimation = getRandomAnimationPicture();
      animationInt = getRandomInt(0, 100);
    }
    pop();

    frog.show();

    if (gameOver) {
      song.stop();
      endScreen();
    }

  }
  else {
    push();
    startScreen();
    pop();
  }
  }

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

//zrychlování
function increaseSpeed() {
  var modulo = score % 30;
  if (score > 0) {
    if (modulo == 0) {
      setCurrentSpeed(1);
    }
  }
}

//loop
function start() {
  if (!gameOver) {
    started = true;
    loop();
  }
}

//úprava spawnování překážek
function spawnOptimizer() {
  var arrSize = mushrooms.length;
  var rnd = random(1);
  var previous;

  if (arrSize > 0) {
    previous = mushrooms[0];
  }

  if (arrSize == 0) {
    if (rnd < 0.5) {
      mushrooms.unshift(obs);
    }
  }
  else if (arrSize == 1) {
    if (previous.getX() < width / 2) {
      if (rnd < score / 500 ) {
        mushrooms.unshift(obs);
      }
    }
  }
  else if (arrSize == 2) {
    if (previous.getX() < width / 2) {
      if (rnd < score / 10000 * 0.5) {
        mushrooms.unshift(obs);
      }
    }
  }
  else if (arrSize > 2){
    if (previous.getX() < width / 2) {
      if (rnd < score / 10000 * 0.25) {
        mushrooms.unshift(obs);
      }
    }
  }
}

//resetování hry
function reset() {
  score = 0;
  currentSpeed = 10;
  frog = new Frog();
  animation = new Animation();
  frog.resetPosition();
  mushrooms = [];
  gameOver = false;
  isAnimationON = false;
  x1 = 0;
  x2 = width;
  loop();
}

//skore label
function addScore() {
  fill(255);
  textFont(font2);
  textSize(35);
  text('Score: ' + score, canvasWidth * 0.01, canvasHeight * 0.025, 350, 50);
}

//úvodní obrazovka
function startScreen() {
  background(menuImg);

  textFont(font1);
  textAlign(CENTER);
  textSize(75);
  textStyle(BOLD);
  fill('white');
  text('Running Frog',(canvasWidth /2) - 360, 25, 800, 100 );

  image(frogImg, (canvasWidth / 2) - 250, 125, 200, 200);
  image(mushroomImg, (canvasWidth / 2) + 50, 125, 200, 200);

  fill('white');
  textFont(font2);
  textAlign(CENTER);
  textSize(35);
  textStyle(BOLD);
  text('Press \'ENTER\' to start the game.', (canvasWidth /2) - 400, (canvasHeight / 2) + 25, 800, 50);
  text('Hint:' + '\n\nSpace - Jump' + '\nSpace - Reset', (canvasWidth /2) - 400, (canvasHeight / 2) + 100, 800, 450);
}

function getCurrentSpeed() {
  return currentSpeed;
}

function setCurrentSpeed(speed) {
  currentSpeed += speed;
}

function getRandomPictureOfObstacle() {
  return obstaclePictures[Math.floor(Math.random() * obstaclePictures.length)];
}

function getRandomAnimationPicture() {
  return animationPictures[Math.floor(Math.random() * animationPictures.length)];
}

//obrazovka po prohře
function endScreen() {
  push();
  fill(45, 44, 80, 150);
  rect(0, 0, canvasWidth, canvasHeight);
  pop();

  push();
  image(rptImg, (canvasWidth / 2) - 35, (canvasHeight / 2) + 75, 70, 70);
  pop();

  push();
  fill('white');
  textFont(font2);
  textAlign(CENTER);
  textSize(35);
  textStyle(BOLD);
  text('You lost.', (canvasWidth /2) - 400, (canvasHeight / 2) - 100, 800, 50);
  text('Press \'Space\' to retry.', (canvasWidth /2) - 400, (canvasHeight / 2), 800, 50);
  pop();
}
