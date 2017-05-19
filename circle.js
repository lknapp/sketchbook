var detectMouseCollision,
    mouseX, mouseY,
    frame, ellipseMode, RADIUS,
    drawWhiteCursor, initDist,
    createCanvas, screen, colorMode, noStroke, HSB, setup, draw, drawRotatingEllipse, fill, window, ellipse, Planet, planetOne, planetTwo;


function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  frame = 0;
  colorMode(HSB, 100);
  noStroke();
  ellipseMode(RADIUS);

  initDist = 50;
  planetOne = new Planet(1, window.innerWidth / 2 + initDist, window.innerHeight / 2 + initDist);
  planetTwo = new Planet(-1, window.innerWidth / 2 - initDist, window.innerHeight / 2 - initDist);
}

function draw() {
  frame += 1;
  planetOne.collide(planetTwo);
  planetTwo.collide(planetOne);

  planetOne.advance();
  planetTwo.advance();

  planetOne.draw();
  planetTwo.draw();
}


function Planet(direction, xpos, ypos) {
  this.seed = Math.floor(Math.random() * 1000000);
  this.xpos = xpos;
  this.ypos = ypos;
  this.direction = direction;
  this.taurusRadius = window.innerWidth / 5;

  this.advance = function() {
    this.seed += 1;
    this.saturation = Math.sin((this.seed)/144) * 34 + 55;
    this.value = Math.cos((this.seed)/89) * 13 + 89;
    this.radius = (Math.sin((this.seed)/89)*144 + 233)/2;

    this.xaccel = (this.xpos - window.innerWidth) / (window.innerWidth*3);
    this.yaccel = (this.ypos - window.innerHeight) / (window.innerHeight*3);

    this.xvel = Math.cos(this.direction*this.seed/50)*3 + this.xaccel;
    this.yvel = -Math.sin(this.direction*this.seed/50)*3 + this.yaccel;
    this.xpos = this.xpos + this.xvel;
    this.ypos = this.ypos + this.yvel;
  };

  this.draw = function() {
    fill((this.seed/21) % 100, this.saturation, this.value, 15);
    ellipse(this.xpos, this.ypos, this.radius, this.radius);
  };

  this.collide = function(planet) {
    var xdist = Math.abs(this.xpos - planet.xpos);
    var ydist = Math.abs(this.ypos - planet.ypos);
    var absdist = Math.sqrt(Math.abs(Math.pow(xdist, 2) + Math.pow(ydist, 2)));
    var colliding = absdist < this.radius + planet.radius;
    if(colliding){
      this.direction = -this.direction;
    }
  };

}


function detectMouseCollision(radius, xpos, ypos) {
 var xdist = Math.abs(xpos - mouseX);
 var ydist = Math.abs(ypos - mouseY);
 var absdist = Math.sqrt(Math.abs(Math.pow(xdist, 2) + Math.pow(ydist, 2) - Math.pow(radius, 2)));
 var colliding = absdist < radius;
 return colliding;
}
