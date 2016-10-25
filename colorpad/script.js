var CSelected = "hotpink";

var config = document.createElement('canvas');
config.width = window.innerWidth;
config.height = 50;
config.style.zIndex = 0;
config.style.position = "fixed";
config.style.backgroundColor = "black";
var configCtx = config.getContext("2d");
document.body.appendChild(config);

// Radius Selector
var RadSelect = document.createElement("input");
RadSelect.type = "number";
RadSelect.min = 1;
RadSelect.max = 25;
RadSelect.value = 4;
RadSelect.style.width = "50px";
RadSelect.style.zIndex = 2;
RadSelect.style.position = "fixed";
RadSelect.style.top = "23px";
RadSelect.style.right = "90px";
RadSelect.style.borderRadius = "5px";
document.body.appendChild(RadSelect);

var RadText = document.createElement("p");
RadText.innerHTML += "Radius";
RadText.style.color = "white"
RadText.style.zIndex = 2;
RadText.style.position = "fixed";
RadText.style.top = "2px";
RadText.style.right = "95px";
document.body.appendChild(RadText);

// Temporary Color Select
var ColorSelect = document.createElement("select");
ColorSelect.style.width = "100px";
ColorSelect.style.zIndex = 2;
ColorSelect.style.position = "fixed";
ColorSelect.style.top = "23px";
ColorSelect.style.right = "160px";
ColorSelect.style.borderRadius = "5px";
document.body.appendChild(ColorSelect);

var ColorOptions = [
	"Maroon", "Red", "Orange", "Yellow", "Blue", "Green", "Pink", "Black", "Grey", "White"
];

for (i = 0; i < ColorOptions.length; i++) {
	var ColorOption = document.createElement("option");
	ColorOption.innerHTML = ColorOptions[i];
	ColorOption.value = ColorOptions[i];
    if(ColorOptions[i].match("Black")) {
        ColorOption.selected = true;
    }
	ColorSelect.appendChild(ColorOption);
}

var ColorText = document.createElement("p");
ColorText.innerHTML += "Color";
ColorText.style.color = "white"
ColorText.style.zIndex = 2;
ColorText.style.position = "fixed";
ColorText.style.top = "2px";
ColorText.style.right = "190px";
document.body.appendChild(ColorText);

// Coloring Pad
var c = document.createElement('canvas');
c.width = window.innerWidth;
c.height = window.innerHeight - 50;
c.style.position = "fixed";
c.style.backgroundColor = "#eee";
c.style.marginTop = "50px";
var ctx = c.getContext('2d');
document.body.appendChild(c);

// Draw function
function drawDot(ctx,x,y,r,color){
	// Select a fill style
	ctx.fillStyle = color || CSelected || ColorSelect.value;
	// Draw filled circles
	ctx.beginPath();
	ctx.arc(x, y, r || RadSelect.value || 4, 0, Math.PI*2, true);
	ctx.closePath();
	ctx.fill();
}

// create some test data objects
var arcs=[];

//Color Button Creation Center (CBCC)
arcs.push({cx:25, cy:25, radius:20, start:0, end: Math.PI*2, color:"blue"});
arcs.push({cx:75, cy:25, radius:20, start:0, end: Math.PI*2, color:"green"});
arcs.push({cx:125, cy:25, radius:20, start:0, end: Math.PI*2, color:"red"});
arcs.push({cx:175, cy:25, radius:20, start:0, end: Math.PI*2, color:"orange"});
arcs.push({cx:225, cy:25, radius:20, start:0, end: Math.PI*2, color:"maroon"});
arcs.push({cx:275, cy:25, radius:20, start:0, end: Math.PI*2, color:"hotpink"});
arcs.push({cx:325, cy:25, radius:20, start:0, end: Math.PI*2, color:"black"})

// visibly draw all arcs 

for(var i=0;i<arcs.length;i++){
	defineArc(arcs[i]);
	// Create gradient
	if (CSelected.value == arcs[i].color) {
		var grd = configCtx.createRadialGradient(arcs[i].cx, arcs[i].cy, 0, arcs[i].cx, arcs[i].cy, 25);
		grd.addColorStop(0.1,"white");
		grd.addColorStop(1,arcs[i].color);
	} else {
		var grd = configCtx.createRadialGradient(arcs[i].cx, arcs[i].cy, 0, arcs[i].cx, arcs[i].cy, 25);
		grd.addColorStop(0.1,"black");
		grd.addColorStop(1,arcs[i].color);
	} if (arcs[i].color == "black"){
		configCtx.strokeStyle = "white";
		
	}
	// Fill with gradient
	configCtx.stroke();
	configCtx.fillStyle = grd;
	configCtx.fill()
}

// define BUT NOT VISIBLY DRAW an arc
function defineArc(arc){
	configCtx.beginPath();
	configCtx.arc(arc.cx,arc.cy,arc.radius,arc.start,arc.end);
}

var mouseIsDown = false;
c.addEventListener('touchstart', function(e){
	e.preventDefault();
	var pos = getPos(e.changedTouches[0]);
	drawDot(ctx,pos.x,pos.y);
});
c.addEventListener('mousedown', function(e){
	e.preventDefault();
	var pos = getPos(e);
	drawDot(ctx,pos.x,pos.y);
	mouseIsDown = true;
});
c.addEventListener('touchmove', function(e){
	e.preventDefault();
	var pos = getPos(e.changedTouches[0]);
	drawDot(ctx,pos.x,pos.y);
});
c.addEventListener('mousemove', function(e){
	e.preventDefault();
	var pos = getPos(e);
	if(mouseIsDown) drawDot(ctx,pos.x,pos.y);
});
c.addEventListener('mouseup', function(e){
	e.preventDefault();
	mouseIsDown = false;
});
configCtx.addEventListener('touchstart',function(e){
 for( i=0 ; i < arcs.length ; i++){
   var x1 = e.changedTouches[0].pageX;
   var y1 = e.changedTouches[0].pageY;
   var x2 = arcs[i].cx;
   var y2 = arcs[i].cy;
   var r  = arcs[i].r;
   if(getDistSq(x1,y1,x2,y2)<r*r){
     switch(i){
       case 0 : {
               CSelected = "Blue";
           };
           break;
       case 1 : btn2Func();
         break;
       case 2 : btn3Func();
         break;
       case 3 : btn4Func();
         break;
       case 4 : btn5Func();
         break;
       case 5 : btn6Func();
         break;
       case 6 : btn7Func();
         break;
     }
     return;
   }
 }
});

function getDistSq(x1,y1,x2,y2){
 return (x2-x1)*(x2-x1)+(y2-y1)*(y2-y1);
}
var button = document.createElement('button');
button.style.width = '50px';
button.style.height = '20px';
button.innerHTML = 'Clear';
botton.style.color = "white";
button.style.zIndex = 3;
button.style.position = "fixed";
button.style.top = "23px";
button.style.right = "20px";
button.style.borderRadius = "5px";
button.addEventListener('click', function(e){
ctx.clearRect(0,0,c.width,c.height);
});
document.body.appendChild(button);
function getPos(e){
	var x;
	var y;
	if (e.pageX || e.pageY) {
		x = e.pageX;
		y = e.pageY;
	}
	else {
		x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
		y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
	}
	x -= c.offsetLeft;
	y -= c.offsetTop;
	var pos = {};
	pos.x = x;
	pos.y = y;
	return pos;
}