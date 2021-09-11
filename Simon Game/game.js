
var buttonColours=["red","blue","green","yellow"];
var level=0;
var run=0;
var gameStatus=0;
var userClickedPattern=[];
var gamePattern=[];
var randomNumber;
var randomChosenColour;
$(document).keypress(function(){if(gamePattern.length===0){nextSequence();}});
$(".btn").on("click",function(e){if(gamePattern.length>0){clicked(e.target.id);}});

function clicked(name)
{
playAudio(name);
animatePress(name);
if(!handler(name))
{
  $("h1").text("Game Over,Press any key to restart");
  $("body").toggleClass("game-over");
  level=0;
  run=0;
  gamePattern=[];
  gameStatus=1;
}
else
{
  run++;
  if(run==level)
  {
    nextSequence();
  }
};
}

function nextSequence()
{
  if(gameStatus==1)
  {
    $("body").toggleClass("game-over");
    gameStatus=0;
  }
  $("h1").text("level "+level);
  level++;
  run=0;
  randomNumber=Math.floor(Math.random()*4);
  randomChosenColour=buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  console.log(randomChosenColour);
    // AUDIO PLAY
  playAudio(randomChosenColour);
  animatePress(randomChosenColour);
}

function animatePress(buttonClicked)
{
  $("#"+buttonClicked).addClass("pressed");
  setInterval(function(){
    $("#"+buttonClicked).removeClass("pressed");
  },100);

}
function playAudio(buttonClicked)
{
  var audio=new Audio('sounds/'+buttonClicked+'.mp3');
  audio.play();
}


function handler(e)
{
  var userChosenColor=e;
  var game=gamePattern[run];
  userClickedPattern.push(userChosenColor);
  return (userChosenColor.normalize()===game.normalize());
}
