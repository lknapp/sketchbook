var frame;

function setup() {
  createCanvas(screen.width, screen.height);
  frame = 0;
  colorMode(HSB, 100);
  noStroke();
}

function draw() {
  frame += 1;
  drawRotatingEllipse(1440048, 1);
  drawRotatingEllipse(8039, 1);
  drawRotatingEllipse(13, -1);
  drawRotatingEllipse(20000, -1);
}

function drawRotatingEllipse(offset, direction) {
  var saturationOscillation = Math.sin((frame + offset)/21) * 34 + 55;
  var blackOscillation = Math.cos((frame + offset)/89) * 13 + 89;
  fill(((frame + offset)/8.0) % 100, saturationOscillation, blackOscillation, 5);

  var taurusRadius = window.innerWidth / 5;
  var ellipseRadius = Math.sin((frame + offset)/89)*144 + 233;

  var wobbleAmplitude = Math.sin((frame + offset)/55)*window.innerWidth/13;

  var panRate = -Math.cos((frame + offset)/34)*window.innerWidth / 8;

  var xpos = Math.sin((direction*(frame + offset))/50)*taurusRadius + window.innerWidth / 3 + wobbleAmplitude + panRate;
  var ypos = Math.cos((direction*(frame + offset))/50)*taurusRadius + window.innerHeight / 3 + wobbleAmplitude;

  ellipse(xpos, ypos, ellipseRadius, ellipseRadius);
}


