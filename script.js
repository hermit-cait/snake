$(document).ready(function() {  
  let gameId;
  const snake = $(".snake");  
  //const apple = $(".apple");
  let gameReady = false;
  let movingRight = true;
  let movingDown = false;
  let movingLeft = false;
  let movingUp = false;
  //let containerWidth = parseInt($(".game-container").width());      
  //let containerHeight = parseInt($(".game-container").height());
  $(".start").click(function() {
    /* Hide info and show game screen */
    $(".welcome-screen").fadeOut(300);
    $(".game-container").delay(300).fadeIn(300);
    $(".controls").delay(300).fadeIn(300);  
    /* Prevents the snake from moving before the player is ready to start */   
    gameReady = true;
  });
  let game = function() {
    moveSnake();    
    gameId = requestAnimationFrame(game);
  };  
  gameId = requestAnimationFrame(game);  
  /* This function controls the direction of the snake... This will have to be re-worked later as the snake needs to be broken into segments which can form patterns but move as a whole */
  function moveSnake() {
    if (gameReady == true && movingRight == true) {
      snake.css("transform", "rotate(180deg)");
      snake.css("left", parseInt(snake.css("left")) + 1);
    } else if (gameReady == true && movingDown == true) {
      snake.css("transform", "rotate(90deg)");
      snake.css("top", parseInt(snake.css("top")) + 1);    
    } else if (gameReady == true && movingLeft == true) {
      snake.css("transform", "rotate(180deg)");
      snake.css("left", parseInt(snake.css("left")) - 1);
    } else if (gameReady == true && movingUp == true) {
    snake.css("transform", "rotate(90deg)");
    snake.css("top", parseInt(snake.css("top")) - 1);
    };
  };
  /* Controls for testing which will be removed later */
  $(".pause").click(function() {    
    cancelAnimationFrame(gameId);
  });
  $(".play").click(function() {    
    game();
  });
  /* Functionality of arrow keys */
  $(document).on("keydown", function(e) {
    let key = e.keyCode;
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