class Queue {
    constructor() {
        this.queue = []
    }

    enqueue(item) {
        this.queue.push(item)
    }

    dequeue(item) {
        if(this.isEmpty()) {
            return false;
        }
        this.queue.shift();
    }

    top() {
        if(this.isEmpty()) {
            return false;
        }
        this.queue[0];
    }

    isEmpty() {
        return this.queue.length == 0;
    }

    printQueue() { 
        var str = ""; 
        for(var i = 0; i < this.queue.length; i++) 
            str += this.queue[i] +" "; 
        return str; 
    } 
}

module.exports = Queue;