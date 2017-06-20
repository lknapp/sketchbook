var pod, centralDistance;

function setup() {
  createCanvas(screen.width, screen.height, WEBGL);
  frame = 0;
  colorMode(HSB, 100);
  pod = new Pod();
}

function draw() {
  frame += 1;
  background(100, 0, 0);
  translate(-100, -100, centralDistance);
  rotateX(radians(mouseX + frame / 13));
  rotateY(radians(mouseY + frame / 13));

  pod.draw(frame);
}

function Pod() {
  this.pg = createGraphics(200, 200);
  this.pg.colorMode(HSB, 100);
  this.pg.background(100, 0, 100);
  this.pg.noStroke();
  this.seed = Math.random() * 1000;

  this.draw = function(frame) {
    this.pg.fill(0);
    this.pg.rect(10, 10, 180, 180);
    this.pg.fill(100);
    this.pg.ellipseMode(CENTER);
    this.pg.ellipse(100, 100, 150, 150);
    ambientMaterial(250);
    texture(this.pg);
    box(200);
  }

  return this;
}
