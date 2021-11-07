class Player {
  constructor(){
    this.index = null;
    this.distance = 0;
    this.name = null;
    this.rank = 0;
  }

  getCount(){
    var playerCountRef = database.ref('playerCount');
    playerCountRef.on("value",function(data){
      playerCount = data.val();
    })
  }



  updateCount(count){
    database.ref('/').update({
      playerCount: count
    });
  }

  update(){
    var playerIndex = "players/player" + this.index;
    database.ref(playerIndex).set({
      name:this.name,
      distance:this.distance,
      rank:this.rank,
    });
  }

  static getPlayerInfo(){
    var playerInfo = database.ref("players");
    playerInfo.on("value",(data)=>{
      allPlayers = data.val();
    })
    
  }

  getFinishedPlayer(){
    var FinishedPlayerRef = database.ref("FinishedPlayers");
    FinishedPlayerRef.on("value",(data)=>{
      FinishedPlayers = data.val();
    })
  }

  static updatedFinishedPlayers(){
    database.ref("/").update({
      FinishedPlayers:FinishedPlayers + 1
    });
    this.rank += 1;
  }
}
