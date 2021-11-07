var canvas, backgroundImage;

var gameState = 0;
var playerCount;

var database;

var form, player, game;

var allPlayers, distance = 0;

var cars, car1, car2, car3, car4;
var car1Img, car2Img, car3Img, car4Img, trackImg;
var FinishedPlayers = 0;
var pastFinish;
var badge1, badge2, badge3

function preload(){
  car1Img = loadImage("images/car1.png");
  car2Img = loadImage("images/car2.png");
  car3Img = loadImage("images/car3.png");
  car4Img = loadImage("images/car4.png");
  trackImg = loadImage("images/track.jpg");
  badge1 = loadImage("images/1badge.png");
  //badge2 = loadImage("images/2badge.jpg");
  badge3 = loadImage("images/3badge.png");
  
}


function setup(){
  canvas = createCanvas(displayWidth,displayHeight - 150);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
  
}


function draw(){
  background("red");
  if(playerCount === 4 && FinishedPlayers === 0){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(FinishedPlayers === 4){
    game.update(2);
  }
  if(gameState === 2){
    game.end();
  }
 
  console.log(displayHeight);
}
