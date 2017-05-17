var frame;

function setup() {
  createCanvas(screen.width, screen.height);
  frame = 0;
  colorMode(HSB, 100);
  noStroke();
}

function draw() {
  frame += 1;
  var saturationOscillation = Math.sin(frame/21) * 34 + 55;
  var blackOscillation = Math.cos(frame/89) * 13 + 89;
  fill((frame/8.0) % 100, saturationOscillation, blackOscillation);

  var taurusRadius = screen.width / 5;
  var ellipseRadius = Math.sin(frame/89)*144 + 233;

  var wobbleAmplitude = Math.sin(frame/55)*screen.width/13;

  var panRate = -Math.cos(frame/34)*screen.width / 8;

  var xpos = Math.sin(frame/50)*taurusRadius + screen.width / 3 + wobbleAmplitude + panRate;
  var ypos = Math.cos(frame/50)*taurusRadius + screen.width / 3 + wobbleAmplitude;

  ellipse(xpos, ypos, ellipseRadius, ellipseRadius);
}
