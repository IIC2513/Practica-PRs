// Programmed by @k0rval4n
// This is a simple Tetris game implemented using HTML, CSS and JavaScript.

class TetrosCanvasDrawer {
  constructor(canvas) {
    if (!canvas) {
      throw new Error("Canvas element is required");
    }
    this.canvas = canvas;
    this.context = this.canvas.getContext("2d");
  }

  drawBlock(x, y, color) {
    this.context.fillStyle = color;
    const pixelSize = this.getPixelSize();
    this.context.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
  }

  getPixelSize() {
    return this.canvas.width / 10;
  }

  clearBlock(x, y) {
    const pixelSize = this.getPixelSize();
    this.context.clearRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
  }
}

class Tetromino {
  constructor(shapes, color) {
    this.shapes = shapes;
    this.actualShapeIndex = 0;
    this.color = color;
    this.x = 3;
    this.y = 0;
  }

  get shape() {
    return this.shapes[this.actualShapeIndex];
  }

  get leftRotationShape() {
    return this.shapes[
      (this.actualShapeIndex - 1 + this.shapes.length) % this.shapes.length
    ];
  }

  rotateToLeft() {
    this.actualShapeIndex =
      (this.actualShapeIndex - 1 + this.shapes.length) % this.shapes.length;
  }

  get rightRotationShape() {
    return this.shapes[(this.actualShapeIndex + 1) % this.shapes.length];
  }

  rotateToRight() {
    this.actualShapeIndex = (this.actualShapeIndex + 1) % this.shapes.length;
  }
}

class OTetromino extends Tetromino {
  constructor() {
    const shapes = [
      [
        [1, 1],
        [1, 1],
      ],
    ];
    super(shapes, "yellow");
    this.x = 4;
  }
}

class ITetromino extends Tetromino {
  constructor() {
    // prettier-ignore
    const shapes = [
      [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      [
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
      ],
    ];
    super(shapes, "cyan");
  }
}

class JTetromino extends Tetromino {
  constructor() {
    const shapes = [
      [
        [1, 1, 1],
        [0, 0, 1],
      ],
      [
        [0, 1],
        [0, 1],
        [1, 1],
      ],
      [
        [1, 0, 0],
        [1, 1, 1],
      ],
      [
        [1, 1],
        [1, 0],
        [1, 0],
      ],
    ];
    super(shapes, "blue");
  }
}

class LTetromino extends Tetromino {
  constructor() {
    const shapes = [
      [
        [0, 0, 1],
        [1, 1, 1],
      ],
      [
        [1, 0],
        [1, 0],
        [1, 1],
      ],
      [
        [1, 1, 1],
        [1, 0, 0],
      ],
      [
        [1, 1],
        [0, 1],
        [0, 1],
      ],
    ];
    super(shapes, "orange");
  }
}

class STetromino extends Tetromino {
  constructor() {
    const shapes = [
      [
        [0, 1, 1],
        [1, 1, 0],
      ],
      [
        [1, 0],
        [1, 1],
        [0, 1],
      ],
    ];
    super(shapes, "green");
  }
}

class ZTetromino extends Tetromino {
  constructor() {
    const shapes = [
      [
        [1, 1, 0],
        [0, 1, 1],
      ],
      [
        [0, 1],
        [1, 1],
        [1, 0],
      ],
    ];
    super(shapes, "red");
  }
}

class TTetromino extends Tetromino {
  constructor() {
    const shapes = [
      [
        [0, 1, 0],
        [1, 1, 1],
      ],
      [
        [1, 0],
        [1, 1],
        [1, 0],
      ],
      [
        [1, 1, 1],
        [0, 1, 0],
      ],
      [
        [0, 1],
        [1, 1],
        [0, 1],
      ],
    ];
    super(shapes, "purple");
  }
}

const TETROMINOS = [
  OTetromino,
  ITetromino,
  JTetromino,
  LTetromino,
  STetromino,
  ZTetromino,
  TTetromino,
];

const DELTA_X = [0, -1, 1, -2, 2];

class BackgroundBlocks {
  constructor() {
    this.blocks = [];
    for (let y = 0; y < 23; y++) {
      this.blocks[y] = [];
      for (let x = 0; x < 10; x++) {
        this.blocks[y][x] = null;
      }
    }
  }

  getBlock(x, y) {
    return this.blocks[y][x];
  }

