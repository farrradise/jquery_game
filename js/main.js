$(function(){

  // start the game on click play
  $('.start').click(function (){
    $('.start span').fadeOut(350,
      function(){
        $(this).remove();
        $(".start").html('<span></span>');

        startFadeOut();
    });
  });
});

var index = 0;



function startFadeOut() {

  var startGame = [3, 2, 1, "START"];
  setTimeout(function () {
    $(".start span").fadeIn(300, function () {
      // $('start span').delay(500).fadeOut(500);
    }).delay(900).fadeOut(300);
    $(".start span").text(startGame[index]);

     if (index != startGame.length - 1) {
        startFadeOut();
     } else {
       $(".start").fadeOut(1450, function () {
         setTimeout(function() {
           $(this).remove();
         }, 750);
         // mettre ici appel au demarrage du jeu
       });
     }
     index++;
  }, 1500)
}
