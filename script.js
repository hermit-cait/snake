let score = 0,
boardSize = 16,
speed = 250,
/* Higher number = slower */
/* Lower number = faster  */
movingRight = true,
movingDown = false,
movingLeft = false,
movingUp = false,
validApple = false,
snakeHead = [2, 6],
snakeBody = [
  [2, 6],
  [2, 5],
  [2, 4],
  [2, 3],
  [2, 2]
];

$(document).ready(function() { 
  $(".start").click(function() {
    /* Hide info and show game screen */
    $(".welcome-screen").hide();
    $(".board").show();
    $(".controls").show().css("display", "flex"); 
    createBoard();
    positionApple();
    startGame();
    $(".restart").click(restartGame); 
  });
});

function startGame() {
  movement = setInterval(updateSnakeBody, speed);
  $(".restart").prop('disabled', true);
  $(".overlay").hide();
};

function restartGame() {
  gameOver();  
  $(".score").html("<span>score: " + score + "</span>");
  score = 0,
  movingRight = true,
  movingDown = false,
  movingLeft = false,
  movingUp = false,
  snakeHead = [2, 6],
  snakeBody = [
    [2, 6],
    [2, 5],
    [2, 4],
    [2, 3],
    [2, 2]
  ];
  positionApple();
  startGame();
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
  $(".board").append("<div class='overlay'></div>");
  $(".score").html("<span>score: " + score + "</span>");
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
  var newCell = $('tr').eq(snakeNewHead[0]).find('td').eq(snakeNewHead[1]);
  if (newCell.hasClass("snake-body")) {
    gameOver();
  } else {
    if (newCell.hasClass("apple")) {
      snakeBody.push([newCell]);         
      score++;   
      $(".score").html("<span>score: " + score + "</span>");
      positionApple();
    };
  }; 
  createSnake(); 
};

/* Places apple in a random cell */
function positionApple() {
  apple = [getRandomInt(1, 15), getRandomInt(1, 15)];
  //apple = [getRandomInt(2, 6), getRandomInt(2, 6)];
  newApple = $("tr").eq(apple[0]).find("td").eq(apple[1]);
  while (validApple == false) {  
    if (newApple.hasClass("snake-body")) {
      console.log("APPLE ON SNAKE", newApple);
      applePositionY = getRandomInt(1, 15);
      applePositionX = getRandomInt(1, 15); 
      //applePositionY = getRandomInt(2, 6);
      //applePositionX = getRandomInt(2, 6); 
      newApple = $("tr").eq(applePositionY).find("td").eq(applePositionX);
      apple = [applePositionY, applePositionX];
      console.log(applePositionY, applePositionX, newApple);
    } else {
      console.log("apple okay", newApple, apple);
      createApple();
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
  console.log("apple created", apple);
};

/* Random number generation */

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

function createOverlay() {
  $(".overlay").html("<div class='overlay-text'><p class='over'>game over!</p><p>your score was " + score + ". </p></div>");
  $(".overlay-text").append("<span class='close'>x</span>");  
  $(".close").click(function() {
    $(".overlay").hide();
  });
  if (score < 5) {
    $(".overlay-text").append("<p>you need more practice.</p>");
  } else if (score < 10) {
    $(".overlay-text").append("<p>that is not too shabby... </p>");
  } else {
    $(".overlay-text").append("<p>you're good at this! well done!</p>");
  };
};

function gameOver() {
  clearInterval(movement);
  $(".restart").prop('disabled', false);
  createOverlay();
  $(".overlay").show();  
};