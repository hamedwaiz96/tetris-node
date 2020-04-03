const Queue = require('./queue');
const _ = require('lodash');

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
        const self = this;
        this.board = this.createBoard();
        this.boardQueue = this.createQueue();
        this.currentPiece = PIECES[PIECES_MAP[this.randomPiece()]];
        this.nextPiece = this.boardQueue.top();
        this.currentX = 7;
        this.currentY = 0;
        this.currentRotation = 0;
        this.currentLevel = 1;
        this.currentSpeed = 1000;
        this.placeCurrentPiece();
        document.addEventListener("keydown", self.handleEvent.bind(self));
        this.interval = window.setInterval(this.moveDown.bind(self), this.currentSpeed);
    }

    moveLeft() {
        this.removeCurrentPiece();
        if (this.checkNextMove([-1, 0])) {
            this.currentX -= 1;
        }
        this.placeCurrentPiece();
    }

    moveRight() {
        this.removeCurrentPiece();
        if (this.checkNextMove([1, 0])) {
            this.currentX += 1;
        }
        this.placeCurrentPiece();
    }

    moveDown() {
        this.removeCurrentPiece();
        if (this.checkNextMove([0, 1])) {
            this.currentY += 1;
            this.placeCurrentPiece();
        } else {
            this.placeCurrentPiece();
            this.resetToNextPiece();
        }
    }

    rotatePiece() {
        var nextRotation = this.currentRotation + 1
        if (nextRotation == 4) {
            nextRotation = 0;
        }
        this.removeCurrentPiece();
        if (this.checkNextMove([0, 0], this.currentPiece[nextRotation])) {
            this.currentRotation = nextRotation;
            this.placeCurrentPiece();
        } else {
            this.placeCurrentPiece();
        }
    }

    placeCurrentPiece() {
        var currentPiece = this.currentPiece[this.currentRotation]
        for (let i = 0; i <= currentPiece.length - 1; i++) {
            for (let j = 0; j <= currentPiece[i].length - 1; j++) {
                if (currentPiece[i][j] == 1){
                    this.board[this.currentY + i][this.currentX + j] = currentPiece[i][j]
                }
            }
        }
        this.populateBoard();
    }

    removeCurrentPiece() {
        var currentPiece = this.currentPiece[this.currentRotation]
        for (let i = 0; i <= currentPiece.length - 1; i++) {
            for (let j = 0; j <= currentPiece[i].length - 1; j++) {
                if (currentPiece[i][j] == 1) {
                    this.board[this.currentY + i][this.currentX + j] = 0;
                }
            }
        }
        this.populateBoard();
    }

    resetToNextPiece() {
        this.currentX = 7;
        this.currentY = 0;
        this.currentRotation = 0;
        this.currentPiece = this.nextPiece;
        this.boardQueue.dequeue();
        this.boardQueue.enqueue(PIECES[PIECES_MAP[this.randomPiece()]]);
        this.nextPiece = this.boardQueue.top();
        this.placeCurrentPiece();
        this.populateBoard();
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
                if (piece[i][j] == 1 && this.board[nextY + i][nextX + j] == 1) {
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

    nextLevel() {
        const self = this;
        clearInterval(self.interval);
        this.currentLevel += 1
        this.currentSpeed = ((0.8 - ((this.currentLevel - 1) * 0.007))**(this.currentLevel - 1)) * 1000
        window.setInterval(this.moveDown.bind(self), this.currentSpeed);
    }

    populateBoard(board=this.board) {
        var cols = document.getElementsByClassName('tetris-col-p');
        for (let i = 0; i <= board.length - 1; i++) {
            for (let j = 0; j <= board[i].length - 1; j++){
                if (i >= 20 || (j <= 3 || j >= 14)) {
                    continue;
                } else {
                    cols[i*10 + (j-4)].innerHTML = board[i][j]
                }
            }
        }
    }

    handleEvent(e) {
        if (e.code == "ArrowRight") {
            this.moveRight();
        } else if (e.code == "ArrowLeft") {
            this.moveLeft();
        } else if (e.code == "ArrowUp") {
            this.rotatePiece();
        }
    }
}

module.exports = Board;