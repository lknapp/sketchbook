var $, donuts, window;

//$( ".lure" ).draggable({ addClasses: true });

var donuts = [
  $(".blue"),
  $(".green"),
  $(".purple"),
  $(".rainbow"),
  $(".red"),
  $(".yellow"),
  ];

var frame = 0;
var incrementFrame = function(){ frame += 1; };

var updatePositions = function(){
  incrementFrame();
  for (var i = 0; i < donuts.length; i ++) {
    var hamp = Math.cos(frame/30 + i*Math.PI/3)*(window.innerWidth-300)/2 + window.innerWidth/2 - 150;
    var vamp = Math.sin(frame/30 + i*Math.PI/3)*(window.innerHeight-168)/2 + window.innerHeight/2 - 84;
    donuts[i].css("left", hamp);
    donuts[i].css("top", vamp);
  }
};

window.setInterval(updatePositions, 50);