  addBlock(x, y, color) {
    this.blocks[y][x] = color;
  }
}

class TetrosBoardController {
  constructor() {
    const gameCanvas = document.getElementById("game-canvas");
    this.tetrosInGameDrawer = new TetrosCanvasDrawer(gameCanvas);
    this.backgroundBlocks = new BackgroundBlocks();
    this.setRandomTetromino();
  }

  setRandomTetromino() {
    const randomIndex =
      Math.floor(Math.random() * TETROMINOS.length) % TETROMINOS.length;
    this.currentTetromino = new TETROMINOS[randomIndex]();
  }

  tryToMoveTetromino(x, y) {
    if (!this.canTetrominoMove(x, y)) {
      return;
    }

    this.clearTetromino();
    this.currentTetromino.x = x;
    this.currentTetromino.y = y;
    this.drawTetromino();
  }

  canTetrominoMove(x, y) {
    const shape = this.currentTetromino.shape;
    for (let i = 0; i < shape.length; i++) {
      for (let j = 0; j < shape[i].length; j++) {
        if (shape[i][j] === 1) {
          const newX = x + j;
          const newY = y + i;
          if (!this.isTetrominoBlockInValidPosition(newX, newY)) {
            return false;
          }
        }
      }
    }
    return true;
  }

  isTetrominoBlockInValidPosition(x, y) {
    return x >= 0 && x < 10 && y < 23 && !this.backgroundBlocks.getBlock(x, y);
  }

  tryToRotateToLeftTetromino() {
    const leftRotationShape = this.currentTetromino.leftRotationShape;
    const result = this.tryToRotateTetrimino(leftRotationShape);
    if (result.canBeRotated) {
      this.clearTetromino();
      this.currentTetromino.rotateToLeft();
      this.currentTetromino.x = result.newX;
      this.currentTetromino.y = result.newY;
      this.drawTetromino();
    }
  }

  tryToRotateTetrimino(newShape) {
    const x_tetromino = this.currentTetromino.x;
    const y_tetromino = this.currentTetromino.y;
    mainRotateLoop: for (const deltaX of DELTA_X) {
      for (let i = 0; i < newShape.length; i++) {
        for (let j = 0; j < newShape[i].length; j++) {
          if (newShape[i][j] === 1) {
            const newX = x_tetromino + j + deltaX;
            const newY = y_tetromino + i;
            if (!this.isTetrominoBlockInValidPosition(newX, newY)) {
              continue mainRotateLoop;
            }
          }
        }
      }
      return {
        canBeRotated: true,
        newX: x_tetromino + deltaX,
        newY: y_tetromino,
      };
    }
    return {
      canBeRotated: false,
      newX: x_tetromino,
      newY: y_tetromino,
    };
  }

  tryToRotateToRightTetromino() {
    const rightRotationShape = this.currentTetromino.rightRotationShape;
    const result = this.tryToRotateTetrimino(rightRotationShape);
    if (result.canBeRotated) {
      this.clearTetromino();
      this.currentTetromino.rotateToRight();
      this.currentTetromino.x = result.newX;
      this.currentTetromino.y = result.newY;
      this.drawTetromino();
    }
  }

  drawTetromino() {
    const x_tetromino = this.currentTetromino.x;
    const y_tetromino = this.currentTetromino.y;
    const shape = this.currentTetromino.shape;
    for (let i = 0; i < shape.length; i++) {
      for (let j = 0; j < shape[i].length; j++) {
        if (shape[i][j] === 1) {
          const x = x_tetromino + j;
          const y = y_tetromino + i;
          if (y > 2) {
            this.tetrosInGameDrawer.drawBlock(
              x,
              y - 3,
              this.currentTetromino.color
            );
          }
        }
      }
    }
  }

  clearTetromino() {
    const x_tetromino = this.currentTetromino.x;
    const y_tetromino = this.currentTetromino.y;
    const shape = this.currentTetromino.shape;
    for (let i = 0; i < shape.length; i++) {
      for (let j = 0; j < shape[i].length; j++) {
        if (shape[i][j] === 1) {
          const x = x_tetromino + j;
          const y = y_tetromino + i;
          this.tetrosInGameDrawer.clearBlock(x, y - 3);
        }
      }
    }
  }

  updateBackground() {
    this.clearBackground();
    this.drawTetromino();
    for (let y = 0; y < 23; y++) {
      for (let x = 0; x < 10; x++) {
        const blockColor = this.backgroundBlocks.getBlock(x, y);
        if (blockColor) {
          this.tetrosInGameDrawer.drawBlock(x, y - 3, blockColor);
        }
      }
    }
  }

