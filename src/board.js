const PIECES = {
    
}

class Board {
    constructor() {
        this.queue = this.createQueue();

    }

    randomPiece() {
        return Math.floor(Math.random() * Math.floor(max)) + 1;
    }

    createQueue() {
        const queue = [];
        for (let i = 0; i <= 3; i++){
            queue.push(this.randomPiece())
        }
        return queue;
    }
}