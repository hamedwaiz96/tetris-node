const Queue = require('./queue');
const _ = require('lodash');

const PIECES = {
    "Line": {
        0: [
            ["White", "White", "White", "White"], 
            ["#30D1F1", "#30D1F1", "#30D1F1", "#30D1F1"], 
            ["White", "White", "White", "White"], 
            ["White", "White", "White", "White"]
        ],
        1: [
            ["White", "White", "#30D1F1", "White"],
            ["White", "White", "#30D1F1", "White"],
            ["White", "White", "#30D1F1", "White"],
            ["White", "White", "#30D1F1", "White"]
        ],
        2: [
            ["White", "White", "White", "White"],
            ["White", "White", "White", "White"],
            ["#30D1F1", "#30D1F1", "#30D1F1", "#30D1F1"],
            ["White", "White", "White", "White"]
        ],
        3: [
            ["White", "#30D1F1", "White", "White"],
            ["White", "#30D1F1", "White", "White"],
            ["White", "#30D1F1", "White", "White"],
            ["White", "#30D1F1", "White", "White"]
        ]
    },
    "Square": {
        0: [
            ["White", "#F1D70A", "#F1D70A", "White"], 
            ["White", "#F1D70A", "#F1D70A", "White"], 
            ["White", "White", "White", "White"], 
            ["White", "White", "White", "White"]
        ],
        1: [
            ["White", "#F1D70A", "#F1D70A", "White"], 
            ["White", "#F1D70A", "#F1D70A", "White"], 
            ["White", "White", "White", "White"], 
            ["White", "White", "White", "White"]
        ],
        2: [
            ["White", "#F1D70A", "#F1D70A", "White"], 
            ["White", "#F1D70A", "#F1D70A", "White"], 
            ["White", "White", "White", "White"], 
            ["White", "White", "White", "White"]
        ],
        3: [
            ["White", "#F1D70A", "#F1D70A", "White"], 
            ["White", "#F1D70A", "#F1D70A", "White"], 
            ["White", "White", "White", "White"], 
            ["White", "White", "White", "White"]
        ]
    },
    "T": {
        0: [
            ["White", "#AF00E9", "White", "White"], 
            ["#AF00E9", "#AF00E9", "#AF00E9", "White"], 
            ["White", "White", "White", "White"], 
            ["White", "White", "White", "White"]
        ],
        1: [
            ["White", "#AF00E9", "White", "White"],
            ["White", "#AF00E9", "#AF00E9", "White"],
            ["White", "#AF00E9", "White", "White"],
            ["White", "White", "White", "White"]
        ],
        2: [
            ["White", "White", "White", "White"],
            ["#AF00E9", "#AF00E9", "#AF00E9", "White"],
            ["White", "#AF00E9", "White", "White"],
            ["White", "White", "White", "White"]
        ],
        3: [
            ["White", "#AF00E9", "White", "White"],
            ["#AF00E9", "#AF00E9", "White", "White"],
            ["White", "#AF00E9", "White", "White"],
            ["White", "White", "White", "White"]
        ]
    },
    "RL": {
        0: [
            ["White", "White", "#F38F0E", "White"], 
            ["#F38F0E", "#F38F0E", "#F38F0E", "White"], 
            ["White", "White", "White", "White"], 
            ["White", "White", "White", "White"]
        ],
        1: [
            ["White", "#F38F0E", "White", "White"],
            ["White", "#F38F0E", "White", "White"],
            ["White", "#F38F0E", "#F38F0E", "White"],
            ["White", "White", "White", "White"]
        ],
        2: [
            ["White", "White", "White", "White"],
            ["#F38F0E", "#F38F0E", "#F38F0E", "White"],
            ["#F38F0E", "White", "White", "White"],
            ["White", "White", "White", "White"]
        ],
        3: [
            ["#F38F0E", "#F38F0E", "White", "White"],
            ["White", "#F38F0E", "White", "White"],
            ["White", "#F38F0E", "White", "White"],
            ["White", "White", "White", "White"]
        ]
    },
    "LL": {
        0: [
            ["#1459E9", "White", "White", "White"], 
            ["#1459E9", "#1459E9", "#1459E9", "White"], 
            ["White", "White", "White", "White"], 
            ["White", "White", "White", "White"]
        ],
        1: [
            ["White", "#1459E9", "#1459E9", "White"],
            ["White", "#1459E9", "White", "White"],
            ["White", "#1459E9", "White", "White"],
            ["White", "White", "White", "White"]
        ],
        2: [
            ["White", "White", "White", "White"],
            ["#1459E9", "#1459E9", "#1459E9", "White"],
            ["White", "White", "#1459E9", "White"],
            ["White", "White", "White", "White"]
        ],
        3: [
            ["White", "#1459E9", "White", "White"],
            ["White", "#1459E9", "White", "White"],
            ["#1459E9", "#1459E9", "White", "White"],
            ["White", "White", "White", "White"]
        ]
    },
    "RZ": {
        0: [
            ["#E9000A", "#E9000A", "White", "White"], 
            ["White", "#E9000A", "#E9000A", "White"], 
            ["White", "White", "White", "White"], 
            ["White", "White", "White", "White"]
        ],
        1: [
            ["White", "White", "#E9000A", "White"],
            ["White", "#E9000A", "#E9000A", "White"],
            ["White", "#E9000A", "White", "White"],
            ["White", "White", "White", "White"]
        ],
        2: [
            ["White", "White", "White", "White"],
            ["#E9000A", "#E9000A", "White", "White"],
            ["White", "#E9000A", "#E9000A", "White"],
            ["White", "White", "White", "White"]
        ],
        3: [
            ["White", "#E9000A", "White", "White"],
            ["#E9000A", "#E9000A", "White", "White"],
            ["#E9000A", "White", "White", "White"],
            ["White", "White", "White", "White"]
        ]
    },
    "LZ": {
        0: [
            ["White", "#3DFF2D", "#3DFF2D", "White"], 
            ["#3DFF2D", "#3DFF2D", "White", "White"], 
            ["White", "White", "White", "White"], 
            ["White", "White", "White", "White"]
        ],
        1: [
            ["White", "#3DFF2D", "White", "White"],
            ["White", "#3DFF2D", "#3DFF2D", "White"],
            ["White", "White", "#3DFF2D", "White"],
            ["White", "White", "White", "White"]
        ],
        2: [
            ["White", "White", "White", "White"],
            ["White", "#3DFF2D", "#3DFF2D", "White"],
            ["#3DFF2D", "#3DFF2D", "White", "White"],
            ["White", "White", "White", "White"]
        ],
        3: [
            ["#3DFF2D", "White", "White", "White"],
            ["#3DFF2D", "#3DFF2D", "White", "White"],
            ["White", "#3DFF2D", "White", "White"],
            ["White", "White", "White", "White"]
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
        this.nextPiece = this.boardQueue.top()[0];
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
        this.savedPiece = 0;
        this.savedPieceNumber = 0;
        this.savedTimes = 0;
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

    placeCurrentPiece(piece=this.currentPiece[this.currentRotation]) {
        this.bottomY = this.checkBottomMove(piece);
        for (let i = 0; i <= piece.length - 1; i++) {
            for (let j = 0; j <= piece[i].length - 1; j++) {
                if (piece[i][j] != "White"){
                    this.board[this.currentY + i][this.currentX + j] = piece[i][j];
                }
            }
        }
        this.populateBoard();
        this.drawGhostPiece(piece);
    }

    removeCurrentPiece(piece=this.currentPiece[this.currentRotation]) {
        for (let i = 0; i <= piece.length - 1; i++) {
            for (let j = 0; j <= piece[i].length - 1; j++) {
                if (piece[i][j] != "White") {
                    this.board[this.currentY + i][this.currentX + j] = "White";
                }
            }
        }
        this.populateBoard();
    }

    resetToNextPiece(movePieces=false) {
        if (this.currentY == 0) {
            this.fails += 1;
        } else {
            this.fails = 0;
        }
        const linesToClear = this.lineClearIndices();
        if (linesToClear.length >= 1) {
            this.clearLines(linesToClear)
            this.fillEmptyLineSpace(linesToClear)
        }
        this.currentX = 7;
        this.currentY = 0;
        this.currentRotation = 0;
        if (movePieces == false) {this.savedTimes = 0}
        this.currentPiece = this.nextPiece;
        this.currentPieceNumber = this.boardQueue.top()[1];
        this.boardQueue.dequeue();
        const newPieceNumber = this.randomPiece();
        this.boardQueue.enqueue([PIECES[PIECES_MAP[newPieceNumber]], newPieceNumber]);
        this.drawQueue();
        this.nextPiece = this.boardQueue.top()[0];
        this.topofPiece = this.findTopofPiece();
        this.bottomofPiece = this.findBottomofPiece();
        this.placeCurrentPiece();
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
                if (piece[i][j] != "White" && this.board[nextY + i][nextX + j] != "White") {
                    return false;
                }
            }
        }
        return true;
    }

    checkBottomMove(piece=this.currentPiece[this.currentRotation]) {
        for (let i = 1; i <= 20; i++) {
            if (this.checkNextMove([0, i], piece)) {
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
                    BOARD[j][k] = "Black";
                } else {
                    BOARD[j][k] = "White";
                }
            }
        }
        return BOARD;
    }

    checkNextLevel() {
        if (this.score >= this.levelGoal) {
            return true;
        }
        return false
    }

    nextLevel() {
        const self = this;
        clearInterval(self.interval);
        this.currentLevel += 1
        this.currentSpeed = ((0.8 - ((this.currentLevel - 1) * 0.007))**(this.currentLevel - 1)) * 1000
        this.levelGoal = this.currentLevel*5;
        this.interval = window.setInterval(this.moveDown.bind(self), this.currentSpeed);
    }

    populateBoard(board=this.board) {
        var cols = document.getElementsByClassName('tetris-col-p');
        for (let i = 0; i <= board.length - 1; i++) {
            for (let j = 0; j <= board[i].length - 1; j++){
                if (i >= 20 || (j <= 3 || j >= 14)) {
                    continue;
                } else {
                    var currentIndex = (i*10) + (j-4)
                    cols[currentIndex].style.backgroundColor = board[i][j];
                    cols[currentIndex].style.opacity = "1";
                }
            }
        }
    }

    drawGhostPiece(piece=this.currentPiece[this.currentRotation]) {
        var cols = document.getElementsByClassName('tetris-col-p');
        for (let i = 0; i <= piece.length - 1; i++) {
            for (let j = 0; j <= piece[i].length - 1; j++) {
                if (piece[i][j] != "White") {
                    var bottomIndex = (this.bottomY+i)*10 + (this.currentX+j - 4);
                    cols[bottomIndex].style.backgroundColor = piece[i][j];
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
                if (this.board[i][j] == "White") {
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

    clearLines(linesToClear) {
        var newLine = [];
        for (let j = 0; j <= this.board[linesToClear[0]].length - 1; j++) {
            if (j <=3 || j >= 14) {newLine.push("Black")} else {newLine.push("White");}
        }
        for (let k = 0; k <= linesToClear.length - 1; k++) {
            var newerLine = _.cloneDeep(newLine)
            this.board[linesToClear[k]] = newerLine;
        }
        if (linesToClear.length == 1) {this.score += 1} else if (linesToClear.length == 2) {this.score += 3} else if (linesToClear.length == 3) {this.score += 5} else if (linesToClear.length == 4) {this.score += 8};
        this.drawScore();
        if (this.checkNextLevel()) {this.nextLevel()};
    }

    fillEmptyLineSpace(linesToClear) {
        var newPiece = []
        for (let i = 0; i <= linesToClear[0] - 1; i++) {
            var rowPiece = [];
            for (let j = 4; j <= this.board[i].length - 1 - 4; j++) {
                rowPiece.push(this.board[i][j])
            }
            newPiece.push(rowPiece);
        }
        this.bottomY = linesToClear.length;
        this.currentX = 4;
        this.currentY = 0;
        this.removeCurrentPiece(newPiece);
        this.currentY = this.bottomY;
        this.placeCurrentPiece(newPiece);
    }

    drawQueue() {
        const queueDOM = document.getElementsByClassName('next-img');
        for (let i = 0; i <= this.boardQueue.length - 1; i++) {
            var imageSrc = "/public/images/" + PIECES_MAP[this.boardQueue.queue[3-i][1]] + ".png";
            queueDOM[3-i].src = imageSrc;
        }
    }

    drawSave() {
        const saveDOM = document.getElementsByClassName('save-img');
        var imageSrc = "/public/images/" + PIECES_MAP[this.savedPieceNumber] + ".png";
        saveDOM[0].src = imageSrc;
    }

    drawScore() {
        const scoreDOM = document.getElementsByClassName('score');
        scoreDOM[0].innerHTML = this.score;
    }

    handleEvent(e) {
        if (e.code == "ArrowRight") {
            e.preventDefault();
            this.moveRight();
        } else if (e.code == "ArrowLeft") {
            e.preventDefault();
            this.moveLeft();
        } else if (e.code == "ArrowUp") {
            e.preventDefault();
            this.rotatePiece();
        } else if (e.code == "ArrowDown") {
            e.preventDefault();
            this.moveDown();
        } else if (e.code == "Space") {
            e.preventDefault();
            this.hardDropPiece();
        } else if (e.code == "Tab") {
            e.preventDefault();
            if (this.savedTimes == 0) {
                this.savePiece();
                this.drawSave();
                this.savedTimes += 1;
            }
        }
    }

    hardDropPiece(piece=this.currentPiece[this.currentRotation]) {
        this.removeCurrentPiece(piece);
        this.currentY = this.bottomY;
        this.placeCurrentPiece(piece);
        this.resetToNextPiece();
    }

    savePiece() {
        if (this.savedPiece == 0) {
            this.removeCurrentPiece();
            this.savedPieceNumber = this.currentPieceNumber;
            this.savedPiece = this.currentPiece;
            this.resetToNextPiece(true);
        } else {
            this.removeCurrentPiece();
            [this.savedPieceNumber, this.currentPieceNumber] = [this.currentPieceNumber, this.savedPieceNumber];
            [this.savedPiece, this.currentPiece] = [this.currentPiece, this.savedPiece];
            this.currentY = 0;
            this.currentX = 7;
            this.placeCurrentPiece();
        }
    }

    gameOver() {
        clearInterval(this.interval);
        alert("Game Over!");
        return;
    }

    findTopofPiece() {
        var piece = this.currentPiece[this.currentRotation]
        for (let i = 0; i <= piece.length - 1; i++) {
            for (let j = 0; j <= piece[i].length - 1; j++) {
                if (piece[i][j] != "White") {
                    return i;
                }
            }
        }
    }

    findBottomofPiece() {
        var piece = this.currentPiece[this.currentRotation];
        for (let i = this.topofPiece; i <= piece.length - 1; i++) {
            if ((piece[i][0] == "White" && piece[i][1] == "White") && (piece[i][2] == "White" && piece[i][3] == "White")) {
                return (i-1)
            }
        }
        return 3;
    }
}

module.exports = Board;