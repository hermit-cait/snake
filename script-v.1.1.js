$(document).ready(function() {
  $(".start").click(function() {
    /* Hide info and show game screen */
    $(".welcome-screen").fadeOut(300);
    $(".board").show();
    $(".controls").show().css("display", "flex"); 
    createBoard();
    startGame();
    updateSnakeBody();      
    applePosition();
    createApple();

    /* Controls for testing which will be removed later */
    $(".pause").click(function() {      
      gameOver()
    });
    $(".play").click(function() {    
      startGame();
    });
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
        
      /* snakeHead = [1,1];
      snakeBody = [
        [1,1],
        [1,0]
      ]  */

      movement = null;
      movingRight = true;
      startGame();
      updateSnakeBody();
      applePosition();
      createApple();
    });
  });
});

var boardSize = 16;
var movement = null;
var movingRight = true;
var movingDown = false;
var movingLeft = false;
var movingUp = false;
/* Higher number = slower, lower number = faster */
var speed = 150;

var snakeHead = [2,6];
var snakeBody = [
  [2,6],
  [2,5],
  [2,4],
  [2,3],
  [2,2]
];

/* var snakeHead = [1,1];
var snakeBody = [
  [1,1],
  [1,0]
] */

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

  /* Handles movement of snake by updating snake body array and thus changing cell colour */
  for (var i = (snakeBody.length - 1); i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  };

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
  
  /* Saves new position of snake head */
  snakeHead = snakeNewHead;
  /* Assigns it as first cell of snake body */
  snakeBody[0] = snakeHead;

  var newCell = {
    length: 0
  };

  var newCell = $('tr').eq(snakeNewHead[0]).find('td').eq(snakeNewHead[1]);
  if (newCell.length == 0) {
    gameOver();
  } else {
    if (newCell.hasClass('snakeBody')) {
      gameOver();
    } else {
      if (newCell.hasClass('apple')) {
        snakeBody.push([]);      
        applePosition();
        createApple();
      };
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
  //console.log(snakeBody, snakeHead)
};

function applePosition() {

  
  applePositionY = getRandomInt(2,6);
  applePositionX = getRandomInt(2,6);
  apple = [applePositionY, applePositionX];

  /* NORMAL MODE */

  /* apple = null;
  var applePositionY = getRandomNumber($('tr').length);
  var applePositionX = getRandomNumber($('tr:eq(0)>td').length); 
  for (var i = 0; i < snakeBody.length; i++) {
    if (snakeBody[i][0] == applePositionY && snakeBody[i][1] == applePositionX) {
      console.log("apple was on snake: " + applePositionY, applePositionX);
      applePositionY = getRandomNumber($('tr').length);
      applePositionX = getRandomNumber($('tr:eq(0)>td').length)
    } else {
      apple = [applePositionY, applePositionX];
    };
  };  
  console.log(applePositionY, applePositionX); */

  /* EASY MODE */
  
  /* console.log(snakeBody);
  apple = null;
  var applePositionY = getRandomInt(2,6);
  var applePositionX = getRandomInt(2,6);
  while (apple == null) {
    for (var i = 0; i < snakeBody.length; i++) {
      if (snakeBody[i][0] == applePositionY && snakeBody[i][1] == applePositionX) {
        console.log("apple was on snake: " + applePositionY, applePositionX);
        applePositionY = getRandomInt(2,6);
        applePositionX = getRandomInt(2,6);
      } else {
        apple = [applePositionY, applePositionX];
        console.log("free apple: " + applePositionY, applePositionX);
      };
    };  
  }; */

  /* TEST MODE */

  /* apple = null;
  var applePositionY = getRandomInt(2,6);
  var applePositionX = getRandomInt(2,6);
  while (apple == null) {
    for (var i = 0; i < snakeBody.length; i++) {
      if (snakeBody[i][0] == applePositionY && snakeBody[i][1] == applePositionX) {      
        apple = [applePositionY, applePositionX];
        console.log("gotcha: " + applePositionY, applePositionX);
      } else {
        console.log("regenerating: " + applePositionY, applePositionX)
        applePositionY = getRandomInt(2,6);
        applePositionX = getRandomInt(2,6);
      };
    };
  }; */

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
  var key = e.keyCode;
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