$(document).ready(function() {
  createBoard();
  createApple();
  startGame();
});

let direction = "right",
  score = 0,
  boardSize = 20;
  speed = 150,
  /* Higher number = slower */
  /* Lower number = faster  */
  movingRight = true,
  movingDown = false,
  movingLeft = false,
  movingUp = false,
  apple = [],
  validApple = false,
  snakeHead = [2, 6],
  snakeBody = [
    [2, 6],
    [2, 5],
    [2, 4],
    [2, 3],
    [2, 2]
  ];

function startGame() {
  movement = setInterval(updateSnakeBody, speed);
};

function createBoard() {
  let boardRow = "";
  for (let i = 0; i < boardSize; i++) {
    boardRow += "<td></td>";
  };
  boardArray = [];
  for (let i = 0; i < boardSize; i++) {
    boardArray.push("<tr>" + boardRow + "</tr>");
  }
  $(document.body).append("<table class='board'></table>");
  $(".board").html(boardArray);
  positionApple();
};

/* Changes cell colours to make snake visible */
function createSnake() {
  $("td").removeClass("snake-body snake-head");
  for (let cell in snakeBody) {
    $("tr").eq(snakeBody[cell][0]).find("td").eq(snakeBody[cell][1]).addClass("snake-body");
  }
  $("tr").eq(snakeHead[0]).find("td").eq(snakeHead[1]).addClass("snake-head");
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
  function checkForWall() {
    if (snakeNewHead[0] < 1 || snakeNewHead[1] < 1) {
      gameOver();
    } else if (snakeNewHead[0] >= boardSize - 1 || snakeNewHead[1] >= boardSize - 1) {
      gameOver();
    };
  };
  checkForWall();

  /* Handles movement of snake body by giving each cell the position of the previous cell in the array */
  for (var i = (snakeBody.length - 1); i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
    /* Fix for bug involving fast direction changes */ 
    if (snakeBody[i][0] == snakeNewHead[0] && snakeBody[i][1] == snakeNewHead[1]) {    
      if (movingLeft == true) {
        snakeNewHead = [snakeHead[0], snakeHead[1] + 1];
        } else if (movingUp == true) {
          snakeNewHead = [snakeHead[0] + 1, snakeHead[1]];       
        } else if (movingRight == true) {
          snakeNewHead = [snakeHead[0], snakeHead[1] - 1];
        } else if (movingDown == true) {
          snakeNewHead = [snakeHead[0] - 1, snakeHead[1]];
        };
      checkForWall();
    };
  };  
  
  /* Saves new position of snake head */
  snakeHead = snakeNewHead;
  /* Assigns it as first cell of snake body */
  snakeBody[0] = snakeHead;

  /* Checks if snake eats apple and increments size and checks if snake hits self and then stops game */
  var newCell = $('tr').eq(snakeNewHead[0]).find('td').eq(snakeNewHead[1]);
  if (newCell.hasClass("snake-body")) {
    if (movingRight == true) {
      snakeHead = [snakeHead[0], snakeHead[1] + 1];
      } else if (movingDown == true) {
        snakeHead = [snakeHead[0] + 1, snakeHead[1]];       
      } else if (movingLeft == true) {
        snakeHead = [snakeHead[0], snakeHead[1] - 1];
      } else if (movingUp == true) {
        snakeHead = [snakeHead[0] - 1, snakeHead[1]];
      };
    gameOver();
  } else {
    if (newCell.hasClass("apple")) {
      snakeBody.push([]);         
      score++;   
      $(".score").html("<span>score: " + score + "</span>");
      positionApple();
      createApple();
    };
  }; 
  createSnake(); 
};

/* Places apple in a random cell */
function positionApple() {
  apple = [getRandomNumber($("tr").length), getRandomNumber($("tr:eq(0)>td").length)];
  //apple = [getRandomInt(2, 6), getRandomInt(2, 6)];
  let newApple = { length: 0 };
  newApple = $("tr").eq(apple[0]).find("td").eq(apple[1]);
  while (validApple == false) {  
    if (newApple.hasClass("snake-body")) {
      console.log("apple on snake", newApple);
      applePositionY = getRandomNumber(totalCells);
      applePositionX = getRandomNumber(totalCells); 
      //applePositionY = getRandomInt(2, 6);
      //applePositionX = getRandomInt(2, 6); 
      newApple = $("tr").eq(applePositionY).find("td").eq(applePositionX);
      console.log(newApple);
    } else {
      console.log("apple okay", newApple);
      validApple = true;
      break;
    };
  };
  validApple = false;
};

/* Changes cell colours to make apple visible */
function createApple() {
  $("td").removeClass("apple");
  $("tr").eq(apple[0]).find("td").eq(apple[1]).addClass("apple");
};

/* Random number generation */
function getRandomNumber(totalCells) {
  return parseInt(Math.random() * totalCells % totalCells);
};

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

function gameOver() {
  clearInterval(movement);
};