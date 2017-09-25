var Board = require('../board');
var chai = require('chai')
var expect = chai.expect;

describe('Game board', function() {
  beforeEach(function() {
    var board = new Board(3);
  });

  it('should instantiate a new empty board', function() {
    var board = new Board(3);
    expect(board.board).to.eql([[0, 0, 0], [0, 0, 0], [0, 0, 0]]);
  });

  it('should toggle a piece', function() {
    var board = new Board(3);
    board.toggleMove(1, 0, 0);
    expect(board.board[0][0]).to.equal(1);
    board.toggleMove(2, 1, 0);
    expect(board.board[1][0]).to.equal(2);
  });

  it('should not overwrite a piece', function() {
    var board = new Board(3);
    board.toggleMove(1, 0, 0);
    expect(board.board[0][0]).to.equal(1);
    board.toggleMove(2, 0, 0);
    expect(board.board[0][0]).to.equal(1);
  });

});