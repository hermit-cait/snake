$(document).ready(function() {
  $(".start").click(function() {
    /* Hide info and show game screen */
    $(".welcome-screen").fadeOut(300);
    $(".board").show();
    $(".controls").show(); 
    createBoard();
    startGame();
    updateSnakeBody();      
    applePosition();
    createApple();
    $(".restart").click(function() { 
      gameOver();  
      snakeHead = [2,6];
      snakeBody = [
        [2,6],
        [2,5],
        [2,4],
        [2,3],
        [2,2]
      ];      
      movement = null;
      movingRight = true;
      startGame();
      updateSnakeBody();
      applePosition();
      createApple();
    });

    /* Controls for testing which will be removed later */
    $(".pause").click(function() {      
      gameOver()
    });
    $(".play").click(function() {    
      startGame();
    });
  });
});

let boardSize = 16;
let movement = null;
let movingRight = true;
let movingDown = false;
let movingLeft = false;
let movingUp = false;
/* Higher number = slower, lower number = faster */
let speed = 150;
let snakeHead = [2,6];
let snakeBody = [
  [2,6],
  [2,5],
  [2,4],
  [2,3],
  [2,2]
];

function createBoard() {
  var boardRow = '';
  for (var i = 0; i < boardSize; i++) {
    boardRow += '<td></td>'
  }
  boardArray = [];
  for (var i = 0; i < boardSize; i++) {
    boardArray.push('<tr>' + boardRow + '</tr>');
  }
  $(document.body).prepend('<table class="board"></table>');
  $(".board").html(boardArray);
};

function startGame() {
  movement = setInterval(updateSnakeBody, speed);
};

function updateSnakeBody() {
  var snakeNewHead = [];

  /* Handles changing direction of snake head movement */
  if (movingRight == true) {
    snakeNewHead = [snakeHead[0], snakeHead[1] + 1];
  } else if (movingDown == true) {
    snakeNewHead = [snakeHead[0] + 1, snakeHead[1]];       
  } else if (movingLeft == true) {
    snakeNewHead = [snakeHead[0], snakeHead[1] - 1];
  } else if (movingUp == true) {
    snakeNewHead = [snakeHead[0] - 1, snakeHead[1]];
  };

  /* Ends game if snake hits wall */
  if (snakeNewHead[0] < 1 || snakeNewHead[1] < 1) {
    gameOver();
  } else if (snakeNewHead[0] >= boardSize - 1 || snakeNewHead[1] >= boardSize - 1) {
    gameOver();
  };

  /* Handles movement of snake body by giving each cell the position of the previous cell in the array */
  for (var i = (snakeBody.length - 1); i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  };  
  
  /* Saves new position of snake head */
  snakeHead = snakeNewHead;
  /* Assigns it as first cell of snake body */
  snakeBody[0] = snakeHead;

  /* Checks if snake eats apple and increments size and checks if snake hits self and then stops game */
  var newCell = { length: 0 };  
  var newCell = $('tr').eq(snakeNewHead[0]).find('td').eq(snakeNewHead[1]);
  if (newCell.hasClass('snake-body')) {
    gameOver();
  } else {
    if (newCell.hasClass('apple')) {
      snakeBody.push([]);      
      applePosition();
      createApple();
    };
  };
  createSnake();
};

/* Changes cell colours to make snake visible */
function createSnake() {    
  $('td').removeClass('snake-body snake-head');
  for (var i = 0; i < snakeBody.length; i++) {
    $("tr").eq(snakeBody[i][0]).find("td").eq(snakeBody[i][1]).addClass("snake-body");
  };
  $("tr").eq(snakeHead[0]).find("td").eq(snakeHead[1]).addClass("snake-head");
};

/* Places apple in a random cell */

/* NOTE: Currently there is no logic to check whether apple is on the snake or not and also to ensure the apple doesn't spawn in the same cell multiple times */

function applePosition() { 
  
  /* NORMAL MODE */

  /* let applePositionY = getRandomNumber($('tr').length);
  let applePositionX = getRandomNumber($('tr:eq(0)>td').length);
  apple = [applePositionY, applePositionX]; */

  /* EASY MODE */

  applePositionY = getRandomInt(2,6);
  applePositionX = getRandomInt(2,6);
  apple = [applePositionY, applePositionX];  
};

function createApple() {
  $('td').removeClass('apple');
  $('tr').eq(apple[0]).find('td').eq(apple[1]).addClass('apple');
}

/* NORMAL MODE */

function getRandomNumber(totalCells) {
  return parseInt(Math.random() * totalCells % totalCells);
};

/* EASY MODE */

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

/* Functionality of arrow keys */
$(document).on("keydown", function(e) {
  let key = e.keyCode;
  e.preventDefault();
  if (key == 40 && movingUp == false) {
    /* DOWN */
    movingRight = false;
    movingDown = true;
    movingLeft = false;
    movingUp = false;
  } else if (key == 39 && movingLeft == false) {
    /* RIGHT */
    movingRight = true;
    movingDown = false;
    movingLeft = false;
    movingUp = false;
  } else if (key == 38 && movingDown == false) { 
    /* UP */
    movingRight = false;
    movingDown = false;
    movingLeft = false;
    movingUp = true;
  } else if (key == 37 && movingRight == false) {
    /* LEFT */
    movingRight = false;
    movingDown = false;
    movingLeft = true;
    movingUp = false;
  };
});

/* Ends game, duh! */
function gameOver() {
  clearInterval(movement);
};