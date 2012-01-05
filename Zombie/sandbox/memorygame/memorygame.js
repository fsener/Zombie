/*
 * TODO: 
 * *make the map more general (width and height adjustable)
 * *check efficiency
 */

var canvas;
var ctx;

//mouse coordinates  
var mx;
var my;

//array of all boxes
var boxes; 

//if player already opened a box
//states : 0=no box opened , 1=1 box waiting , 2=two box opened
var boxWaiting;

//opened boxes
var box1; 
var box2;

var SCORE;

function init(){  
	//runs once and first
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');
	
	//initializations
  	mx = 0, my = 0;
  	boxes = new Array();
  	
  	boxWaiting = 0;
  	
  	SCORE = 50;
	//
	
	//initial box drawing
	x = 10;
	y = 50;
	
	for(var i=0; i<10; i=i+1){
		var row = new Array();
  		for(var j=0; j<10; j=j+1){
  			row[j] = new Box(x,y);
	  		x=x+60
		}
		boxes[i] = row;
		x=10
		y=y+60
	}
	//
	
	//random numbers
	random_nums = newFilledArray(50, false);
	for(var i=0; i<boxes.length; i=i+1){
		for(var j=0; j<boxes[i].length; j=j+1){
			if(boxes[i][j].text == -1){

	  			rand = random(49);
	  			randx = random(9);
	  			randy = random(9);
	  			//alert("rand: "+rand+", randx: "+randx+", randy: "+ randy);
	  			while(random_nums[rand] || boxes[randx][randy].text != -1 || (randx==i && randy==j)){
	  				if(random_nums[rand]){
	  					rand = random(49);
	  				}
	  				if(boxes[randx][randy].text != -1 || (randx==i && randy==j)){
	  					randx = random(9);
	  					randy = random(9);
	  				}
	  			}
	  			boxes[i][j].text = rand;
	  			boxes[randx][randy].text = rand;
	  			random_nums[rand] = true;
	  			ctx.fillText(boxes[i][j].text, boxes[i][j].x+15, boxes[i][j].y+15);
	  			ctx.fillText(boxes[randx][randy].text, boxes[randx][randy].x+15, boxes[randx][randy].y+15);
	  		}
		}
	}
	//

	canvas.addEventListener('mousemove', function(e) {
		mx = e.offsetX;
		my = e.offsetY; 
		
		for(var i=0; i<boxes.length; i=i+1){
	  		for(var j=0; j<boxes[i].length; j=j+1){
	  			box = boxes[i][j];
	  			if(!box){ continue; }
	  			if(!box.opened){
		  			if( (box.x <= mx) && (mx <= box.x + box.w) && (box.y <= my) && (my <= box.y + box.h)){
	  					box.fill = '3';
	  				}
	  				else{
	  					box.fill = '100';
	  				}
	  			}
		  	}
		  	x=10
		  	y=y+60
	  	}}, false);
	
	canvas.addEventListener('mousedown', function(e) {
		
		
		mx = e.offsetX;
		my = e.offsetY; 
		
		for(var i=0; i<boxes.length; i=i+1){
	  		for(var j=0; j<boxes[i].length; j=j+1){
	  			box = boxes[i][j];	  			
	  			if(!box){ continue; }

	  			if(!box.opened && (boxWaiting==0)){
		  			if( (box.x <= mx) && (mx <= box.x + box.w) && (box.y <= my) && (my <= box.y + box.h)){ //replace with more efficient method
		  				SCORE--;
	  					box.opened = true;
	  					boxWaiting = 1;
	  					box1=box;
	  				}
	  			}
	  			else if(!box.opened && (boxWaiting==1)){
		  			if( (box.x <= mx) && (mx <= box.x + box.w) && (box.y <= my) && (my <= box.y + box.h)){ //replace with more efficient method
		  				SCORE--;
	  					box.opened = true;
	  					boxWaiting = 2;
	  					box2 = box;
	  				}
	  			}
	  			else if(!box.opened && (boxWaiting==2)){
		  			if( (box.x <= mx) && (mx <= box.x + box.w) && (box.y <= my) && (my <= box.y + box.h)){ //replace with more efficient method
	  					box.opened = true;
	  					boxWaiting = 1;
	  					
	  					//close previously opened 2 box
	  					if(box1.text == box2.text){
	  						box1 = null;
	  						box2 = null;
	  						SCORE += 5;
	  					}else{
	  						box1.opened = false;
	  						box2.opened = false;
	  					}
	  					
	  					box1 = box;		
	  				}
	  			}
		  	}
		  	x=10
		  	y=y+60
	  	}
	}, false);
	
	//interval
  	setInterval(gameLoop,100); 
}  

function gameLoop(){
	draw();
}

function Box(a, b) {
  	this.x = a;
 	this.y = b;
  	this.w = 45;
	this.h = 45;
	this.fill = '100';
	
	this.opened = false;
	this.image = new Image();  
	this.image.src = "mario.jpg";  
	
	this.text = -1;
}

function random(a){
	return Math.round(Math.random()*a);
}

function newFilledArray(len, val) {
    var rv = new Array(len);
    while (--len >= 0) {
        rv[len] = val;
    }
    return rv;
}


function draw() {   
	

	ctx.clearRect(0,0,605,700);		  	
  	
  	
  	ctx.fillText(mx+" "+my, 20,20);
  	
  	ctx.fillText("Score: "+ SCORE, 500, 20);
  	
  	for(var i=0; i<boxes.length; i=i+1){
  		for(var j=0; j<boxes[i].length; j=j+1){
  			if(!boxes[i][j]){ continue; }

  			ctx.fillStyle = 'rgba(' + boxes[i][j].fill + ',100,100,1)';
  			if(boxes[i][j].opened){
	  			ctx.fillText(boxes[i][j].text, boxes[i][j].x+15, boxes[i][j].y+15);
  				//ctx.drawImage(boxes[i][j].image, boxes[i][j].x, boxes[i][j].y);			  			
	  		}else{
	  			ctx.fillRect(boxes[i][j].x, boxes[i][j].y, boxes[i][j].w, boxes[i][j].h);
	  		}
	  		x=x+60;
	  	}
	  	x=10;
	  	y=y+60;
  	} 
  
} 