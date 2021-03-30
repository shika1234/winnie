class Game {
  constructor(){

  }

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
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
        player.getxPos();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(375,200);
    car2 = createSprite(575,200);
    car3 = createSprite(775,200);

    cars = [car1, car2, car3];
    car1.addImage(car1i);
    car1.scale=0.5;
    car2.addImage(car2i);
    car2.scale=0.5;
    car3.addImage(car3i);
    car3.scale=0.5;
  }

  play(){
    form.hide();

    player.getRank();

    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      background(track)
      
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        //x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        x = allPlayers[plr].distanceX
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
          fill("#9bffa8")
          stroke("black")
          ellipse(cars[index-1].x, cars[index-1].y , 60, 60)
        

        
      }
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
      console.log(player.distance)
    }
    if(keyIsDown(LEFT_ARROW) && player.index !== null){
      //cars[index-1].x=cars [index-1].x-10
      player.distanceX=player.distanceX-10
      player.update();
    }

    if(keyIsDown(RIGHT_ARROW) && player.index !== null){
      //cars[index-1].x=cars [index-1].x-10
      player.distanceX=player.distanceX+10
      player.update();
    }



    if (player.distance>3660){
      gameState=2
      player.rank=player.rank+1
      console.log(player.rank);
      Player.updateRank(player.rank)
    }

    drawSprites();
  }

  end(){
     console.log("game over");
     for (var i = 0; i< 4 ; i++){
       textSize(30);
       if(player.index==i+1){
        text(player.rank,cars[i].x,cars[i].y-100)
       }
     }
     gameState=3

  }
}
