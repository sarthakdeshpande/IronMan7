//creating variables
var bg, backgroundImg,ironman,imImage,stoneImg,stonesGroup,diamondImage,diamondsGroup,score = -9,spikesGroup,spikeImg;
var gameState = "PLAY",restart,restartImg;

//funtion preload for loading assets
function preload() {
  //loading images
  backgroundImg = loadImage("images/bg.jpg");
  imImage = loadImage("images/iron.png");
  stoneImg = loadImage("images/stone.png");
  diamondImage = loadImage("images/diamond.png");
  spikeImg = loadImage("images/spikes.png");
  restartImg = loadImage("images/restart.png")
}

//funtion setup for giving them properties
function setup() {
  
  createCanvas(1000, 600);

  //giving properties to background by using bg variable
  bg = createSprite(580,300);
  bg.addImage(backgroundImg);
  bg.scale = 2;

  //giving properties to ironman by using ironman variable
  ironman = createSprite(500,300,20,20);
  ironman.addImage(imImage);
  ironman.scale = 0.3;
  //ironman.debug = true;
  ironman.setCollider("rectangle",100,0,200,400);

  restart = createSprite(500,300);
  restart.addImage(restartImg);
  restart.scale=0.5;
  restart.visible = false;

  //making new groups for storing multipls variables
  stonesGroup = new Group();
  diamondsGroup = new Group();
  spikesGroup = new Group();
}


function draw() {

  if(gameState == "PLAY"){
    //using if condition for giving controls to ironman
    if(keyDown("up")){
      ironman.velocityY = -10;
    }

    if(keyDown("left")){
      ironman.x = ironman.x -5;
    }

    if(keyDown("right")){
      ironman.x = ironman.x +5;
    }
  
    //giving velocity to ironman is such a way it seems like gravity
    ironman.velocityY = ironman.velocityY + 0.5;

    //execution generate stone function and using for loop for taking 1 item one-by-one as they are local variable
    spawnStone();
    for(var i=1;i<stonesGroup.length;i++){
      var temp = stonesGroup.get(i);
      ironman.collide(temp);
      
    }

  //execution generate diamonds function and using for loop for taking 1 item one-by-one as they are local variable
    generateDiamonds();
    for(let i=1 ; i<diamondsGroup.length ; i++ ){
      let temp = diamondsGroup[i]
      if(ironman.isTouching(temp)){
        temp.destroy();
        score++
        temp=null;
      }
    }

    //execution generate spikes function and using for loop for taking 1 item one-by-one as they are local variable
    generateSpikes();
    for(let i=1 ; i<spikesGroup.length ; i++ ){
      let temp = spikesGroup[i]
      if(ironman.isTouching(temp)){
        temp.destroy();
        score = score - 5;
        temp=null;
      }
    }

    if(score < -10){
      gameState = "END";
      restart.visible = true;
    }
    if(ironman.y > 610){
      gameState = "END";
      restart.visible = true;
    }

  }else if(gameState == "END"){
    bg.velocityY = 0;
    ironman.velocityY = 0;
    spikesGroup.setVelocityYEach = 0;
    stonesGroup.setVelocityYEach = 0;
    diamondsGroup.setVelocityYEach = 0;
    spikesGroup.setLifetimeEach = -1;
    stonesGroup.setLifetimeEach = -1;
    diamondsGroup.setLifetimeEach = -1;

    if(mousePressedOver(restart)){
      restartGame();
    }
  } 
  
  

  
    
    drawSprites();

    //using text for creating score
    textSize(25);
    fill("white");
    text("SCORE: "+score,100,100);

    
   
}

//function for generating stones
function spawnStone(){
  //using if condition for spawing stone at every 50 frame
  if(frameCount%50==0){
    //giving propeeties to stone
    var stone = createSprite(random(100,900),-100);
    stone.addImage(stoneImg);
    stone.velocityY = 5;
    stonesGroup.add(stone);
    stone.lifetime = 600;
  }
}

//function for generating diamonds
function generateDiamonds(){
  //using if condition for spawing diamond at every 60 frame
  if( frameCount % 60 == 0 ){
    //giving propeeties to diamond
    var diamond = createSprite(random(100,900),-100);
    diamond . addImage(diamondImage);
    diamond.velocityY = 5;
    diamondsGroup.add(diamond);
    diamond.lifetime = 600;
  }
}

//function for generating spikes
function generateSpikes(){
  //using if condition for spawing spike at every 80 frame
  if( frameCount % 80 == 0 ){
    //giving propeeties to spike
    var spike = createSprite(random(100,900),-100);
    spike. addImage(spikeImg);
    spike.velocityY = 5;
    spikesGroup.add(spike);
    spike.lifetime = 600;
  }
}

function restartGame(){
  gameState = "PLAY";
  stonesGroup.destroyEach();
  diamondsGroup.destroyEach();
  spikesGroup.destroyEach();
  score = 0
  ironman.y = 50;
  restart.visible = false;
}