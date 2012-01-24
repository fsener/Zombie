/*
 * TODO:
 */

var canvas;
var ctx;

//mouse coordinates
var mx;
var my;

//keys
var rightDown;
var leftDown;
var downDown;
var upDown;

var tiles;
var grass;

var xmouse;
var ymouse;

function onKeyDown(evt) {
    if(evt.keyCode == 68)
        rightDown = true;
    else if(evt.keyCode == 65)
        leftDown = true;
    else if(evt.keyCode == 83)
        downDown = true;
    else if(evt.keyCode == 87)
        upDown = true;
}

//and unset them when the right or left key is released
function onKeyUp(evt) {
    if(evt.keyCode == 68)
        rightDown = false;
    else if(evt.keyCode == 65)
        leftDown = false;
    else if(evt.keyCode == 83)
        downDown = false;
    else if(evt.keyCode == 87)
        upDown = false;
}

function init() {
    //runs once and first
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    
    ymouse = 0;
    xmouse = 0;
    
    canvas.addEventListener('mousemove', function(e) {
        mx = e.offsetX;
        my = e.offsetY;

        // (x+y - mapx - mapy + tilewidth/2 + tileheight/2) % sqrt(tilewidth^2 + tileheight^2)*2
        xmouse = Math.round((mx+my-60+11.5+24.5)/54) - 1;        
        ymouse = Math.round((mx+my-60+11.5+24.5)/54) - 1;


    }, false);

    canvas.addEventListener('mousedown', function(e) {
        mx = e.offsetX;
        my = e.offsetY;

    }, false);

    window.addEventListener('keydown', onKeyDown, true);
    window.addEventListener('keyup', onKeyUp, true);
    
    tiles = [[0,0],[0,0]]
    
    toprak = new Image();
    toprak.src = "toprak.png";
    
    //interval
    setInterval(gameLoop, 60);
}

function gameLoop() {
    logic();
    draw();
}

function random(a) {
    return Math.round(Math.random() * a);
}

function newFilledArray(len, val) {
    var rv = new Array(len);
    while(--len >= 0) {
        rv[len] = val;
    }
    return rv;
}

function logic() {
}

function draw() {
    ctx.clearRect(0, 0, 600, 600);
    var sira = 1;
    var x = 30;
    var y = 30;
    for(var i=0; i<15; i++){
        for(var j=0; j<10; j++){
            
            ctx.drawImage(toprak, x,y);
            if(j==xmouse && i==ymouse){
                ctx.fillStyle = 'rgba(255, 255, 200, 0.7)';
                ctx.beginPath();
                ctx.moveTo(x,y+11.5);
                ctx.lineTo(x+24.5, y);
                ctx.lineTo(x+49, y+11.5);
                ctx.lineTo(x+24.5, y+23);
                ctx.fill();
            }
            x += 50;
        }
        if(sira==0){ x=30; sira=1; }
        else if(sira==1){ x=55; sira=0; }
        y+=13;
    }
    ctx.fillText(""+mx+" "+my, 300,300);
    ctx.fillText("xmouse:"+xmouse+" - ymouse:"+ymouse, 300,310);
    
}