  clearBackground() {
    for (let y = 0; y < 23; y++) {
      for (let x = 0; x < 10; x++) {
        this.tetrosInGameDrawer.clearBlock(x, y - 3);
      }
    }
  }
}

class BackgroundBlocksController {
  constructor(backgroundBlocks) {
    this.backgroundBlocks = backgroundBlocks;
  }

  addTetrominoToBackground(currentTetromino) {
    const x_tetromino = currentTetromino.x;
    const y_tetromino = currentTetromino.y;
    const shape = currentTetromino.shape;
    for (let i = 0; i < shape.length; i++) {
      for (let j = 0; j < shape[i].length; j++) {
        if (shape[i][j] === 1) {
          const newX = x_tetromino + j;
          const newY = y_tetromino + i;
          this.backgroundBlocks.addBlock(newX, newY, currentTetromino.color);
        }
      }
    }
  }

  getCountOfNLinesCompletedAndRemoveThem(N) {
    let count = 0;
    let isComplete = false;
    for (let y = 0; y < 23; y++) {
      for (let i = y; i < y + N; i++) {
        isComplete = this.isLineComplete(i);
        if (!isComplete) {
          break;
        }
      }
      if (isComplete) {
        for (let i = y; i < y + N; i++) {
          this.removeLine(y);
        }
        count++;
      }
    }
    return count;
  }

  isLineComplete(y) {
    let isComplete = true;
    for (let x = 0; x < 10; x++) {
      if (!this.backgroundBlocks.getBlock(x, y)) {
        isComplete = false;
        break;
      }
    }

    return isComplete;
  }

  removeLine(y) {
    for (let i = y; i > 0; i--) {
      this.backgroundBlocks.blocks[i] = this.backgroundBlocks.blocks[i - 1];
    }
    this.backgroundBlocks.blocks[0] = [];
  }
}

class TetrosEventListener {
  constructor(boardController) {
    this.boardController = boardController;
    this.tetrosKeydownListener = new TetrosKeydownListener(boardController);
    this.tetrosTouchListener = new TetrosTouchListener(boardController);
  }

  initEventListeners() {
    this.tetrosKeydownListener.initEventListeners();
    this.tetrosTouchListener.initEventListeners();
  }

  removeEventListeners() {
    this.tetrosKeydownListener.removeEventListeners();
    this.tetrosTouchListener.removeEventListeners();
  }
}

class TetrosKeydownListener {
  constructor(boardController) {
    this.boardController = boardController;
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.initEventListeners();
  }

  initEventListeners() {
    document.addEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown(event) {
    if (event.key === "ArrowLeft") {
      this.boardController.tryToMoveTetromino(
        this.boardController.currentTetromino.x - 1,
        this.boardController.currentTetromino.y
      );
    } else if (event.key === "ArrowRight") {
      this.boardController.tryToMoveTetromino(
        this.boardController.currentTetromino.x + 1,
        this.boardController.currentTetromino.y
      );
    } else if (event.key === "ArrowDown") {
      this.boardController.tryToMoveTetromino(
        this.boardController.currentTetromino.x,
        this.boardController.currentTetromino.y + 1
      );
    } else if (event.key === "q") {
      this.boardController.tryToRotateToLeftTetromino();
    } else if (event.key === "e") {
      this.boardController.tryToRotateToRightTetromino();
    }
  }

  removeEventListeners() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }
}

class TetrosTouchListener {
  constructor(boardController) {
    this.boardController = boardController;
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
    this.isMoving = false;
    this.mustCaptureTouch = false;
    this.isFirstMove = false;
    this.startX = null;
    this.startY = null;
    this.initEventListeners();
  }

  initEventListeners() {
    document.addEventListener("touchstart", this.handleTouchStart);
    document.addEventListener("touchmove", this.handleTouchMove);
    document.addEventListener("touchend", this.handleTouchEnd);
  }

  handleTouchStart(event) {
    if (
      event.target === document.getElementById("pause-button") ||
      event.target === document.getElementById("resume-button") ||
      event.target === document.getElementById("stop-button")
    ) {
      return;
    }
    this.isMoving = false;
    this.mustCaptureTouch = true;
    this.isFirstMove = true;
    this.startX = event.touches[0].clientX;
    this.startY = event.touches[0].clientY;
  }

