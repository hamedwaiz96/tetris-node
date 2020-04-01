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

const PIECES_CONNECTIONS = {
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
        this.currentX = 3;
        this.currentY = 0;
    }

    moveLeft() {

    }

    moveRight() {
        
    }
    
    checkNextMove(move) {

    }

    randomPiece() {
        return Math.floor(Math.random() * Math.floor(7)) + 1;
    }

    createQueue() {
        const queue = new Queue();
        for (let i = 0; i <= 3; i++){
            queue.enqueue(PIECES[PIECES_CONNECTIONS[this.randomPiece()]])
        }
        return queue;
    }

    createBoard() {
        const BOARD = new Array(20)
        for (let i = 0; i <= BOARD.length - 1; i++) {
            BOARD[i] = new Array(10);
        }
        for (let j = 0; j <= BOARD.length - 1; j++) {
            for (let k = 0; k <= BOARD[0].length - 1; k++) {
                BOARD[j][k] = 0;
            }
        }
        return BOARD;
    }
}

module.exports = Board;