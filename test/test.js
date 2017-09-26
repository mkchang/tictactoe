var Board = require('../board');
var chai = require('chai')
var expect = chai.expect;

describe('Game board', function() {
  var board;
  beforeEach(function() {
    board = new Board(3);
  });

  it('should instantiate a new empty board', function() {
    expect(board.board).to.eql([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
  });

  it('should toggle a piece', function() {
    board.toggleMove(0, 0);
    expect(board.board[0][0]).to.equal('x');
    board.toggleMove(1, 0);
    expect(board.board[1][0]).to.equal('x');
  });

  it('should not overwrite a piece', function() {
    board.toggleMove(1, 0, 0);
    expect(board.board[0][0]).to.equal(1);
    board.toggleMove(2, 0, 0);
    expect(board.board[0][0]).to.equal(1);
  });

  it('should convert a move integer to row and col', function() {

    var {row, col} = board.convertMoveToRowCol(1);
    expect(row).to.equal(0);
    expect(col).to.equal(0);
    var {row, col} = board.convertMoveToRowCol(5);
    expect(row).to.equal(1);
    expect(col).to.equal(1);
    var {row, col} = board.convertMoveToRowCol(7);
    expect(row).to.equal(2);
    expect(col).to.equal(0);
  });

  it('should catch invalid moves', function() {
    expect(board.isValidMove(0, 0)).to.be.true;
    expect(board.isValidMove(2, 2)).to.be.true;
    expect(board.isValidMove(3, 0)).to.be.false;
  });

  it('should catch row victory condition', function() {
    board.toggleMove(0, 0);
    board.toggleMove(0, 1);
    board.toggleMove(0, 2);
    expect(board.isWin(0, 2)).to.be.true;
  });

  it('should catch col victory condition', function() {
    board.toggleMove(0, 1);
    board.toggleMove(1, 1);
    board.toggleMove(2, 1);
    expect(board.isWin(2, 1)).to.be.true;
  });

  it('should catch major diag victory condition', function() {
    board.toggleMove(0, 0);
    board.toggleMove(1, 1);
    board.toggleMove(2, 2);
    expect(board.isWin(2, 2)).to.be.true;
  });

  it('should catch minor diag victory condition', function() {
    board.toggleMove(0, 2);
    board.toggleMove(1, 1);
    board.toggleMove(2, 0);
    expect(board.isWin(2, 0)).to.be.true;
  });

  it('should reset game', function() {
    board.toggleMove(1, 1);
    board.toggleMove(2, 1);
    board.toggleMove(0, 0);
    board.toggleMove(2, 2);
    board.resetGame()
    expect(board.board).to.eql([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
  });

});