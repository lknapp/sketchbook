var detectMouseCollision,
    mouseX, mouseY, mouseIsPressed, clickOn, rect, drawStars, Planet,
    ellipseMode, RADIUS, planetThree, drawBackground, Star,
    drawWhiteCursor, initDist, height, width, makeStars, stars,
    createCanvas, screen, colorMode, noStroke, HSB, setup, draw, drawRotatingEllipse, fill, window, ellipse, Planet, planetOne, planetTwo;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  colorMode(HSB, 100);
  ellipseMode(RADIUS);
  background(100, 0, 0);

  planets = makePlanets();
  stars = makeStars(8);
}

function draw() {
  drawBackground();
  collidePlanets(planets);

  stars.forEach(function(star) {
    star.draw();
    star.advance();
  });

  planets.forEach(function(planet) {
    planet.draw();
    planet.advance();
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
};

function makeStars(quantity) {
  var starArray = [];
  var i;
  for (i = 0; i < quantity; i ++) {
    starArray.push(new Star(width * Math.random(), height * Math.random(), 3));
  }
  return starArray;
};

function drawBackground() {
  fill(100, 0, 0, 3);
  noStroke();
  rect(0, 0, width, height);
};
