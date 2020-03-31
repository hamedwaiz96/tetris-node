const Queue = require('./queue');

const PIECES = {
    1: [[], [], [], []],
    2: [[], [], [], []],
    3: [[], [], [], []],
    4: [[], [], [], []],
    5: [[], [], [], []],
    6: [[], [], [], []],
    7: [[], [], [], []]
}

class Board {
    constructor() {
        this.board = 
        this.boardQueue = this.createQueue();
    }

    randomPiece() {
        return Math.floor(Math.random() * Math.floor(max)) + 1;
    }

    createQueue() {
        const queue = new Queue();
        for (let i = 0; i <= 3; i++){
            queue.enqueue(PIECES[this.randomPiece()])
        }
        return queue;
    }
}

module.exports = Board;