  handleTouchMove(event) {
    if (
      event.target === document.getElementById("pause-button") ||
      event.target === document.getElementById("resume-button") ||
      event.target === document.getElementById("stop-button")
    ) {
      return;
    }
    const touchX = event.touches[0].clientX;
    const touchY = event.touches[0].clientY;
    const deltaX = touchX - this.startX;
    const deltaY = touchY - this.startY;
    const norm = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));

    if (Math.abs(deltaX) < 14 && Math.abs(deltaY) < 14) {
      return;
    }

    if (!this.mustCaptureTouch) {
      return;
    }

    this.isMoving = true;

    const gameCanvasWidth = document.getElementById("game-canvas").offsetWidth;

    let timeout = 75;
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 0) {
        this.boardController.tryToMoveTetromino(
          this.boardController.currentTetromino.x + 1,
          this.boardController.currentTetromino.y
        );
      } else {
        this.boardController.tryToMoveTetromino(
          this.boardController.currentTetromino.x - 1,
          this.boardController.currentTetromino.y
        );
      }
    } else if (deltaY > 0) {
      this.boardController.tryToMoveTetromino(
        this.boardController.currentTetromino.x,
        this.boardController.currentTetromino.y + 1
      );
    }

    if (Math.abs(norm) > 18) {
      timeout = gameCanvasWidth / (1.5 * Math.log2(Math.abs(norm)));
    }

    this.startX = touchX;
    this.startY = touchY;
    this.mustCaptureTouch = false;
    this.isFirstMove = false;
    setTimeout(() => {
      this.mustCaptureTouch = true;
    }, timeout);
  }

  handleTouchEnd(event) {
    this.mustCaptureTouch = false;
    const deltaX = event.changedTouches[0].clientX - this.startX;
    const deltaY = event.changedTouches[0].clientY - this.startY;

    if (Math.abs(deltaX) < 5 && Math.abs(deltaY) < 5 && !this.isMoving) {
      this.boardController.tryToRotateToLeftTetromino();
    }
  }

  removeEventListeners() {
    document.removeEventListener("touchstart", this.handleTouchStart);
    document.removeEventListener("touchmove", this.handleTouchMove);
    document.removeEventListener("touchend", this.handleTouchEnd);
  }
}
class TetrosGameOverChecker {
  constructor(boardController) {
    this.boardController = boardController;
  }

  checkGameOver() {
    for (let y = 0; y < 3; y++) {
      for (let x = 0; x < 10; x++) {
        if (this.boardController.backgroundBlocks.getBlock(x, y)) {
          return true;
        }
      }
    }
  }
}

class TetrosController {
  constructor() {
    this.boardController = new TetrosBoardController();
    this.eventListener = new TetrosEventListener(this.boardController);
    this.gameOverChecker = new TetrosGameOverChecker(this.boardController);
    this.backgroundBlocksController = new BackgroundBlocksController(
      this.boardController.backgroundBlocks
    );
    this.lastLoopTime = Date.now();
    this.score = 0;
    this.linesCompleted = 0;
    this.isRunning = true;
  }

  get level() {
    return Math.trunc(this.linesCompleted / 10);
  }

  gameLoop() {
    if (!this.isRunning) {
      return;
    }
    if (this.gameOverChecker.checkGameOver()) {
      this.stop();
      alert("Game Over");
      return;
    }
    const currentTime = Date.now();
    const deltaTime = currentTime - this.lastLoopTime;
    if (deltaTime < TetrosSpeedCalculator.getSpeed(this.level)) {
      requestAnimationFrame(this.gameLoop.bind(this));
      return;
    }
    this.lastLoopTime = currentTime;
    if (
      !this.boardController.canTetrominoMove(
        this.boardController.currentTetromino.x,
        this.boardController.currentTetromino.y + 1
      )
    ) {
      this.eventListener.removeEventListeners();
      this.prepareNextTetromino();
      this.eventListener.initEventListeners();

      requestAnimationFrame(this.gameLoop.bind(this));
    }
    this.eventListener.removeEventListeners();
    this.tryToMoveTetrominoDown();
    this.removeCompletedLinesAndAddScore();
    this.boardController.updateBackground();
    this.updateScore();
    this.updateLevel();
    this.eventListener.initEventListeners();

    requestAnimationFrame(this.gameLoop.bind(this));
  }

  prepareNextTetromino() {
    const currentTetromino = this.boardController.currentTetromino;
    this.backgroundBlocksController.addTetrominoToBackground(currentTetromino);
    this.boardController.clearTetromino();
    this.boardController.setRandomTetromino();
    this.boardController.drawTetromino();
    this.boardController.updateBackground();
  }

