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
    
    canvas.addEventListener('mousemove', function(e) {
        mx = e.offsetX;
        my = e.offsetY;
    }, false);

    canvas.addEventListener('mousedown', function(e) {
        mx = e.offsetX;
        my = e.offsetY;

    }, false);

    window.addEventListener('keydown', onKeyDown, true);
    window.addEventListener('keyup', onKeyUp, true);
    
    tiles = [[0,0],[0,0]]
    
    grass = new Image();
    grass.src = "grass.png";
    
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
    var sira = 0;
    var x = 30;
    var y = 30;
    for(var i=0; i<15; i++){
        for(var j=0; j<10; j++){
            ctx.drawImage(grass, x,y);
            x += 64;
        }
        if(sira==0){ x=30; sira=1; }
        else if(sira==1){ x=9; sira=0; }
        y+=12;
    }
}