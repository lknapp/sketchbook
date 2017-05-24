var pods, centralDistance;

function setup() {
  createCanvas(screen.width, screen.height, WEBGL);
  frame = 0;
  colorMode(HSB, 100);
  pods = [new Pod(), new Pod(), new Pod(), new Pod(), new Pod(), new Pod()];
  centralDistance = 250;
}

function draw() {
  frame += 1;
  background(100, 0, 0);
  rotateX(radians(mouseX + frame / 13));
  rotateY(radians(mouseY + frame / 13));

  translate(centralDistance + 50*cos(frame / 13), 0, 0);
  pods[0].draw(frame);
  translate(-centralDistance - 50*cos(frame / 13), 0, 0);

  translate(0, centralDistance - 50*cos(frame / 13), 0);
  pods[1].draw(frame);
  translate(0, -centralDistance + 50*cos(frame / 13), 0);

  translate(0, 0, centralDistance);
  rotateZ(radians(frame))
  pods[2].draw(frame);
  rotateZ(-radians(frame))
  translate(0, 0, -centralDistance);

  translate(-centralDistance - 50*cos(frame / 13), 0, 0);
  pods[3].draw(frame);
  translate(centralDistance + 50*cos(frame / 13), 0, 0);

  translate(0, - centralDistance + 50*cos(frame / 13), 0);
  pods[4].draw(frame);
  translate(0, centralDistance - 50*cos(frame / 13), 0);

  translate(0, 0, -centralDistance);
  rotateZ(-radians(frame))
  pods[5].draw(frame);
  rotateZ(-radians(frame))
  translate(0, 0, centralDistance);
}

function Pod() {
  this.pg = createGraphics(200, 200);
  this.pg.colorMode(HSB, 100);
  this.pg.background(100, 0, 0);
  this.pg.noStroke();
  this.seed = Math.random() * 1000;

  this.draw = function(frame) {
    this.pg.fill((frame / 5 + this.seed) % 100, 70, 90);
    this.pg.rect(10, 10, 180, 180);
    ambientMaterial(250);
    texture(this.pg);
    box(200);
  }

  return this;
}
