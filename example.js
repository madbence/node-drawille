var Canvas = require('./');

var c = new Canvas(160, 20);

var i = 0;
function draw() {
  c.set(i%160, Math.floor(Math.sin(i/5)*10+10));
  c.unset((i-40+160)%160, Math.floor(Math.sin((i-40)/5)*10+10));
  i++;
  setTimeout(draw, 10);
  console.log(c.frame());
}

draw();
