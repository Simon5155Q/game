class Game {
  constructor(){}
  
  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })
   
  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }


 async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref("playerCount").once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }     
      form = new Form()
      form.display();    
    }
  car1 = createSprite(100, 200);
  car2 = createSprite(300, 200);
  car3 = createSprite(500, 200);
  car4 = createSprite(700, 200);

  car1.addImage(car1Img);
  car2.addImage(car2Img);
  car3.addImage(car3Img);
  car4.addImage(car4Img);



  cars = [car1, car2, car3, car4];

  pastFinish = false;
  }

    play(){
    background("black");
    image(trackImg, 0, -displayHeight * 4, displayWidth, displayHeight * 5);
   form.hide();
   text("Gamestart", 120, 100);
   Player.getPlayerInfo();
   player.getFinishedPlayer();
   /*if(allPlayers !== undefined){
    var displayPos = 130;
    for(var plr in allPlayers){
      if(plr === "player" + player.index){
        fill("red");
      }
      else{
        fill("black");
      }
      displayPos += 20;
      text(allPlayers[plr].name + ":" + allPlayers[plr].distance, 120, displayPos);
    }
    
   }
   if(keyIsDown(UP_ARROW) && player.index !== null){
    player.distance += 50;
    player.update();
  }*/
if(allPlayers !== undefined){
  var Index = 0;
  var x = 250;
  var y;
  for(var plr in allPlayers){
    Index = Index + 1; 
    x = x + 300;
    y = displayHeight - allPlayers[plr].distance;
    cars[Index-1].x = x;
    cars[Index-1].y = y; 
 

 if(Index === player.index){
fill("red");
ellipse(x, y, 100, 120);
text(player.name, x - 10, y+90);
   camera.position.x = displayWidth/2;
   camera.position.y = cars[Index-1].y;
 }
}
}
 if(keyIsDown(UP_ARROW) && player.index !== null && pastFinish != true){
  player.distance += 50;
  player.update();
}
if(player.distance > 500 && pastFinish === false){
  Player.updatedFinishedPlayers();
  player.rank = FinishedPlayers;
  player.update();
  pastFinish = true;
}
 drawSprites();
   }


  
  end(){
    background("green");
    Player.getPlayerInfo();
    console.log("game ended");
    textSize(20);
    for(var plr in allPlayers){
      if(allPlayers[plr].rank === 1){
        text("First:" + allPlayers[plr].name, displayWidth/2, displayHeight/2);
        image(badge1, displayWidth/2 - 200, displayHeight/2);
      }
      else if(allPlayers[plr].rank === 2){
        text("Second:" + allPlayers[plr].name, displayWidth/2, displayHeight/2 + 200);
       // image(badge2, displayWidth/2 - 200, displayHeight/2 + 200);
      }
      else if(allPlayers[plr].rank === 3){
        text("Third:" + allPlayers[plr].name, displayWidth/2, displayHeight/2 + 400);
        image(badge3, displayWidth/2 - 200, displayHeight/2 + 400);
      }
    
    }
    
  }
}


