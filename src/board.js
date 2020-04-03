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

const COLOR_MAP = {
    1: "#30D1F1",
    2: "#F1D70A",
    3: "#AF00E9",
    4: "#F38F0E",
    5: "#1459E9",
    6: "#E9000A",
    7: "#3DFF2D"
}

class Board {
    constructor() {
        const self = this;
        this.fails = 0;
        this.board = this.createBoard();
        this.boardQueue = this.createQueue();
        this.currentPieceNumber = this.randomPiece();
        this.currentPiece = PIECES[PIECES_MAP[this.currentPieceNumber]];
        this.nextPiece = this.boardQueue.top()[0]
        this.nextPieceNumber = this.boardQueue.top()[1];
        this.currentX = 7;
        this.currentY = 0;
        this.currentRotation = 0;
        this.currentLevel = 1;
        this.currentSpeed = 1000;
        this.bottomY = 18;
        this.topofPiece = this.findTopofPiece();
        this.bottomofPiece = this.findBottomofPiece();
        this.score = 0;
        this.levelGoal = this.currentLevel*5;
        this.placeCurrentPiece();
        document.addEventListener("keydown", self.handleEvent.bind(self));
        document.getElementsByClassName('score')[0].innerHTML = this.score;
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
        if (this.fails >= 1) {
            this.gameOver();
        } else {
            this.removeCurrentPiece();
            if (this.checkNextMove([0, 1])) {
                this.currentY += 1;
                this.placeCurrentPiece();
            } else {
                this.placeCurrentPiece();
                this.resetToNextPiece();
            }
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

    placeCurrentPiece(end=false) {
        this.bottomY = this.checkBottomMove();
        var currentPiece = this.currentPiece[this.currentRotation]
        for (let i = 0; i <= currentPiece.length - 1; i++) {
            for (let j = 0; j <= currentPiece[i].length - 1; j++) {
                if (currentPiece[i][j] == 1){
                    this.board[this.currentY + i][this.currentX + j] = [currentPiece[i][j], COLOR_MAP[this.currentPieceNumber]]
                }
            }
        }
        this.populateBoard();
        this.drawGhostPiece();
    }

    removeCurrentPiece() {
        var currentPiece = this.currentPiece[this.currentRotation]
        for (let i = 0; i <= currentPiece.length - 1; i++) {
            for (let j = 0; j <= currentPiece[i].length - 1; j++) {
                if (currentPiece[i][j] == 1) {
                    this.board[this.currentY + i][this.currentX + j] = [0, "White"];
                }
            }
        }
        this.populateBoard();
    }

    resetToNextPiece() {
        if (this.currentY == 0) {
            this.fails += 1;
        } else {
            this.fails = 0;
        }
        this.clearLines()
        this.currentX = 7;
        this.currentY = 0;
        this.currentRotation = 0;
        this.currentPiece = this.nextPiece;
        this.currentPieceNumber = this.nextPieceNumber;
        this.boardQueue.dequeue();
        var lastPieceNumber = this.randomPiece();
        this.boardQueue.enqueue([PIECES[PIECES_MAP[lastPieceNumber]], lastPieceNumber]);
        this.drawQueue();
        this.nextPiece = this.boardQueue.top()[0];
        this.nextPieceNumber = this.boardQueue.top()[1];
        this.topofPiece = this.findTopofPiece();
        this.bottomofPiece = this.findBottomofPiece();
        this.placeCurrentPiece(true);
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
                if (piece[i][j] == 1 && this.board[nextY + i][nextX + j][0] == 1) {
                    return false;
                }
            }
        }
        return true;
    }

    checkBottomMove() {
        for (let i = 1; i <= 20; i++) {
            if (this.checkNextMove([0, i])) {
                continue
            } else {
                return (i-1)+this.currentY;
            }
        }
    }

    randomPiece() {
        return Math.floor(Math.random() * Math.floor(7)) + 1;
    }

