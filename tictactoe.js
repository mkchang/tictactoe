
module.exports.Board = function(n) {
  this.board = [];
  var row;
  for (var i = 0; i < n; i++) {
    row = [];
    for (var j = 0; j < n; j++) {
      row.push([])
    }
    board.push(row);
  }
}

module.exports.Board.prototype = {
  showBoard: function() {
    //show current board status
  },
  toggleMove: function(player, row, col) {
    // toggle a piece for player at given row and col
  },
  checkWin: function(player) {
    // check if player has won
    // return bool
  },
  resetGame: function() {
    // reset game
  }
};
