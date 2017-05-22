var detectMouseCollision,
    mouseX, mouseY, mouseIsPressed, clickOn, rect, drawStars,
    ellipseMode, RADIUS, planetThree, drawBackground, Star,
    drawWhiteCursor, initDist, height, width, makeStars, stars,
    createCanvas, screen, colorMode, noStroke, HSB, setup, draw, drawRotatingEllipse, fill, window, ellipse, Planet, planetOne, planetTwo;


function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  colorMode(HSB, 100);
  noStroke();
  ellipseMode(RADIUS);

  initDist = 200;
  planetOne = new Planet(1, window.innerWidth / 2 + initDist, window.innerHeight / 2 + initDist, 0.01, 0.01);
  planetTwo = new Planet(-1, window.innerWidth / 2 - initDist, window.innerHeight / 2 - initDist, 0.01, -0.01);
  planetThree = new Planet(-1, window.innerWidth / 2 - initDist, window.innerHeight / 2 + initDist, -0.01, -0.01);

  stars = makeStars(8);
}

function draw() {
  drawBackground();
  planetOne.collide(planetTwo);
  planetOne.collide(planetThree);
  planetTwo.collide(planetOne);
  planetTwo.collide(planetThree);
  planetThree.collide(planetOne);
  planetThree.collide(planetTwo);

  planetOne.advance();
  planetTwo.advance();
  planetThree.advance();

  planetOne.draw();
  planetTwo.draw();
  planetThree.draw();

  stars.forEach(function(star) {
    star.advance();
    star.draw();
  });

}

function makeStars(quantity) {
  var starArray = [];
  var i;
  for (i = 0; i < quantity; i ++) {
    starArray.push(new Star(width * Math.random(), height * Math.random(), 3));
  }
  return starArray;
}

function drawBackground() {
  fill(100, 0, 0, 1);
  rect(0, 0, width, height);
}

function Star(xpos, ypos, vel) {
  this.xpos = xpos;
  this.ypos= ypos;
  this.vel = vel;

  this.advance = function() {
    this.xpos = (this.xpos + this.vel) % width;
    this.ypos = (this.ypos + this.vel) % height;
  };

  this.draw = function() {
    fill(100, 0, 100);
    ellipse(this.xpos, this.ypos, 1, 1);
  };
  return this;
}

function Planet(direction, xpos, ypos, xvel, yvel) {
  this.seed = Math.floor(Math.random() * 1000000);
  this.xpos = xpos;
  this.ypos = ypos;
  this.xvel = xvel;
  this.yvel = yvel;
  this.direction = direction;
  this.taurusRadius = window.innerWidth / 5;

  this.advance = function() {
    this.seed += 1;
    this.saturation = Math.sin((this.seed)/144) * 34 + 55;
    this.value = Math.cos((this.seed)/89) * 13 + 89;
    this.radius = (Math.sin((this.seed)/144)*144 + 233)/3;

    this.xaccel = -(this.xpos - window.innerWidth/2) / (window.innerWidth*5) - Math.cos(this.direction*this.seed/50)/89;
    this.yaccel = -(this.ypos - window.innerHeight/2) / (window.innerHeight*5) - Math.sin(this.direction*this.seed/50)/89;

    this.xvel = this.xvel + this.xaccel;
    this.yvel = this.yvel + this.yaccel;

    this.xpos = this.xpos + this.xvel;
    this.ypos = this.ypos + this.yvel;
  };

  this.draw = function() {
    fill((this.seed/21) % 100, this.saturation, this.value);
    ellipse(this.xpos, this.ypos, this.radius, this.radius);
  };

  this.collide = function(planet) {
    var xdist = Math.abs(this.xpos - planet.xpos);
    var ydist = Math.abs(this.ypos - planet.ypos);
    var absdist = Math.sqrt(Math.abs(Math.pow(xdist, 2) + Math.pow(ydist, 2)));
    var colliding = absdist < this.radius + planet.radius;
    if(colliding){
      this.xvel = this.xvel * -1;
      this.yvel = this.yvel * -1;
      this.xaccel = this.accel * -1;
      this.yaccel = this.accel * -1;
    }
  };

}

function clickOn(planet) {
  if(mouseIsPressed) {
    planet.xpos = mouseX;
    planet.ypos = mouseY;
  }
}

function detectMouseCollision(radius, xpos, ypos) {
 var xdist = Math.abs(xpos - mouseX);
 var ydist = Math.abs(ypos - mouseY);
 var absdist = Math.sqrt(Math.abs(Math.pow(xdist, 2) + Math.pow(ydist, 2) - Math.pow(radius, 2)));
 var colliding = absdist < radius;
 return colliding;
}
