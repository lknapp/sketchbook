var colors;

function setup() {
  createCanvas(screen.width, screen.height);
  frame = 0;
  colorMode(HSB, 100);
  colors = [];
  for (var i = 0; i < 30; i ++) {
    colors << 101;
  }
}

function draw() {
  background(0);
  strokeWeight(15);
  noFill();
  centerY = screen.height / 2.0;
  for (var i = 0; i < 30; i ++) {
    offset = i*40 - 600;

    randomN = Math.random();
    if (randomN < 0.03) {
      colors[i] = Math.random()*100;
    } else if (randomN < 0.2) {
      colors[i] = 101;
    }
    if(colors[i] == 101) {
      stroke(100);
    } else {
      stroke(colors[i], 100, 100);
    }
    bezier(0, centerY + offset - mouseY/2, 410 - offset + mouseX, 20 + mouseY, 440 - mouseX, 300 + mouseY, screen.width, centerY - offset + mouseY/2);
  }
}
