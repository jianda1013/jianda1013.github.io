window.agent = navigator.userAgent.toLowerCase();
window.bHeight = window.document.documentElement.clientHeight || window.innerHeight;
window.bWidth = window.document.documentElement.clientWidth || window.innerWidth;


window.$ = function(node) {
	if (typeof node == 'string') {
		var obj;
		obj = document.querySelectorAll(node);
		if (obj.length == 1) {
			obj = document.querySelector(node);
		}
		node = obj;
	}
	if (node != null && !node.test) {
		if (!window.Element) {
			__addMethod(node, __methods, false);
		}
	}
	return node;
};

var points = new Array;
var total_num = 0;

function mouseDown(e){
	this.draw=true;
	this.ctx = this.getContext("2d");
	this.ctx.beginPath();
	this.ctx.strokeStyle=document.rossi.pc.value; // color value
	this.ctx.lineWidth=document.rossi.pw.value; // pen width

	var o=this;
	this.offsetX=this.offsetLeft;
	this.offsetY=this.offsetTop;

	while(o.offsetParent){
		o=o.offsetParent;
		this.offsetX+=o.offsetLeft;
		this.offsetY+=o.offsetTop;
	}
	this.ctx.moveTo(e.pageX-this.offsetX,e.pageY-this.offsetY-window.scrollY);
	points[total_num] = new Array;
	points[total_num].push({
		x: e.pageX-this.offsetX,
		y: e.pageY-this.offsetY-window.scrollY,
		color: this.ctx.strokeStyle,
		width: this.ctx.lineWidth,
		type: 'line'
	})
}

function mouseMove(e){
	if (this.draw){
		this.ctx.lineTo(e.pageX-this.offsetX,e.pageY-this.offsetY-window.scrollY);
		this.ctx.stroke();
		points[total_num].push({
			x: e.pageX-this.offsetX,
			y: e.pageY-this.offsetY-window.scrollY,
        });
	}
}

function mouseUp(){
	this.draw=false;
	total_num ++;
}

function undo(){
	if(total_num == 0){
		return;
	}
	total_num --;
	points.pop();
	redraw();
}

function redraw(){
	clearPad();
	var canvas=$('#myCanvas');
	var ctx=canvas.getContext("2d");
	ctx.beginPath();
	for(var i = 0; i < points.length; i ++){
		ctx.moveTo(points[i][0].x, points[i][0].y)
		ctx.strokeStyle = points[i][0].width;
		ctx.lineWidth = points[i][0].color;
		for(var j = 1; j < points[i].length; j ++){
			ctx.lineTo(points[i][j].x, points[i][j].y);
			ctx.stroke();
		}
	}
	console.log(points);
}

function touchStart(e){
	this.draw=true;
	this.ctx=this.getContext("2d");
	this.touch=e.targetTouches[0];
	this.ctx.beginPath();
	this.ctx.strokeStyle=document.rossi.pc.value;
	this.ctx.lineWidth=document.rossi.pw.value;

	var o=this;
	this.offsetX=this.offsetLeft;
	this.offsetY=this.offsetTop;

	while(o.offsetParent){
		o=o.offsetParent;
		this.offsetX+=o.offsetLeft;
		this.offsetY+=o.offsetTop;
	}
	this.ctx.moveTo(this.touch.pageX-this.offsetX,this.touch.pageY-this.offsetY-window.scrollY);
	points[total_num] = new Array;
	points[total_num].push({
		x: e.pageX-this.offsetX,
		y: e.pageY-this.offsetY-window.scrollY,
		color: this.ctx.strokeStyle,
		width: this.ctx.lineWidth,
		type: 'line'
	})
	e.preventDefault();
}

function touchMove(e){
	this.touch=e.targetTouches[0];
	if (this.draw){
		this.ctx.lineTo(this.touch.pageX-this.offsetX,this.touch.pageY-this.offsetY-window.scrollY);
		this.ctx.stroke();
		points[total_num].push({
			x: e.pageX-this.offsetX,
			y: e.pageY-this.offsetY-window.scrollY,
        });
	}
	e.preventDefault();
}

function touchEnd(e){
	this.ctx.stroke();
	this.draw=false;
	total_num ++;
	e.preventDefault();
}

function clearPad(){
	var canvas=$('#myCanvas');
	var ctx=canvas.getContext("2d");
	ctx.clearRect(0,0,canvas.width,canvas.height);
	console.log(points);
}		

window.addEventListener('load',function(){
	var canvas=$('#myCanvas');
	var ctx=canvas.getContext("2d");
	canvas.width=bWidth;
	canvas.height=bHeight;

	canvas.addEventListener('mousedown',mouseDown);
	canvas.addEventListener('mousemove',mouseMove);
	canvas.addEventListener('mouseup',mouseUp);
	canvas.addEventListener('redraw',redraw);

	canvas.addEventListener('touchstart',touchStart);
	canvas.addEventListener('touchmove',touchMove);
	canvas.addEventListener('touchend',touchEnd);
});