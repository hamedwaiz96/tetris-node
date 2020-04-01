const Queue = require('./queue');

const PIECES = {
    "Line": [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]],
    "Square": [[0, 1, 1, 0], [0, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
    "T": [[0, 1, 0, 0], [1, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
    "RL": [[0, 0, 1, 0], [1, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
    "LL": [[1, 0, 0, 0], [1, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
    "RZ": [[1, 1, 0, 0], [0, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
    "LZ": [[0, 1, 1, 0], [1, 1, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
}

const PIECES_MAP = {
    1: "Line",
    2: "Square",
    3: "T",
    4: "RL",
    5: "LL",
    6: "RZ",
    7: "LZ"
}

class Board {
    constructor() {
        this.board = this.createBoard();
        this.boardQueue = this.createQueue();
        this.currentPiece = PIECES[PIECES_MAP[this.randomPiece()]];
        this.nextPiece = this.boardQueue.top();
        this.currentX = 4;
        this.currentY = 0;
    }

    moveLeft() {

    }

    moveRight() {
        
    }

    moveDown() {
        
    }

    placePiece() {

    }
    
    checkNextMove(move) {
        var nextX = (this.currentX + move[0]);
        var nextY = (this.currentY + move[1]);
        for (let i = 0; i <= this.currentPiece.length - 1; i++) {
            for (let j = 0; j <= this.currentPiece[i].length - 1; j++) {
                if (this.currentPiece[i][j] == 1 && this.board[nextX + i][nextY + j] == 1) {
                    return false;
                }
            }
        }
        return true;
    }

    randomPiece() {
        return Math.floor(Math.random() * Math.floor(7)) + 1;
    }

    createQueue() {
        const queue = new Queue();
        for (let i = 0; i <= 3; i++){
            queue.enqueue(PIECES[PIECES_MAP[this.randomPiece()]])
        }
        return queue;
    }

    createBoard() {
        const BOARD = new Array(21)
        for (let i = 0; i <= BOARD.length - 1; i++) {
            BOARD[i] = new Array(12);
        }
        for (let j = 0; j <= BOARD.length - 1; j++) {
            for (let k = 0; k <= BOARD[0].length - 1; k++) {
                if (j == 20 || (k == 0 || k == 11)) {
                    BOARD[j][k] = 1;
                } else {
                    BOARD[j][k] = 0;
                }
            }
        }
        return BOARD;
    }
}

module.exports = Board;