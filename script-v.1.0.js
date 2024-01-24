$(document).ready(function() { 
  var gameId;
  const snake = $(".snake");  
  var gameReady = false;
  var movingRight = true;
  var movingDown = false;
  var movingLeft = false;
  var movingUp = false;
  var containerWidth = parseInt($(".game-container").width());      
  var containerHeight = parseInt($(".game-container").height());
  var speed = 4;
  $(".start").click(function() {
    /* Hide info and show game screen */
    $(".welcome-screen").fadeOut(300);
    $(".game-container").delay(300).fadeIn(300);
    $(".controls").delay(300).fadeIn(300);  
    /* Prevents the snake from moving before the player is ready to start */   
    gameReady = true; 
  });
  var gameStart = function() {
    moveSnake(); 
    /* Kill snake if it touches container */
    if (parseInt(snake.css("top")) >= 2 && parseInt(snake.css("top")) <= containerHeight - 10 && parseInt(snake.css("left")) >= 2 && parseInt(snake.css("left")) <= containerWidth - 10) {   
      gameId = requestAnimationFrame(gameStart);
    } else {
      cancelAnimationFrame(gameId);
    };
  }; 
  gameId = requestAnimationFrame(gameStart);  
  /* This function controls the direction of the snake... This will have to be re-worked later as the snake needs to be broken into segments which can form patterns but move as a whole */
  function moveSnake() {
    if (gameReady == true && movingRight == true) {
      snake.css("transform", "rotate(180deg)");
      snake.css("left", parseInt(snake.css("left")) + speed);
    } else if (gameReady == true && movingDown == true) {
      snake.css("transform", "rotate(90deg)");
      snake.css("top", parseInt(snake.css("top")) + speed);    
    } else if (gameReady == true && movingLeft == true) {
      snake.css("transform", "rotate(180deg)");
      snake.css("left", parseInt(snake.css("left")) - speed);
    } else if (gameReady == true && movingUp == true) {
    snake.css("transform", "rotate(90deg)");
    snake.css("top", parseInt(snake.css("top")) - speed);
    };      
  };
  /* Controls for testing which will be removed later */
  $(".pause").click(function() {      
    cancelAnimationFrame(gameId);
  });
  $(".play").click(function() {    
    gameStart();
  });
  /* Functionality of arrow keys */
  $(document).on("keydown", function(e) {
    var key = e.keyCode;
    e.preventDefault();
    if (key == 40) {
      /* DOWN */
      movingRight = false;
      movingDown = true;
      movingLeft = false;
      movingUp = false;
    } else if (key == 39) {
      /* RIGHT */
      movingRight = true;
      movingDown = false;
      movingLeft = false;
      movingUp = false;
    } else if (key == 38) { 
      /* UP */
      movingRight = false;
      movingDown = false;
      movingLeft = false;
      movingUp = true;
    } else if (key == 37) {
      /* LEFT */
      movingRight = false;
      movingDown = false;
      movingLeft = true;
      movingUp = false;
    };
  });
});