var detectMouseCollision,
    mouseX, mouseY, mouseIsPressed, clickOn, rect, drawStars, Planet,
    ellipseMode, RADIUS, planetThree, drawBackground, Star,
    drawWhiteCursor, initDist, height, width, makeStars, stars,
    createCanvas, screen, colorMode, noStroke, HSB, setup, draw, drawRotatingEllipse, fill, window, ellipse, Planet, planetOne, planetTwo;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  colorMode(HSB, 100);
  ellipseMode(RADIUS);

  planets = makePlanets();
  stars = makeStars(8);
}

function draw() {
  drawBackground();
  collidePlanets(planets);

  stars.forEach(function(star) {
    star.advance();
    star.draw();
  });

  planets.forEach(function(planet) {
    planet.advance();
    planet.draw();
  });
}

function makePlanets() {
  initDist = 200;

  planets = [
    new Planet(1, window.innerWidth / 2 + initDist, window.innerHeight / 2 + initDist, 0.01, 0.01),
    new Planet(1, window.innerWidth / 2 - initDist, window.innerHeight / 2 - initDist, 0.01, -0.01),
    new Planet(1, window.innerWidth / 2 - initDist, window.innerHeight / 2 + initDist, -0.01, -0.01),
    new Planet(1, window.innerWidth / 2 + initDist, window.innerHeight / 2 - initDist, -0.01, 0.01)
  ];

  return planets;
};

function collidePlanets(planets) {
  var i, j;
  for (i = 0; i < planets.length; i ++) {
    for (j = i + 1; j < planets.length; j ++) {
      planets[i].collide(planets[j]);
      planets[j].collide(planets[i]);
    }
  }
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
  fill(100, 0, 0, 3);
  noStroke();
  rect(0, 0, width, height);
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
