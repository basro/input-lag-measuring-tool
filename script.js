
var framedistanceSlider = document.getElementById("framedistance-slider");
var framedistanceElem = document.getElementById("framedistance");
var fpsElem = document.getElementById("fps");

framedistanceSlider.oninput = function (e) {
	framedistanceElem.textContent = framedistanceSlider.valueAsNumber;
}

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');

var oldPos = {x : 0, y : 0};
var currPos = {x : 0, y : 0};

canvas.onmousemove = function(event) {
	var r = canvas.getBoundingClientRect();
    currPos.x = (event.clientX - r.left) * devicePixelRatio;
    currPos.y = (event.clientY - r.top) * devicePixelRatio;
}

function updateCanvasSize() {
	var r = canvas.getBoundingClientRect();
	var newWidth = Math.round(r.width * devicePixelRatio);;
	var newHeight = Math.round(r.height * devicePixelRatio);

	if ( canvas.width != newWidth || canvas.height != newHeight ) {
		canvas.width = Math.round(r.width * devicePixelRatio);
		canvas.height = Math.round(r.height * devicePixelRatio);
	}
}

function distance( p0, p1 ) {
	var dx = p0.x - p1.x;
	var dy = p0.y - p1.y;
	return Math.sqrt(dx * dx + dy * dy);
}

function drawCircle( pos, radius, color ) {
	if ( color == null ) strokeStyle = "black";
	ctx.strokeStyle = color;
	ctx.beginPath();
	ctx.arc(pos.x, pos.y, radius, 0, 2 * Math.PI);
	ctx.stroke(); 
}

var dist = 0;
var frames = 0;
var lastFpsTime = performance.now();

function update() {
	updateCanvasSize();

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.lineWidth = 2;

	dist += (distance(oldPos, currPos) - dist) * 0.05;

	drawCircle( currPos, 2 );
	drawCircle( currPos, framedistanceSlider.valueAsNumber * dist, "red" );

	oldPos.x = currPos.x;
	oldPos.y = currPos.y;

	frames++;
	var now = performance.now();
	if ( now - lastFpsTime > 500 ) {
		fpsElem.textContent = frames * 1000 / (now - lastFpsTime);
		lastFpsTime = now;
		frames = 0;
	}

	requestAnimationFrame(update);
}

requestAnimationFrame(update);
console.log("hi");