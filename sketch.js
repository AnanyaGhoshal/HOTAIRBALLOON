var hballoon; 
var database, position;
var cityImg, airy;

function preload(){

  cityImg = loadImage("cityImage.png");
  airy = loadAnimation("HotAirBallon-01.png","HotAirBallon-02.png","HotAirBallon-03.png");

}

function setup() {

  database = firebase.database();

  createCanvas(900,500);
  hballoon = createSprite(150, 350, 10, 10);
  hballoon.addAnimation("flying",airy);
  hballoon.scale = 0.5;
  var hballoonPosition = database.ref('Balloon/Position');
  hballoonPosition.on("value",readPosition,showError);

}

function draw() {

  background(cityImg);
  
  textSize(20);
  fill(255,20,100);
  stroke(0);
  strokeWeight(4);
  text("* * Use Arrow_Keys to move the Hot Air Balloon * *",30,50);

  if(keyDown(UP_ARROW)){

    writePosition(0,-5);
    hballoon.addAnimation("flying",airy);
    hballoon.scale = hballoon.scale-0.01;

  }
  else if(keyDown(DOWN_ARROW)){

    writePosition(0,+5);
    hballoon.addAnimation("flying",airy);
    hballoon.scale = hballoon.scale+0.01;


  }
  else if(keyDown(LEFT_ARROW)){

    writePosition(-5,0);

  }
  else if(keyDown(RIGHT_ARROW)){

    writePosition(5,0);

  }


  drawSprites();
}

function writePosition(x,y){

  database.ref('Balloon/Position').set({

    'x': position.x+x,
    'y': position.y+y

  })
}

function readPosition(data){

  position = data.val();
  hballoon.x = position.x;
  hballoon.y = position.y;

}

function showError(){

  console.log("There is an error to write in database");

}