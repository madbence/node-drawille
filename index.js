var map = [
  [0x1, 0x8],
  [0x2, 0x10],
  [0x4, 0x20],
  [0x40, 0x80]
]

function Canvas(width, height) {
  if(width%2 != 0) {
    throw new Error('Width must be multiple of 2!');
  }
  if(height%4 != 0) {
    throw new Error('Height must be multiple of 4!');
  }
  this.width = width;
  this.height = height;
  this.content = new Buffer(width*height/8);
  this.content.fill(0);
}

Canvas.prototype.set = function set(x, y) {
  if(x < 0 || y < 0 || x >= this.width || y >= this.height) {
    throw new Error('(' + [x, y].join(', ') + ') is out of the canvas!');
  }
  var nx = Math.floor(x/2);
  var ny = Math.floor(y/4);
  var coord = nx + this.width/2*ny;
  var mask = map[y%4][x%2];
  this.content[coord] |= mask;
};

Canvas.prototype.unset = function(x, y) {
  if(x < 0 || y < 0 || x >= this.width || y >= this.height) {
    throw new Error('(' + [x, y].join(', ') + ') is out of the canvas!');
  }
  var nx = Math.floor(x/2);
  var ny = Math.floor(y/4);
  var coord = nx + this.width/2*ny;
  var mask = map[y%4][x%2];
  this.content[coord] &= ~mask;
}

Canvas.prototype.clear = function() {
  this.content.fill(0);
};

Canvas.prototype.frame = function frame() {
  var result = [];
  for(var i = 0, j = 0; i < this.content.length; i++, j++) {
    if(j == this.width/2) {
      result.push('\n');
      j = 0;
    }
    if(this.content[i] == 0) {
      result.push(' ');
    } else {
      result.push(String.fromCharCode(0x2800 + this.content[i]))
    }
  }
  result.push('\n');
  return result.join('');
};

module.exports = Canvas;
