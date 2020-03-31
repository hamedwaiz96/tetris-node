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
        for(var i = 0; i < this.items.length; i++) 
            str += this.items[i] +" "; 
        return str; 
    } 
}

module.exports = Queue;