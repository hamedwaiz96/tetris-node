/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/board.js":
/*!**********************!*\
  !*** ./src/board.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Queue = __webpack_require__(/*! ./queue */ "./src/queue.js");

var PIECES = {
  "Line": {
    0: [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]],
    1: [[0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0]],
    2: [[0, 0, 0, 0], [0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0]],
    3: [[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0]]
  },
  "Square": {
    0: [[0, 1, 1, 0], [0, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
    1: [[0, 1, 1, 0], [0, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
    2: [[0, 1, 1, 0], [0, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
    3: [[0, 1, 1, 0], [0, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
  },
  "T": {
    0: [[0, 1, 0, 0], [1, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
    1: [[0, 1, 0, 0], [0, 1, 1, 0], [0, 1, 0, 0], [0, 0, 0, 0]],
    2: [[0, 0, 0, 0], [1, 1, 1, 0], [0, 1, 0, 0], [0, 0, 0, 0]],
    3: [[0, 1, 0, 0], [1, 1, 0, 0], [0, 1, 0, 0], [0, 0, 0, 0]]
  },
  "RL": {
    0: [[0, 0, 1, 0], [1, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
    1: [[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 1, 0], [0, 0, 0, 0]],
    2: [[0, 0, 0, 0], [1, 1, 1, 0], [1, 0, 0, 0], [0, 0, 0, 0]],
    3: [[1, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 0, 0, 0]]
  },
  "LL": {
    0: [[1, 0, 0, 0], [1, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
    1: [[0, 1, 1, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 0, 0, 0]],
    2: [[0, 0, 0, 0], [1, 1, 1, 0], [0, 0, 1, 0], [0, 0, 0, 0]],
    3: [[0, 1, 0, 0], [0, 1, 0, 0], [1, 1, 0, 0], [0, 0, 0, 0]]
  },
  "RZ": {
    0: [[1, 1, 0, 0], [0, 1, 1, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
    1: [[0, 0, 1, 0], [0, 1, 1, 0], [0, 1, 0, 0], [0, 0, 0, 0]],
    2: [[0, 0, 0, 0], [1, 1, 0, 0], [0, 1, 1, 0], [0, 0, 0, 0]],
    3: [[0, 1, 0, 0], [1, 1, 0, 0], [1, 0, 0, 0], [0, 0, 0, 0]]
  },
  "LZ": {
    0: [[0, 1, 1, 0], [1, 1, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
    1: [[0, 1, 0, 0], [0, 1, 1, 0], [0, 0, 1, 0], [0, 0, 0, 0]],
    2: [[0, 0, 0, 0], [0, 1, 1, 0], [1, 1, 0, 0], [0, 0, 0, 0]],
    3: [[1, 0, 0, 0], [1, 1, 0, 0], [0, 1, 0, 0], [0, 0, 0, 0]]
  }
};
var PIECES_MAP = {
  1: "Line",
  2: "Square",
  3: "T",
  4: "RL",
  5: "LL",
  6: "RZ",
  7: "LZ"
};

var Board = /*#__PURE__*/function () {
  function Board() {
    _classCallCheck(this, Board);

    this.board = this.createBoard();
    this.boardQueue = this.createQueue();
    this.currentPiece = PIECES[PIECES_MAP[this.randomPiece()]];
    this.nextPiece = this.boardQueue.top();
    this.currentX = 7;
    this.currentY = 0;
    this.currentRotation = 0;
  }

  _createClass(Board, [{
    key: "moveLeft",
    value: function moveLeft() {}
  }, {
    key: "moveRight",
    value: function moveRight() {}
  }, {
    key: "moveDown",
    value: function moveDown() {}
  }, {
    key: "rotatePiece",
    value: function rotatePiece() {
      var nextRotation = this.currentRotation + 1;

      if (nextRotation == 4) {
        nextRotation = 0;
      }

      if (checkNextMove([0, 0], this.currentPiece[nextRotation])) {
        this.currentRotation = nextRotation;
        placeCurrentPiece();
      }
    }
  }, {
    key: "placeCurrentPiece",
    value: function placeCurrentPiece() {
      var currentPiece = this.currentPiece[this.currentRotation];

      for (var i = 0; i <= currentPiece.length - 1; i++) {
        for (var j = 0; j <= currentPiece[i].length - 1; j++) {
          this.board[this.currentX + i][this.currentY + j] = currentPiece[i][j];
        }
      }

      resetToNextPiece();
    }
  }, {
    key: "resetToNextPiece",
    value: function resetToNextPiece() {
      this.currentX = 7;
      this.currentY = 0;
      this.currentRotation = 0;
      this.currentPiece = this.nextPiece;
      this.boardQueue.dequeue();
      this.boardQueue.enqueue(PIECES[PIECES_MAP[this.randomPiece()]]);
      this.nextPiece = this.boardQueue.top();
    }
  }, {
    key: "checkNextMove",
    value: function checkNextMove(move) {
      var piece = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.currentPiece[this.currentRotation];

      /* move argument is an array of two numbers where first index is amount of horizontal space you want to move
      and second index is amount of vertical space you want to move. Example [1, 0] would mean moving one to the right
      and no vertical movement.
      */
      var nextX = this.currentX + move[0];
      var nextY = this.currentY + move[1];

      for (var i = 0; i <= piece.length - 1; i++) {
        for (var j = 0; j <= piece[i].length - 1; j++) {
          if (this.piece[i][j] == 1 && this.board[nextX + i][nextY + j] == 1) {
            return false;
          }
        }
      }

      return true;
    }
  }, {
    key: "randomPiece",
    value: function randomPiece() {
      return Math.floor(Math.random() * Math.floor(7)) + 1;
    }
  }, {
    key: "createQueue",
    value: function createQueue() {
      var queue = new Queue();

      for (var i = 0; i <= 3; i++) {
        queue.enqueue(PIECES[PIECES_MAP[this.randomPiece()]]);
      }

      return queue;
    }
  }, {
    key: "createBoard",
    value: function createBoard() {
      /* Standard tetris board is 10 across and 20 down, reason why we are doing 18x24 here is because
      we want to specify horizontal and vertical borders for when player tries to move outside borders.
      */
      var BOARD = new Array(24);

      for (var i = 0; i <= BOARD.length - 1; i++) {
        BOARD[i] = new Array(18);
      }

      for (var j = 0; j <= BOARD.length - 1; j++) {
        for (var k = 0; k <= BOARD[0].length - 1; k++) {
          if (j >= 20 || k <= 3 || k >= 14) {
            BOARD[j][k] = 1;
          } else {
            BOARD[j][k] = 0;
          }
        }
      }

      return BOARD;
    }
  }]);

  return Board;
}();

module.exports = Board;

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Board = __webpack_require__(/*! ./board */ "./src/board.js");

var board = new Board();
console.log(board.randomPiece());
console.log(board.boardQueue.printQueue());

/***/ }),

/***/ "./src/queue.js":
/*!**********************!*\
  !*** ./src/queue.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Queue = /*#__PURE__*/function () {
  function Queue() {
    _classCallCheck(this, Queue);

    this.queue = [];
  }

  _createClass(Queue, [{
    key: "enqueue",
    value: function enqueue(item) {
      this.queue.push(item);
    }
  }, {
    key: "dequeue",
    value: function dequeue(item) {
      if (this.isEmpty()) {
        return false;
      }

      this.queue.shift();
    }
  }, {
    key: "top",
    value: function top() {
      if (this.isEmpty()) {
        return false;
      }

      this.queue[0];
    }
  }, {
    key: "isEmpty",
    value: function isEmpty() {
      return this.queue.length == 0;
    }
  }, {
    key: "printQueue",
    value: function printQueue() {
      var str = "";

      for (var i = 0; i < this.queue.length; i++) {
        str += this.queue[i] + " ";
      }

      return str;
    }
  }]);

  return Queue;
}();

module.exports = Queue;

/***/ })

/******/ });
//# sourceMappingURL=main.js.map