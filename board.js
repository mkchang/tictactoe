var Board = function(n) {
  
  this.n = n || 3;
  this.board = [];
  this.resetGame();

  this.finished = false;
  this.currentPlayer = 1;
  this.piece = {
    1: 'x',
    2: 'o'
  };
}

Board.prototype = {
  showBoard: function() {
    for (var i = 0; i < this.n; i++) {
      console.log(this.board[i]);
    }
  },
  convertMoveToRowCol: function(move) {
    return {
      row: Math.floor((move - 1) / this.n),
      col: ((move - 1) % this.n)
    };
  },
  isValidMove: function(row, col) {
    return (row <= this.n - 1) && 
      (row >= 0) && 
      (col <= this.n - 1) && 
      (col >= 0) &&
      (typeof this.board[row][col] === 'number');
  },
  toggleMove: function(row, col) {
    this.board[row][col] = this.piece[this.currentPlayer];
  },
  isWin: function(row, col) {
    var playerPiece = this.piece[this.currentPlayer];

    var checkRow = function(row) {
      return this.board[row].every(function(position) {
        return position === playerPiece;
      });
    }.bind(this);

    var checkCol = function(col) {
      var fullCol = this.board.map(function(row) {
        return row[col];
      })
      return fullCol.every(function(position) {
        return position === playerPiece;
      });
    }.bind(this);

    var checkDiagonals = function(row, col) {
      var n = this.n;
      if (row === col || col === n - 1 - row) {
        var majorDiag = this.board.every(function(rowArray, index) {
          return (rowArray[index]) === playerPiece;
        });
        var minorDiag = this.board.every(function(rowArray, index) {
          return (rowArray[n - 1 - index]) === playerPiece;
        });
        return majorDiag || minorDiag;
      } else {
        return false;
      }
    }.bind(this);

    return checkRow(row) || checkCol(col) || checkDiagonals(row, col);
  },
  handleWin: function() {
    this.finished = true;
    console.log(`Game over! Player ${this.currentPlayer} wins!`);
  },
  changePlayer: function() {
    this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
  },
  resetGame: function() {
    for (var i = 0; i < this.n; i++) {
      this.board[i] = [];
      for (var j = 0; j < this.n; j++) {
        this.board[i].push(j + (i * this.n) + 1);
      }
    }
  }
};

module.exports = Board;