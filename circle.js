var detectMouseCollision,
    mouseX, mouseY,
    frame, ellipseMode, RADIUS,
    drawWhiteCursor,
    createCanvas, screen, colorMode, noStroke, HSB, setup, draw, drawRotatingEllipse, fill, window, ellipse;


function setup() {
  createCanvas(window.screen.width, window.screen.height);
  frame = 0;
  colorMode(HSB, 100);
  noStroke();
  ellipseMode(RADIUS);
}

function draw() {
  frame += 1;
  drawRotatingEllipse(frame, 1440048, 1);
  drawRotatingEllipse(frame, 20000, -1);
  drawWhiteCursor(frame);
}

function drawWhiteCursor(frame) {
  var opacityOscillation = Math.cos(frame/89)*0.5 + 1.5;
  fill(100, 0, 100, opacityOscillation);
  var ellipseRadius = (Math.sin(frame/89)*144 + 233)/5;
  ellipse(mouseX, mouseY, ellipseRadius, ellipseRadius);
}

function drawRotatingEllipse(frame, offset, direction) {
  var saturationOscillation = Math.sin((frame + offset)/21) * 34 + 55;
  var blackOscillation = Math.cos((frame + offset)/89) * 13 + 89;
  fill(((frame + offset)/8.0) % 100, saturationOscillation, blackOscillation, 5);

  var taurusRadius = window.innerWidth / 5;
  var ellipseRadius = (Math.sin((frame + offset)/89)*144 + 233)/2;

  var wobbleAmplitude = Math.sin((frame + offset)/55)*window.innerWidth/13;

  var panRate = -Math.cos((frame + offset)/34)*window.innerWidth / 8;

  var xpos = Math.sin((direction*(frame + offset))/50)*taurusRadius + window.innerWidth / 3 + wobbleAmplitude + panRate;
  var ypos = Math.cos((direction*(frame + offset))/50)*taurusRadius + window.innerHeight / 3 + wobbleAmplitude;

  if(!detectMouseCollision(ellipseRadius, xpos, ypos)) {
    ellipse(xpos, ypos, ellipseRadius, ellipseRadius);
  }
}

function detectMouseCollision(ellipseRadius, xpos, ypos) {
 var xdist = Math.abs(xpos - mouseX);
 var ydist = Math.abs(ypos - mouseY);
 var absdist = Math.sqrt(Math.abs(Math.pow(xdist, 2) + Math.pow(ydist, 2) - Math.pow(ellipseRadius, 2)));
 var colliding = absdist < ellipseRadius;
 return colliding;
}
