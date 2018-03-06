// variables
var index = 0;
var screenWidth = $(document).width();
var screenHeight = $(document).height();
var startGame = [3, 2, 1, "START"];
var bubbles = ['bulle_1', 'bulle_2', 'bulle_3', 'bulle_4'];
var countBubble = 0;
var fish;
var speed = 8000;

$(function(){


  //bubbles when doc is ready
  // setInterval(function(){ bubble(); }, 200);


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


  // allow the shark to move
  // code here
  $(document).keydown(function(e){
    shark = parseInt($('.shark img').css('left'));

    // if right arrow/keyboard
    if (e.which == 37) {
      if (shark > 0) {
        $('.shark img').css('left', shark-20);
      }
    }
    // if left arrow/keyboard
    if (e.which == 39) {
      if (shark < 420) {
        $('.shark img').css('left', shark+20);
      }
    }
  });

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

         // mettre ici appel au demarrage du jeu
         setInterval(function(){ gameIsStarted(); }, 4000 );
         setInterval(function(){ if (speed < 7900) {
           setInterval(function(){ gameIsStarted(); }, 4000 );
         } }, 2000 );

       });
     }
     index++;
  }, 1500)
}


function bubble() {
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

  $('main .surfaceGame').prepend("<img src='img/"+fish+".png' class=\"poisson\" alt='fish'>");
  var lastFish = $('main .surfaceGame img:first-of-type');
  var offsetLastFish = lastFish.offset();
  var offsetLeftLastFish = Math.floor(offsetLastFish.left);
  lastFish.offset({left : randomLeft + offsetLeftLastFish })
  lastFish.animate({top : '+=450'}, speed, function(){$(this).remove();});
  if (speed > 1000) {
    speed -= 50;
  }
  // speed2 -=350;
  // alert(speed2);
  // meme principe que pour les bulles : faire un set interval MAIS un interval de plus en plus petit
  // animer ce poisson pour qu'il descende jusqu'en bas de la surface de jeu div.surfaceGame
  // le supprimer quand il n'est plus dans la surface de jeu



  // trashes
  //meme principe que pour les poissons mais un autre set interval
}
