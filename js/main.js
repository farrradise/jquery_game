// variables
var index = 0;
var screenWidth = $(document).width();
var screenHeight = $(document).height();
var startGame = [3, 2, 1, "START"];
var bubbles = ['bulle_1', 'bulle_2', 'bulle_3', 'bulle_4'];
var countBubble = 0;
var fish, trash, direction, sharkPos;
var speed = 8000;
var level = 0;
var counterPoints = 0;

$(function(){


  //bubbles when doc is ready
  setInterval(function(){ bubble(); }, 200);


  // start the game on click play
  $('.start').click(function (){
    $('.start span').fadeOut(350,
      function(){
        $(this).remove();
        $(".start").html('<span></span>');
        // $(".start span").addClass('');

        startFadeOut();
    });
  });


  // trigger the event of shark movement
  $('.control > div:not(.instructions)').mousedown(function() {
    direction = $(this).attr("class");
    $(document).trigger('keydown', direction);
  });


  // allow the shark to move
  $(document).keydown(function(e, direction){
    shark = parseInt($('.shark img').css('left'));

    // if left arrow/keyboard
    if (e.which == 37 || direction == 'left') {
      if (shark > 0) {
        $('.shark img').css('left', shark-20);
      }
    }
    // if right arrow/keyboard
    if (e.which == 39 || direction == 'right') {
      if (shark < 420) {
        $('.shark img').css('left', shark+20);
      }
    }
  });


  // check if shark and fishes meet
  setInterval(function(){ isEaten(); }, 500);

});




function startFadeOut() {

  setTimeout(function () {
    $(".start span").fadeIn(300).delay(900).fadeOut(300);
    $(".start span").text(startGame[index]);

     if (index != startGame.length - 1) {
        startFadeOut();
     }
     else {
       $(".start").fadeOut(1450, function () {
         setTimeout(function() {
           $(".start").remove();
         }, 750);

         // game start HERE
         gameIsStarted();
         linterval = setInterval(function(){ gameIsStarted(); }, 4000 );

         //trash
         setInterval(function(){ trashStarted(); }, 15000 );
       });
     }
     index++;
  }, 1500)
}

function bubble() {
  var screenWidth =  $(document).width();
  var imgBubble = bubbles[Math.floor(Math.random()*bubbles.length)];
  var randomLeft = Math.floor(Math.random()*screenWidth);
  $('body').prepend("<img src='img/"+imgBubble+".png' alt='bubbles'>");

  var lastImg = $('body > img:first-of-type');
  lastImg.offset( {left: randomLeft });

  // bubble speed
  if (screenHeight < 300) {
    lastImg.animate({top : '-=120vh'}, 2000, function(){$(this).remove();});
  } else if ( screenHeight < 500) {
    lastImg.animate({top : '-=120vh'}, 8000, function(){$(this).remove();});
  } else {
    lastImg.animate({top : '-=120vh'}, 12000, function(){$(this).remove();});
  }
}

function gameIsStarted() {
  var randomLeft = Math.floor(Math.random()*450);

  // Fishes
  if (fish == "poisson1") {
    fish = 'poisson2';
  }  else {
    fish = 'poisson1';
  }

  $('main .surfaceGame').prepend("<img src='img/"+fish+".png' class=\"poisson notCounted\" alt='fish'>");
  var lastFish = $('main .surfaceGame img:first-of-type');
  var offsetLastFish = lastFish.offset();
  var offsetLeftLastFish = Math.floor(offsetLastFish.left);
  lastFish.offset({left : randomLeft + offsetLeftLastFish })
  lastFish.animate({top : '+=450'}, speed, function(){$(this).remove();});
  if (speed > 2000) {
    speed -= 50;
  }


  // Condition to check state of progress of the game. and adapt the speed of the interval
  if ( speed < 6000 && level == 0) {
    clearInterval(linterval);
    level++;
    linterval = setInterval(function(){ gameIsStarted(); }, 3000 );
  } else if (speed < 4000 && level == 1) {
    clearInterval(linterval);
    level++;
    linterval = setInterval(function(){ gameIsStarted(); }, 2000 );
  } else if (speed < 2000 && level == 2) {
    clearInterval(linterval);
    level++;
    linterval = setInterval(function(){ gameIsStarted(); }, 1000 );
  }

}

function trashStarted () {
  var randomLeft = Math.floor(Math.random()*450);

  // trashes
  if (trash == "trash_1") {
    trash = 'trash_3';
  }  else {
    trash = 'trash_1';
  }

  $('main .surfaceGame').prepend("<img src='img/"+trash+".png' class=\"poisson notCounted\" alt='trash'>");
  var lastTrash = $('main .surfaceGame img:first-of-type');
  var offsetLastTrash = lastTrash.offset();
  var offsetLeftLastTrash = Math.floor(offsetLastTrash.left);
  lastTrash.offset({left : randomLeft + offsetLeftLastTrash })
  lastTrash.animate({top : '+=450'}, speed, function(){$(this).remove();});
}

function isEaten () {
  // shark position
  sharkPosLeft = parseInt($('.shark img').css('left')) - 20; // +65
  sharkPosBottom = parseInt($('.shark img').css('bottom'));
  var fishIsCounted = 0;

  // items position (loop)
  $('.surfaceGame img.notCounted').each(function(index){
    foodPosLeft = parseInt($(this).css('left')); // +65
    foodPosBottom = parseInt($(this).css('bottom'));

    if ((foodPosLeft > sharkPosLeft) && (foodPosLeft < (sharkPosLeft+55)) && (foodPosBottom > sharkPosBottom) && (foodPosBottom < (sharkPosBottom+50))) {
      $(this).clearQueue().animate({opacity : '0'}, 240, function() {
        $(this).removeClass('notCounted');
        // mettre son
        points($(this));
      });
    };
  });
}

function points (img) {

  if (img.attr('src') === "img/poisson1.png") {
    counterPoints++;
  } else if (img.attr('src') === "img/poisson2.png") {
    counterPoints+=2;
  } else if (img.attr('src') === "img/trash_3.png") {
    counterPoints--;
  } else {
    counterPoints-=5;

  }

  $('.points span').text(counterPoints);
}

// 3 choses à faire
// bug sur le comptage des points (parfois en boucle)
