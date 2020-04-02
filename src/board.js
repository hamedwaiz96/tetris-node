const Queue = require('./queue');

const PIECES = {
    "Line": {
        0: [
            [0, 0, 0, 0], 
            [1, 1, 1, 1], 
            [0, 0, 0, 0], 
            [0, 0, 0, 0]
        ],
        1: [
            [0, 0, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 1, 0]
        ],
        2: [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [1, 1, 1, 1],
            [0, 0, 0, 0]
        ],
        3: [
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0]
        ]
    },
    "Square": {
        0: [
            [0, 1, 1, 0], 
            [0, 1, 1, 0], 
            [0, 0, 0, 0], 
            [0, 0, 0, 0]
        ],
        1: [
            [0, 1, 1, 0], 
            [0, 1, 1, 0], 
            [0, 0, 0, 0], 
            [0, 0, 0, 0]
        ],
        2: [
            [0, 1, 1, 0], 
            [0, 1, 1, 0], 
            [0, 0, 0, 0], 
            [0, 0, 0, 0]
        ],
        3: [
            [0, 1, 1, 0], 
            [0, 1, 1, 0], 
            [0, 0, 0, 0], 
            [0, 0, 0, 0]
        ]
    },
    "T": {
        0: [
            [0, 1, 0, 0], 
            [1, 1, 1, 0], 
            [0, 0, 0, 0], 
            [0, 0, 0, 0]
        ],
        1: [
            [0, 1, 0, 0],
            [0, 1, 1, 0],
            [0, 1, 0, 0],
            [0, 0, 0, 0]
        ],
        2: [
            [0, 0, 0, 0],
            [1, 1, 1, 0],
            [0, 1, 0, 0],
            [0, 0, 0, 0]
        ],
        3: [
            [0, 1, 0, 0],
            [1, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 0, 0]
        ]
    },
    "RL": {
        0: [
            [0, 0, 1, 0], 
            [1, 1, 1, 0], 
            [0, 0, 0, 0], 
            [0, 0, 0, 0]
        ],
        1: [
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0]
        ],
        2: [
            [0, 0, 0, 0],
            [1, 1, 1, 0],
            [1, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        3: [
            [1, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 0, 0]
        ]
    },
    "LL": {
        0: [
            [1, 0, 0, 0], 
            [1, 1, 1, 0], 
            [0, 0, 0, 0], 
            [0, 0, 0, 0]
        ],
        1: [
            [0, 1, 1, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 0, 0]
        ],
        2: [
            [0, 0, 0, 0],
            [1, 1, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 0]
        ],
        3: [
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [1, 1, 0, 0],
            [0, 0, 0, 0]
        ]
    },
    "RZ": {
        0: [
            [1, 1, 0, 0], 
            [0, 1, 1, 0], 
            [0, 0, 0, 0], 
            [0, 0, 0, 0]
        ],
        1: [
            [0, 0, 1, 0],
            [0, 1, 1, 0],
            [0, 1, 0, 0],
            [0, 0, 0, 0]
        ],
        2: [
            [0, 0, 0, 0],
            [1, 1, 0, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0]
        ],
        3: [
            [0, 1, 0, 0],
            [1, 1, 0, 0],
            [1, 0, 0, 0],
            [0, 0, 0, 0]
        ]
    },
    "LZ": {
        0: [
            [0, 1, 1, 0], 
            [1, 1, 0, 0], 
            [0, 0, 0, 0], 
            [0, 0, 0, 0]
        ],
        1: [
            [0, 1, 0, 0],
            [0, 1, 1, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 0]
        ],
        2: [
            [0, 0, 0, 0],
            [0, 1, 1, 0],
            [1, 1, 0, 0],
            [0, 0, 0, 0]
        ],
        3: [
            [1, 0, 0, 0],
            [1, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 0, 0]
        ]
    }
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
        this.currentX = 7;
        this.currentY = 0;
        this.currentRotation = 0;
    }

    moveLeft() {

    }

    moveRight() {
        
    }

    moveDown() {

    }

    rotatePiece() {
        var nextRotation = this.currentRotation + 1
        if (nextRotation == 4) {
            nextRotation = 0;
        }
        if (checkNextMove([0, 0], this.currentPiece[nextRotation])) {
            this.currentRotation = nextRotation;
            placeCurrentPiece()
        }
    }

    placeCurrentPiece() {
        var currentPiece = this.currentPiece[this.currentRotation]
        for (let i = 0; i <= currentPiece.length - 1; i++) {
            for (let j = 0; j <= currentPiece[i].length - 1; j++) {
                this.board[this.currentX + i][this.currentY + j] = currentPiece[i][j]
            }
        }
        resetToNextPiece();
    }

    resetToNextPiece() {
        this.currentX = 7;
        this.currentY = 0;
        this.currentRotation = 0;
        this.currentPiece = this.nextPiece;
        this.boardQueue.dequeue();
        this.boardQueue.enqueue(PIECES[PIECES_MAP[this.randomPiece()]]);
        this.nextPiece = this.boardQueue.top();
    }
    
    checkNextMove(move, piece=this.currentPiece[this.currentRotation]) {
        /* move argument is an array of two numbers where first index is amount of horizontal space you want to move
        and second index is amount of vertical space you want to move. Example [1, 0] would mean moving one to the right
        and no vertical movement.
        */
        var nextX = (this.currentX + move[0]);
        var nextY = (this.currentY + move[1]);
        for (let i = 0; i <= piece.length - 1; i++) {
            for (let j = 0; j <= piece[i].length - 1; j++) {
                if (this.piece[i][j] == 1 && this.board[nextX + i][nextY + j] == 1) {
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
        /* Standard tetris board is 10 across and 20 down, reason why we are doing 18x24 here is because
        we want to specify horizontal and vertical borders for when player tries to move outside borders.
        */
        const BOARD = new Array(24)
        for (let i = 0; i <= BOARD.length - 1; i++) {
            BOARD[i] = new Array(18);
        }
        for (let j = 0; j <= BOARD.length - 1; j++) {
            for (let k = 0; k <= BOARD[0].length - 1; k++) {
                if (j >= 20 || (k <= 3 || k >= 14)) {
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