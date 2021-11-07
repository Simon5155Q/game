var score = 0;
var highScore = 0;
var PLAY = 1;
var END = 0;
var START = 2;
var gameState = START;
var water, waterImg;
var coinG, coinImg;
var obstaclesGroup, obstacleImg, obstacle2Img;
var gameOverG, gameOverImg;
var playButtonG, playButtonImg;
var flappyFishG;
var continueG, continueImg;
var fish, fishImg, deadFishImg;
var title;
var edges, edge1, edge2, edge3, edge4;

function preload(){
  waterImg = loadImage("images/sprite_8.png");
  coinImg = loadImage("images/sprite_10.png");
  obstacleImg = loadImage("images/sprite_5.png");
  obstacle2Img = loadImage("images/sprite_4.png");
  gameOverImg = loadImage("images/sprite_1.png");
  playButtonImg = loadImage("images/sprite_9.png");
  continueImg = loadImage("images/sprite_0.png");
  fishImg = loadAnimation("images/sprite_6.png", "images/sprite_7.png");
  deadFishImg = loadAnimation("images/sprite_3.png");
  title = loadImage("images/sprite_11.png");
}

function setup(){
  var canvas = createCanvas(400,400);
   water = createSprite(200, 200);
   coinG = createGroup();
   obstaclesGroup = createGroup();
   gameOverG = createGroup();
   playButtonG = createGroup();
   flappyFishG = createGroup();
   continueG = createGroup();
   edges = createGroup();
   fish = createSprite(320, 200, 1, 1);
}
function draw() {
  background("blue");
  water.addImage(waterImg);
  fish.setCollider("rectangle", 0, 0, 10, 10);
  if (score > highScore ) {
   highScore = score; 
  }
  if(gameState === START){
    var playButton = createSprite(200, 200);
    var flappyFish = createSprite(200, 50);
    flappyFish.addImage(title);
    playButton.addImage(playButtonImg);
    playButton.scale = 0.04;
    gameOverG.destroyEach();
    coinG.destroyEach();
    obstaclesGroup.setVelocityXEach(0);
    coinG.setVelocityXEach(0);
    flappyFishG.add(flappyFish);
    fish.velocityY = 0;
    water.velocityX = 0;
    playButtonG.add(playButton);
    if (mousePressedOver(playButton)) {
      gameState = PLAY;
    }
  }
  if (gameState === PLAY) {
    if (mousePressedOver(playButton)) {
      playButtonG.destroyEach();
      flappyFishG.destroyEach();
      fish.visible = true;
    }
    if (keyDown("space")) {
    fish.velocityY = -9;
    }
    water.velocityX = 5;
    if (water.x > 400) {
    water.x = water.width/2; 
    }
    fish.addAnimation("fish", fishImg);
    fish.scale = 1;
    water.scale = 2.5;
    fish.velocityY = fish.velocityY + 0.8;
    if (obstaclesGroup.isTouching(fish)) {
      gameState = END;
    }
    if (coinG.isTouching(fish)) {
      score = score + 1;
      coinG.destroyEach();
    }
    if (fish.y >= 400 || fish.y <= 0) {
      gameState = END;
    }
    createObstacle();
  }
  if (gameState === END) {
    var gameOver = createSprite(200, 200);
    var continue1 = createSprite(200, 335);
    gameOverG.add(gameOver);
    gameOverG.add(continue1);
    gameOver.addImage(gameOverImg);
    fish.changeAnimation("fish",deadFishImg);
    continue1.addImage(continueImg);
    continueG.add(continue1);
    gameOver.scale = 0.4;
    continue1.scale = 0.4;
    fish.scale = 0.6;
    fish.velocityY = 0;
    water.velocityX = 0;
    coinG.setLifetimeEach(-1);
    coinG.setVelocityXEach(0);
    obstaclesGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    if (water.x > 400) {
    water.x = water.width/2; 
    }
    if (mousePressedOver(continue1)) {
      gameState = START;
      fish.x = 320;
      fish.y = 200;
      obstaclesGroup.destroyEach();
      fish.visible = false;
      score = 0;
    }
  }
  drawSprites();
  fill("yellow");
  stroke("yellow");
  textSize(20);
  text("Score: " + score, 320, 60);
  fill("green");
  stroke("green");
  text("HighScore: " + highScore, 280, 100);
  fill("red");
  stroke("red");
  text("Press space to jump", 110, 360);

}
function createObstacle() {
 obstaclesGroup.setLifetimeEach(300);
 if (World.frameCount % 60 === 0) {
    var obstacle = createSprite(100, 200);
    obstacle.addImage(obstacleImg);
    obstacle.y = Math.round(random(-30,80));
    obstacle.scale = 1;
    obstacle.velocityX = 5;
    obstacle.lifetime = 134;
    obstaclesGroup.add(obstacle);
 }
 if (World.frameCount % 60 === 0) {
     var coin = createSprite(200, 200);
     coin.addImage(coinImg);
     coin.y = Math.round(random(130,280));
     coin.velocityX = 5;
     coin.lifetime = 134;
     coinG.add(coin);
 }
 if (World.frameCount % 60 === 0) {
     var obstacle2 = createSprite(100, 200);
     obstacle2.addImage(obstacle2Img);
     obstacle2.y = Math.round(random(450,350));
     obstacle2.scale = 1;
     obstacle2.velocityX = 5;
     obstacle2.lifetime = 134;
     obstaclesGroup.add(obstacle2);
 }
}
