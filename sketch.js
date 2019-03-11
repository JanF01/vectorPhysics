var balls = [];

var wind = 0;
var gravity =1.6;
var v;

var slider;

function setup(){
 if(screen.width<1000) createCanvas(700,600);
 else createCanvas(screen.width-200,840);
  background(56);
  
    slider = createSlider(4,70,18);
    slider.position(screen.width/2-(screen.width*0.8)/2,60);
  let s = screen.width-250;

  frameRate(30);
  for(let i=0;i<10;i++){
    let b = new Ball(width/2,balls.length,slider.value());
    balls.push(b);  
  }
      fill(90,170,40);
      noStroke();
}

function draw(){
 background(56);
    v = createVector(wind,gravity);
  for(let i=0;i<balls.length;i++){
    balls[i].edges();
    balls[i].make();
    balls[i].update();
    balls[i].applyForce(v);
    }
   if(mouseIsPressed){
       let b = new Ball(mouseX,balls.length,slider.value());
    balls.push(b); 
       
  }
  if(wind<0 && !keyIsPressed) wind+=0.06;
  if(wind>0 && !keyIsPressed) wind-=0.06;
}

function keyPressed(){
  
  if(keyCode==65){
    wind=-0.6;
  }   
  else if(keyCode==68){
    wind=0.6;
  }
}

class Ball{
 
  constructor(m,n,s){
    
      
       this.loc = createVector(random(m-100,m+100),random(200));
    this.vel = createVector();
    this.acc = createVector(); 
    this.size = s;
    this.jump = true;
    this.i = n;
  }
 update(){
  this.vel.add(this.acc);
this.loc.add(this.vel);
   
  this.vel.mult(0.97);
  this.acc.mult(0);
 }
  make(){
    ellipse(this.loc.x,this.loc.y,this.size,this.size);
  } 
  applyForce(force){
   this.acc.add(force);
  }
  edges(){
    let space = this.size/2;
    if(this.loc.x>width){
      this.loc.x = width;
      this.vel.x = -this.vel.x;
      }
    if(this.loc.x<0){
      this.loc.x = 0;
      this.vel.x = -this.vel.x;
      }
      if(this.loc.y<space){
      this.loc.y = space;
      this.vel.y = -this.vel.y;
      }
     if(this.loc.y>height-space){
      this.loc.y = height-space;
      this.vel.y = -this.vel.y;
      }
    
   for(let i=this.i;i<balls.length;i++){
       if(abs(this.loc.x-balls[i].loc.x)<(space+balls[i].size/2)+this.vel.mag()+balls[i].vel.mag() && abs(this.loc.y-balls[i].loc.y)<(space+balls[i].size/2)+this.vel.mag()+balls[i].vel.mag()){
         let xoff = map(this.loc.x-balls[i].loc.x,-(space+balls[i].size/2)-this.acc.mag()-this.vel.mag(),(space+balls[i].size/2)+this.acc.mag()+this.vel.mag(),-0.05,0.05);
         if(xoff>0)xoff=0.3;
         else if(xoff<0)xoff=-0.3;
         else xoff = 0;
    
         let yoff = map(this.loc.y-balls[i].loc.y,-(space+balls[i].size/2)-this.acc.mag()-this.vel.mag(),(space+balls[i].size/2)+this.acc.mag()+this.vel.mag(),-0.6,0.6);
         if(yoff>0) yoff=1;
         else if(yoff<0) yoff=-1;
         else yoff=0;
     
         let vector = createVector(xoff,yoff);
   
         this.acc.add(vector);
       } 
      
 }
   } 
  
}

  