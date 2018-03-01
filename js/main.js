// variables
var index = 0;
var screenWidth = $(document).width();
var screenHeight = $(document).height();
var bubbles = ['bulle_1', 'bulle_2', 'bulle_3', 'bulle_4'];
var countBubble = 0;



$(function(){


  //bubbles when doc is ready
  setInterval(function(){ bubble(); }, 200);


  // start the game on click play
  $('.start').click(function (){
    $('.start span').fadeOut(350,
      function(){
        $(this).remove();
        $(".start").html('<span></span>');
        $(".start span").addClass('test');

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

  var startGame = [3, 2, 1, "START"];
  setTimeout(function () {
    $(".start span").fadeIn(300).delay(900).fadeOut(300);
    $(".start span").text(startGame[index]);

     if (index != startGame.length - 1) {
        startFadeOut();
     } else {
       $(".start").fadeOut(1450, function () {
         setTimeout(function() {
           $(".start").remove();
         }, 750);

         // mettre ici appel au demarrage du jeu
         // alert('test');
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
