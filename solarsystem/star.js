function Star(xpos, ypos, vel) {
  this.xpos = xpos;
  this.ypos= ypos;
  this.vel = vel;

  this.advance = function() {
    this.xpos = (this.xpos + this.vel) % width;
    this.ypos = (this.ypos + this.vel) % height;
  };

  this.draw = function() {
    fill(100, 0, 100);
    noStroke();
    ellipse(this.xpos, this.ypos, 1, 1);
  };
  return this;
};
