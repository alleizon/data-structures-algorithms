import Knight from "./knight.js";

class Board {
  board = this.initBoard();

  static initBoard() {
    this.board = [];
    for (let i = 0; i < 8; i += 1) {
      const row = [];
      this.board.push(row);
      for (let j = 0; j < 8; j += 1) {
        const col = 0;
        row.push(col);
      }
    }
  }

  static logBoard() {
    for (let i = 7; i >= 0; i -= 1) {
      console.log(this.board[i], i);
    }
  }

  static resetBoard() {
    for (let i = 0; i < 8; i += 1) {
      for (let j = 0; j < 8; j += 1) {
        this.board[i][j] = 0;
      }
    }
  }

  static isLegal(x, y) {
    return x >= 0 && x <= 7 && y >= 0 && y <= 7;
  }

  static moveKnight(start, end) {
    const [startX, startY] = start;
    const [targetX, targetY] = end;
    const { moves } = Knight;

    const q = [];
    const startK = new Knight(startX, startY, 0);

    q.push(startK);

    while (q.length) {
      const current = q.shift();

      if (current.x === targetX && current.y === targetY) {
        this.resetBoard();
        return current;
      }

      moves.forEach((move) => {
        const newX = current.x + move[0];
        const newY = current.y + move[1];
        if (
          this.isLegal(newX, newY) &&
          !(this.board[newX][newY] instanceof Knight)
        ) {
          const nextK = new Knight(newX, newY, current.dist + 1, current);
          q.push(nextK);
          this.board[newX][newY] = nextK;
        }
      });
    }
    return new Error("something went wrong");
  }
}

Board.initBoard();

const start = [2, 3];
const end = [5, 5];

const endKnight = Board.moveKnight(start, end);

const path = [];
let knight = endKnight;
while (knight) {
  path.unshift(knight);
  knight = knight.prev;
}
console.log(`You made it in ${endKnight.dist} moves! Here's your path:`);
path.forEach((k) => console.log(`[${k.x}, ${k.y}]`));
