var detectMouseCollision,
    mouseX, mouseY, mouseIsPressed, clickOn, rect, drawStars, Planet,
    ellipseMode, RADIUS, planetThree, drawBackground, Star,
    drawWhiteCursor, initDist, height, width, makeStars, stars,
    createCanvas, screen, colorMode, noStroke, HSB, setup, draw, drawRotatingEllipse, fill, window, ellipse, Planet, planetOne, planetTwo;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  colorMode(HSB, 100);
  ellipseMode(RADIUS);
  background(100, 0, 20);
  stars = makeStars(59);
}

function makeStars(quantity) {
  var starArray = [];
  var i;
  for (i = 0; i < quantity; i ++) {
    starArray.push(new Star(width * Math.random(), height * Math.random(), Math.random()*6 - 3, Math.random()*6 - 3, Math.random() * 100));
  }
  return starArray;
};

function draw() {
  drawBackground();
  stars.forEach(function(star) {
    star.draw();
    star.advance();
  });
}


function drawBackground() {
  fill(100, 0, 20, 3);
  noStroke();
  rect(0, 0, width, height);
};

function Star(xpos, ypos, xvel, yvel, hue) {
  this.xpos = xpos;
  this.ypos= ypos;
  this.xvel = xvel;
  this.yvel = yvel;

  this.advance = function() {
    this.xpos = (this.xpos + this.xvel) % width;
    this.ypos = (this.ypos + this.yvel) % height;
    if(this.xpos < 0) { this.xpos = width;}
    if(this.ypos < 0) { this.ypos = height;}
  };

  this.draw = function() {
    fill(hue, 30, 70);
    noStroke();
    ellipse(this.xpos, this.ypos, 2, 2);
  };
  return this;
};
