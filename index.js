const map = [
  [0x1, 0x8],
  [0x2, 0x10],
  [0x4, 0x20],
  [0x40, 0x80]
];

class Canvas {
  constructor(width, height) {
    this.width = width || process.stdout.columns * 2 - 2;
    this.height = height || process.stdout.rows * 4;
  }

  get width() {
    return this._width || 0;
  }
  set width(width) {
    this._width = Math.floor(width / 2) * 2;
    this.content = Buffer.alloc((this.width * this.height) / 8);
    this.clear();
  }

  get height() {
    return this._height || 0;
  }
  set height(height) {
    this._height = Math.floor(height / 4) * 4;
    this.content = Buffer.alloc((this.width * this.height) / 8);
    this.clear();
  }

  clear() {
    this.content.fill(0);
  }

  frame(delimiter = '\n') {
    const frameWidth = this.width / 2;
    const result = this.content.reduce((acc, cur, i) => {
      if (i % frameWidth === 0) {
        acc.push(delimiter);
      }
      acc.push(cur ? String.fromCharCode(0x2800 + cur) : ' ');
      return acc;
    }, []);
    result.push(delimiter);
    return result.join('');
  }
}

const methods = {
  set(coord, mask) {
    this.content[coord] |= mask;
  },
  unset(coord, mask) {
    this.content[coord] &= ~mask;
  },
  toggle(coord, mask) {
    this.content[coord] ^= mask;
  }
};

Object.keys(methods).forEach((method) => {
  Canvas.prototype[method] = function(x, y) {
    if (!(x >= 0 && x < this.width && y >= 0 && y < this.height)) {
      return;
    }
    x = Math.floor(x);
    y = Math.floor(y);
    const nx = Math.floor(x / 2);
    const ny = Math.floor(y / 4);
    const coord = nx + (this.width / 2) * ny;
    const mask = map[y % 4][x % 2];
    methods[method].call(this, coord, mask);
  };
});

module.exports = Canvas;
