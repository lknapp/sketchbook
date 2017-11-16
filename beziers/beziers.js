
function setup() {
  createCanvas(screen.width, screen.height);
  frame = 0;
  colorMode(HSB, 100);
}

function draw() {
  background(0);
  stroke(100);
  noFill();
  for (var i = 0; i < 200; i += 20) {
    bezier(mouseX-(i/2.0), 40+i, 410, 20, 440, 300, 240-(i/16.0), 300+(i/8.0));
  }
}
