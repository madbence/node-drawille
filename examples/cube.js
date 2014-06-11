var bresenham = require('bresenham');
var glmatrix = require('gl-matrix');
var mat4 = glmatrix.mat4;
var vec3 = glmatrix.vec3;
var Canvas = require('../');

var c = new Canvas(160, 160);

var points = [[-1,-1,-1],[-1,-1,1],[1,-1,1],[1,-1,-1],[-1,1,-1],[-1,1,1],[1,1,1],[1,1,-1]];
var quads = [[0,1,2,3],[0,4,5,1],[1,5,6,2],[2,6,7,3],[3,7,4,0],[4,7,6,5]];
var cube = quads.map(function(quad) {
  return quad.map(function(v) {
    return vec3.fromValues.apply(null, points[v]);
  });
});

var projection = mat4.create();
mat4.perspective(projection, Math.PI/2, 1, 1, 100);

function draw() {
  var now = Date.now();
  var modelView = mat4.create();
  mat4.lookAt(modelView,
              vec3.fromValues(0, 5, -10),
              vec3.fromValues(0, 0, 0),
              vec3.fromValues(0, 1, 0));
  mat4.rotateY(modelView, modelView, Math.PI*2*now/10000);
  c.clear();
  var transformed = cube.map(function(quad) {
    return quad.map(function(v) {
      var m = mat4.create();
      var out = vec3.create();
      mat4.mul(m, projection, modelView);
      vec3.transformMat4(out, v, m);
      return {
        x: Math.floor(out[0]*40+80),
        y: Math.floor(out[1]*40+80)
      };
    });
  });
  transformed.forEach(function(quad) {
    quad.forEach(function(v, i) {
      var n = quad[(+i+1)%4];
      bresenham(v.x, v.y, n.x, n.y, c.set.bind(c));
    });
  });
  process.stdout.write(c.frame());
}

setInterval(draw, 1000/24);