  tryToMoveTetrominoDown() {
    this.boardController.clearTetromino();
    this.boardController.tryToMoveTetromino(
      this.boardController.currentTetromino.x,
      this.boardController.currentTetromino.y + 1
    );
    this.boardController.drawTetromino();
  }

  removeCompletedLinesAndAddScore() {
    for (let i = 1; i <= 4; i++) {
      const count =
        this.backgroundBlocksController.getCountOfNLinesCompletedAndRemoveThem(
          i
        );
      if (count > 0) {
        this.linesCompleted += count * i;
        this.score +=
          count * TetrosScoreCalculator.getScoreOfLinesCompleted(this.level, i);
      }
    }
  }

  updateScore() {
    const scoreElement = document.getElementById("score-value");
    scoreElement.innerText = this.score;
  }

  updateLevel() {
    const levelElement = document.getElementById("level-value");
    levelElement.innerText = this.level;
  }

  start() {
    this.gameLoop();
    const startButton = document.getElementById("start-button");
    startButton.style.display = "none";
    const inGameControls = document.getElementById("in-game-controls");
    inGameControls.style.display = "flex";
  }

  pause() {
    this.isRunning = false;
    this.eventListener.removeEventListeners();
    const pauseButton = document.getElementById("pause-button");
    pauseButton.style.display = "none";
    const resumeButton = document.getElementById("resume-button");
    resumeButton.style.display = "block";
  }

  resume() {
    this.isRunning = true;
    this.eventListener.initEventListeners();
    const resumeButton = document.getElementById("resume-button");
    resumeButton.style.display = "none";
    const pauseButton = document.getElementById("pause-button");
    pauseButton.style.display = "block";
    this.gameLoop();
  }

  stop() {
    this.isRunning = false;
    this.boardController = null;
    this.eventListener.removeEventListeners();
    this.eventListener = null;
    this.gameOverChecker = null;
    this.backgroundBlocksController = null;
    const inGameControls = document.getElementById("in-game-controls");
    inGameControls.style.display = "none";
    const startButton = document.getElementById("start-button");
    startButton.style.display = "block";
  }
}

class TetrosScoreCalculator {
  static scoresByLevel = {
    1: [40, 80, 120, 400],
    2: [100, 200, 300, 1000],
    3: [300, 600, 900, 3000],
    4: [1200, 2400, 3600, 12000],
  };

  static getScoreOfLinesCompleted(level, numberOfAdjacentLines) {
    if (level === 0) {
      return this.scoresByLevel[numberOfAdjacentLines][0];
    } else if (level === 1) {
      return this.scoresByLevel[numberOfAdjacentLines][1];
    } else if (level === 2) {
      return this.scoresByLevel[numberOfAdjacentLines][2];
    } else if (level <= 9) {
      return this.scoresByLevel[numberOfAdjacentLines][3];
    } else {
      return this.scoresByLevel[numberOfAdjacentLines][0] * (level + 1);
    }
  }
}

class TetrosSpeedCalculator {
  static getSpeed(level) {
    if (level === 0) {
      return 800;
    } else if (level === 1) {
      return 717;
    } else if (level === 2) {
      return 633;
    } else if (level === 3) {
      return 550;
    } else if (level === 4) {
      return 467;
    } else if (level === 5) {
      return 383;
    } else if (level === 6) {
      return 300;
    } else if (level === 7) {
      return 217;
    } else if (level === 8) {
      return 133;
    } else if (level === 9) {
      return 100;
    } else if (level <= 12) {
      return 83;
    } else if (level <= 15) {
      return 67;
    } else if (level <= 18) {
      return 50;
    } else if (level <= 28) {
      return 33;
    } else {
      return 17;
    }
  }
}

let tetrosController;

const startGame = () => {
  tetrosController = new TetrosController();
  tetrosController.start();
};

const pauseGame = () => {
  if (tetrosController) {
    tetrosController.pause();
  }
};

const resumeGame = () => {
  if (tetrosController) {
    tetrosController.resume();
  }
};

const stopGame = () => {
  if (tetrosController) {
    tetrosController.stop();
  }
  tetrosController = null;
};

const infoLogo = document.getElementById("info-logo");
const infoDialog = document.getElementById("info-dialog");

infoLogo.addEventListener("click", () => {
  pauseGame();
  infoDialog.showModal();
});
