class Knight {
  static moves = [
    // legal moves

    [1, 2], // 1 right 2 up
    [-1, 2], // 1 left 2 up
    [2, 1], // 2 right 1 up
    [2, -1], // 2 right 1 down
    [1, -2], // 1 right 2 down
    [-1, -2], // 1 left 2 down
    [-2, 1], // 2 left 1 up
    [-2, -1], // 2 left 1 down
  ];

  constructor(x = 0, y = 0, dist = 0, prev = null) {
    this.x = x;
    this.y = y;
    this.dist = dist;
    this.prev = prev;
  }

  updateCoords([x, y]) {
    this.x = x;
    this.y = y;
  }
}

export default Knight;
