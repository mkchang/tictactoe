var Board = function(n) {
  
  this.n = n || 3;
  this.board = [];
  for (var i = 0; i < this.n; i++) {
    this.board[i] = [];
    for (var j = 0; j < this.n; j++) {
      this.board[i].push(0)
    }
  }
  this.finished = false;
  this.winner = null;
}

Board.prototype = {
  showBoard: function() {
    for (var i = 0; i < this.n; i++) {
      console.log(this.board[i]);
    }
  },
  toggleMove: function(player, row, col) {
    if (this.board[row][col]) {
      console.log('Not a valid move, please try again');
    } else if (player === 1) {
      this.board[row][col] = 1;
    } else {
      this.board[row][col] = 2;      
    }
  },
  checkWin: function(player) {
    // check if player has won
    var checkRow = function(row) {
      return row.reduce(function(acc, val) {
        return acc + val;
      }) === (3 * player);
    };
    var checkRows = function(board) {
      return board.reduce(function(acc, row) {
        return acc || checkRow(row);
      }, false);
    };

    var checkCol = function(col) {
      return col.reduce(function(acc, val) {
        return acc + val;
      }) === (3 * player);
    };
    var checkCols = function(board) {
      return board.reduce(function(acc, row, index) {
        return acc || checkCol(board.map(function(row) {
          return row[index];
        }))
      }, false);
    };
    var checkDiagonals = function(board) {
      return (
        board.reduce(function(acc, val, index) {
          return acc + val[index];
        }) === (3 * player)
      ) || 
      (
        board.reduce(function(acc, val, index) {
          return acc + val[board.length - 1 - index];
        }) === (3 * player)
      );
    }

    var won = checkRows(this.board) || checkCols(this.board) || checkDiagonals(this.board);
    if (won) {
      this.finished = true;
      this.winner = player;
    }
  },
  resetGame: function() {
    // reset game
  }
};

module.exports = Board;