var frame;
var pg;

function setup() {
  createCanvas(screen.width, screen.height, WEBGL);
  pg = createGraphics(200, 200);
  frame = 0;
  pg.colorMode(HSB, 100);
}

function draw() {
  frame += 1;
  pg.background(frame % 100, 100, 100);
  pg.rect(10, 10, 180, 180);
  pg.noStroke();
  rotateX(radians(frame));
  rotateY(radians(frame*2/3));
  translate(sin(frame / 100) * 100, cos(frame / 100)*100, 0);
  var dirY = (mouseY / height - 0.5) *2;
  var dirX = (mouseX / width - 0.5) *2;
  ambientMaterial(250);
  texture(pg);
  box(100);
}
