var map = [
  [0x1, 0x8],
  [0x2, 0x10],
  [0x4, 0x20],
  [0x40, 0x80]
]

function Canvas(width, height) {
  if (width == null) {
    width = process.stdout.columns * 2 - 2;
  }
  if (height == null) {
    height = process.stdout.rows * 4;
  }

  this.width = width;
  this.height = height;
}

Object.defineProperties(Canvas.prototype, {
  width: {
    get: function () {
      return this._width || 0;
    },
    set: function (width) {
      width = Math.floor(width / 2) * 2;
      this._width = width;
      this.content = Buffer.alloc(this.width*this.height/8);
      this.content.fill(0);
    }
  },
  height: {
    get: function () {
      return this._height || 0;
    },
    set: function (height) {
      height = Math.floor(height / 4) * 4;
      this._height = height;
      this.content = Buffer.alloc(this.width*this.height/8);
      this.content.fill(0);
    }
  }
});

var methods = {
  set: function(coord, mask) {
    this.content[coord] |= mask;
  },
  unset: function(coord, mask) {
    this.content[coord] &= ~mask;
  },
  toggle: function(coord, mask) {
    this.content[coord] ^= mask;
  }
};

Object.keys(methods).forEach(function(method) {
  Canvas.prototype[method] = function(x, y) {
    if(!(x >= 0 && x < this.width && y >= 0 && y < this.height)) {
      return;
    }
    x = Math.floor(x);
    y = Math.floor(y);
    var nx = Math.floor(x/2);
    var ny = Math.floor(y/4);
    var coord = nx + this.width/2*ny;
    var mask = map[y%4][x%2];
    methods[method].call(this, coord, mask);
  }
});

Canvas.prototype.clear = function() {
  this.content.fill(0);
};

Canvas.prototype.frame = function frame(delimiter) {
  if (delimiter == null) {
    delimiter = '\n';
  }
  var result = [];
  for(var i = 0, j = 0; i < this.content.length; i++, j++) {
    if(j == this.width/2) {
      result.push(delimiter);
      j = 0;
    }
    if(this.content[i] == 0) {
      result.push(' ');
    } else {
      result.push(String.fromCharCode(0x2800 + this.content[i]))
    }
  }
  result.push(delimiter);
  return result.join('');
};

module.exports = Canvas;
