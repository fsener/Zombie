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

var earth;
var tankimg;
var tank;
var gunimg;
var gun;

function drawableObject(img, imgx, imgy, x, y, angle) {
    this.img = img, this.x = x, this.y = y, this.angle = angle, this.imgx=imgx, this.imgy=imgy;

    function getX(){
        return this.x - this.imgx / 2;
    }
    function getY(){
        return this.y - this.imgy / 2;
    }
}

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
    earth = new Image();
    earth.src = "rockyearth.jpg";
    tankimg = new Image();
    tankimg.src = "tank.png";
   
    gunimg = new Image();
    gunimg.src = "gun.png";
    
    tank = new drawableObject(tankimg, 57,71, 50, 50, 0);
    gun = new drawableObject(gunimg, 29,59, tank.x - tank.imgx / 2+18, tank.y - tank.imgy / 2-10,0);
    
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
    if(leftDown){
        tank.angle -= 5;
    }
    if(rightDown){
        tank.angle += 5;
    }
    if(upDown){
        tank.x += 5 * Math.cos((tank.angle-90)*Math.PI/180 );
        tank.y += 5 * Math.sin((tank.angle-90)*Math.PI/180);
        gun.x = tank.x - tank.imgx / 2 +18;
        gun.y = tank.y - tank.imgy / 2 -10;
    }
    if(downDown){
       tank.x -= 5 * Math.cos((tank.angle-90)*Math.PI/180 );
       tank.y -= 5 * Math.sin((tank.angle-90)*Math.PI/180);
       gun.x = tank.x - tank.imgx / 2 +18;
       gun.y = tank.y - tank.imgy / 2 -10;
    }
    
    gun.angle = Math.atan2(my-gun.y, mx-gun.x);
}

function draw() {
    ctx.clearRect(0, 0, 600, 600);

    ctx.drawImage(earth, 0, 0);
    //tankxy = tank.getDrawXY();
    ctx.save();
    ctx.translate(tank.x, tank.y);
    ctx.rotate(Math.PI / 180 * tank.angle);
    ctx.drawImage(tank.img, -25, -25, tank.imgx, tank.imgy);
    ctx.restore();
    
    ctx.save();
    ctx.translate(gun.x+20, gun.y+40);
    ctx.rotate(gun.angle+Math.PI/2);
    ctx.drawImage(gun.img, -20,-40, gun.imgx, gun.imgy);
    ctx.restore();
}