var frame;

function setup() {
  createCanvas(screen.width, screen.height);
  frame = 0;
  colorMode(HSB, 100);
  noStroke();
}

function draw() {
  frame += 1;
  fill((frame/10.0) % 100, 80, 80);
  var height = Math.sin(frame/100.0)*200 + 100;
  ellipse(mouseX, mouseY, height, height);
}