    createQueue() {
        const queue = new Queue();
        var queueDOM = document.getElementsByClassName('next-img');
        for (let i = 0; i <= 3; i++){
            var pieceNumber = this.randomPiece();
            var imageSrc = "/public/images/" + PIECES_MAP[pieceNumber] + ".png";
            queue.enqueue([PIECES[PIECES_MAP[pieceNumber]], pieceNumber])
            queueDOM[3-i].src = imageSrc;
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
                    BOARD[j][k] = [1, "White"];
                } else {
                    BOARD[j][k] = [0, "White"];
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
        this.levelGoal = this.currentLevel*5;
        window.setInterval(this.moveDown.bind(self), this.currentSpeed);
    }

    populateBoard(board=this.board) {
        var cols = document.getElementsByClassName('tetris-col-p');
        for (let i = 0; i <= board.length - 1; i++) {
            for (let j = 0; j <= board[i].length - 1; j++){
                if (i >= 20 || (j <= 3 || j >= 14)) {
                    continue;
                } else {
                    var currentIndex = (i*10) + (j-4)
                    cols[currentIndex].style.backgroundColor = board[i][j][1];
                    cols[currentIndex].style.opacity = "1";
                }
            }
        }
    }

    drawGhostPiece() {
        var cols = document.getElementsByClassName('tetris-col-p');
        var piece = this.currentPiece[this.currentRotation];
        for (let i = 0; i <= piece.length - 1; i++) {
            for (let j = 0; j <= piece[i].length - 1; j++) {
                if (piece[i][j] == 1) {
                    var bottomIndex = (this.bottomY+i)*10 + (this.currentX+j - 4);
                    cols[bottomIndex].style.backgroundColor = COLOR_MAP[this.currentPieceNumber];
                    cols[bottomIndex].style.opacity = "0.6";
                }
            }
        }
    }

    lineClearIndices() {
        const lines = [];
        var isCleared = false;
        for (let i = 0; i <= this.board.length - 1 - 4; i++) {
            for (let j = 4; j <= this.board[i].length - 1 - 4; j++) {
                if (this.board[i][j][0] == 0) {
                    isCleared = false;
                    break;
                }
                isCleared = true;
            }
            if (isCleared) {
                lines.push(i);
            }
        }
        return lines;
    }

    clearLines() {
        const linesToClear = this.lineClearIndices();
        var newLine = [];
        for (let j = 0; j <= this.board.length - 1 - 4; j++) {
            newLine.push([0, "White"]);
        }
        for (let k = 0; k <= linesToClear.length - 1; k++) {
            this.board[linesToClear[k]] = newLine;
        }
    }

    drawQueue() {
        const queueDOM = document.getElementsByClassName('next-img');
        for (let i = 0; i <= this.boardQueue.length - 1; i++) {
            console.log(this.boardQueue.queue[i][1])
            var imageSrc = "/public/images/" + PIECES_MAP[this.boardQueue.queue[i][1]] + ".png";
            queueDOM[3-i].src = imageSrc;
        }
    }

    handleEvent(e) {
        console.log(e.code)
        if (e.code == "ArrowRight") {
            this.moveRight();
        } else if (e.code == "ArrowLeft") {
            this.moveLeft();
        } else if (e.code == "ArrowUp") {
            this.rotatePiece();
        } else if (e.code == "ArrowDown") {
            this.moveDown();
        } else if (e.code == "Space") {
            this.hardDropPiece();
        }
    }

    hardDropPiece() {
        this.removeCurrentPiece();
        this.currentY = this.bottomY;
        this.placeCurrentPiece();
        this.resetToNextPiece();
    }

    gameOver() {
        clearInterval(this.interval);
        alert("Game Over!");
    }

    findTopofPiece() {
        var piece = this.currentPiece[this.currentRotation]
        for (let i = 0; i <= piece.length - 1; i++) {
            for (let j = 0; j <= piece[i].length - 1; j++) {
                if (piece[i][j] == 1) {
                    return i;
                }
            }
        }
    }

    findBottomofPiece() {
        var piece = this.currentPiece[this.currentRotation];
        for (let i = this.topofPiece; i <= piece.length - 1; i++) {
            if ((piece[i][0] == 0 && piece[i][1] == 0) && (piece[i][2] == 0 && piece[i][3] == 0)) {
                return (i-1)
            }
        }
        return 3;
    }
}

module.exports = Board;