class Form {
  constructor() {
    this.input = createInput("Name");
    this.button = createButton('Play');
    this.greeting = createElement('h3');
    this.reset = createButton('reset');
  }

  hide(){
    this.title.hide();
    this.input.hide();
    this.button.hide();
    this.greeting.hide();
  }

  display(){
     this.title = createElement('h2')
    this.title.html("Car Racing Game");
    this.title.position(displayWidth/2 - 110, displayHeight/4 - 50);
    
   
    
    this.input.position(displayWidth/2 - 100, displayHeight/4 + 50);
    this.button.position(displayWidth/2 - 40, displayHeight/4 + 100);
    this.reset.position(displayWidth - 50, displayHeight/5 - 160);

    this.button.mousePressed(()=>{
      this.input.hide();
      this.button.hide();

      player.name = this.input.value();
      
      playerCount+=1;
      player.index = playerCount;
      player.update()
      player.updateCount(playerCount);    
      this.greeting.html("Hello " + player.name)
      this.greeting.position(displayWidth/2 - 50, displayHeight/4)
    });
    this.reset.mousePressed(()=>{
       player.updateCount(0);
       game.update(0);
       database.ref("/").update({
         player:null,
         FinishedPlayers:0,
       });
    })

  }
}
