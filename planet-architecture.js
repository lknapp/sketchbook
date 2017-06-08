var mod;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  colorMode(HSB, 100);
  ellipseMode(RADIUS);
  background(100, 0, 0);
  planets = makePlanets();
  mod = 1;
}

function draw() {
  collidePlanets(planets);
  mod += 1;

  planets.forEach(function(planet) {
    if (mod%52 == 1) {
      planet.draw();
    }
    planet.advance();
  });

  console.log(mod);
  if (mod%500 == 1) {
    background(100, 0, 0);
  }
}


function makePlanets() {
  initDist = 200;

  planets = [
    new Planet(1, window.innerWidth / 2 + initDist, window.innerHeight / 2 + initDist, 1, 1),
    new Planet(1, window.innerWidth / 2 - initDist, window.innerHeight / 2 - initDist, 1, -1),
    new Planet(1, window.innerWidth / 2 - initDist, window.innerHeight / 2 + initDist, -1, -1),
    new Planet(1, window.innerWidth / 2 + initDist, window.innerHeight / 2 - initDist, -1, 1)
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

