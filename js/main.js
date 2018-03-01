$(function(){

  var screenWidth = $(document).width(), bubbles = ['bulle_1', 'bulle_2', 'bulle_3', 'bulle_4'];
  var countBubble = 0;

  //bubbles when doc is ready
  setInterval(function(){
    var imgBubble = bubbles[Math.floor(Math.random()*bubbles.length)];
    var randomLeft = Math.floor(Math.random()*screenWidth);
    $('body').prepend("<img src='img/"+imgBubble+".png' alt='bubbles'>");

    var lastImg = $('body > img:first-of-type');
    lastImg.offset( {left: randomLeft });
    lastImg.animate( 7000, function () {
      $(this).css({'top', -=100vh;'});
    });
    // lastImg.offset().left(400);
    // $('body > img:first-of-type').animate(3500, function() {
      // $(this).css('top', '100vh');
      // $(this).css('border', '3px solid yellow');
    // });

    // xImg = $('body img').offset().
    // $('body img').animate({params},speed,callback);;
    // alert(xImg.left);
    // alert(countBubble);
    // countBubble++;

  }, 200);
  // ajouter une image toutes les 1500ms
  // image au hasard entre 1 et 4
  // css mettre un position absolute top - 40px
  // prendre un left au hasard par rapport à la window


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
           $(".start").remove();
         }, 750);

         // mettre ici appel au demarrage du jeu
         // alert('test');
       });
     }
     index++;
  }, 1500)
}
