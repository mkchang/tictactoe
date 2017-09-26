var readlineSync = require('readline-sync');
var Board = require('./board');

var board = new Board(3);
var move;

board.showBoard();

while (!board.finished) {
  move = readlineSync.question(`Player ${board.currentPlayer}'s turn. Select the number position to place piece (${board.piece[board.currentPlayer]}):`);
  var {row, col} = board.convertMoveToRowCol(move);
  if (board.isValidMove(row, col)) {
    board.toggleMove(row, col);
    board.showBoard();
    if (board.isWin(row, col)) {
      board.handleWin();
    } else {
      board.changePlayer();
    }
  } else {
    console.log('Invalid move, please enter an interger, from 1-9, for a valid position');
  }
}
