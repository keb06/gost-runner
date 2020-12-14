var tower,tower_image;
var door,door_image,doorsGroup;
var climber,climber_image,climbersGroup;
var ghost,ghost_image;
var invisibleBlock,invisibleBlockGroup;
var gameState = "play";
var spooky_sound;

function preload () {
  tower_image=loadImage("tower.png");
  door_image=loadImage("door.png");
  climber_image =loadImage("climber.png");
  ghost_image = loadImage("ghost-standing.png");
  spooky_sound =loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  
  tower = createSprite(300,300);
  tower.addImage(tower_image);
  tower.velocityY=1;
  
  ghost = createSprite(200,200);
  ghost.addImage(ghost_image);
  ghost.scale =0.4;
  
  doorsGroup = createGroup();
  climbersGroup = createGroup();
  invisibleBlockGroup =createGroup();
  
  spooky_sound.loop();
  
}


function draw (){
  background("white");
  
  if(gameState==="play"){
    
  
  
  if(tower.y>400){
    tower.y= 300;
  }
  
  if (keyDown("left_Arrow")){
    ghost.x = ghost.x -5;
  }
  
  if (keyDown("right_Arrow")){
    ghost.x = ghost.x+5;
    
    }
  
  if (keyDown("space")){
    ghost.velocityY = -5;
  }
  
  ghost.velocityY =ghost.velocityY + 1;
  
  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY =0;
  }
  
  if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
    ghost.destroy();
    gameState="End";
  }
  
  
  
  spawnDoors();
  
  drawSprites();
    
  }
  if(gameState ==="End"){
    textSize(30);
    text("gameOver",230,250);
    
  }
}

function spawnDoors(){
  if (frameCount % 240===0){
    var door =createSprite(200,-40);
    door.addImage(door_image);
    door.x =Math.round(random(120,400));
    door.velocityY = 2;
    door.lifetime = 800;
    doorsGroup.add(door);
    
    //creating climber
    var climber = createSprite(200,10);
    climber.addImage(climber_image);
    climber.x= door.x;
    climber.velocityY= 2;
    climber.lifetime=800;
    climbersGroup.add(climber);
    
    var invisibleBlock =createSprite(200,15);
    invisibleBlock.x = door.x;
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    invisibleBlock. velocityY=2;
    invisibleBlock.lifetime=800;
    invisibleBlockGroup.add( invisibleBlock);
    invisibleBlock.debug=true;
    
    ghost.depth =door.depth;
    ghost.depth = ghost.depth +1;
    
    
  }
}













































































