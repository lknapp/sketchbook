
function Planet(direction, xpos, ypos, xvel, yvel) {
  this.seed = Math.floor(Math.random() * 1000000);
  this.xpos = xpos;
  this.ypos = ypos;
  this.xvel = xvel;
  this.yvel = yvel;
  this.direction = direction;
  this.taurusRadius = window.innerWidth / 5;

  this.advance = function() {
    this.seed += 1;
    this.radius = (Math.sin((this.seed)/144)*144 + 233)/3;

    this.xaccel = -(this.xpos - window.innerWidth/2) / (window.innerWidth*5) - Math.cos(this.direction*this.seed/50)/89;
    this.yaccel = -(this.ypos - window.innerHeight/2) / (window.innerHeight*5) - Math.sin(this.direction*this.seed/50)/89;

    this.xvel = this.xvel + this.xaccel;
    this.yvel = this.yvel + this.yaccel;

    this.xpos = this.xpos + this.xvel;
    this.ypos = this.ypos + this.yvel;
  };

  this.draw = function() {
    strokeWeight(0.5);
    stroke(100, 0, 100);
    noFill();
    ellipse(this.xpos, this.ypos, this.radius, this.radius);
  };

  this.collide = function(planet) {
    var xdist = Math.abs(this.xpos - planet.xpos);
    var ydist = Math.abs(this.ypos - planet.ypos);
    var absdist = Math.sqrt(Math.abs(Math.pow(xdist, 2) + Math.pow(ydist, 2)));
    var colliding = absdist < this.radius + planet.radius;
    if(colliding){
      this.xvel = this.xvel * -1;
      this.yvel = this.yvel * -1;
      this.xaccel = this.accel * -1;
      this.yaccel = this.accel * -1;
      ellipse(this.xpos, this.ypos, this.radius, this.radius);
    }
  };

  return this;
};
