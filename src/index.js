const Board = require('./board');

var board = new Board();

console.log(board.randomPiece());
console.log(board.boardQueue.printQueue());